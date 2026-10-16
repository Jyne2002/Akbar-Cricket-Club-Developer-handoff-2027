const Equipment = require('../models/Equipment');
const DamageReport = require('../models/DamageReport');
const Session = require('../models/Session');
const Match = require('../models/Match');

/**
 * Generate built-in rule-based management suggestions based on club operational state
 */
async function generateRuleBasedSuggestions() {
  const suggestions = [];

  // 1. Unverified Stock Quantities
  const unverifiedItems = await Equipment.find({ countVerified: false });
  if (unverifiedItems.length > 0) {
    suggestions.push({
      title: `Physically audit ${unverifiedItems.length} unverified inventory items`,
      explanation: `${unverifiedItems.length} inventory records (including first aid and consumables) currently have unverified physical quantities. An audit is required before season matchday operations.`,
      priority: 'High',
      category: 'Inventory',
      actionableType: 'unverified_inventory'
    });
  }

  // 2. Low Stock Alerts (Applies ONLY to items with verified counts below minimumStock)
  const lowStockItems = await Equipment.find({ countVerified: true, $expr: { $lt: ['$quantity', '$minimumStock'] } });
  if (lowStockItems.length > 0) {
    const itemNames = lowStockItems.slice(0, 3).map(i => i.name).join(', ');
    suggestions.push({
      title: `Replenish ${lowStockItems.length} low-stock inventory targets`,
      explanation: `Verified quantities are below minimum reserves for: ${itemNames}${lowStockItems.length > 3 ? '...' : ''}. Reorder immediately to avoid shortages.`,
      priority: 'Critical',
      category: 'Inventory',
      actionableType: 'low_stock'
    });
  }

  // 3. Damaged Equipment & Open Damage Reports
  const openDamage = await DamageReport.find({ status: { $in: ['Open', 'In progress'] } }).populate('equipment');
  const damagedEquip = await Equipment.find({ condition: { $in: ['Damaged', 'Lost'] } });

  if (openDamage.length > 0 || damagedEquip.length > 0) {
    suggestions.push({
      title: `Address ${openDamage.length} open damage incidents & damaged assets`,
      explanation: `Active damage reports or damaged assets exist (e.g., Cooler box latch damage). Schedule repairs or decommission assets to maintain player safety.`,
      priority: 'High',
      category: 'Operations',
      actionableType: 'damage'
    });
  }

  // 4. Overdue Equipment Inspections (Condition is 'Inspect' or last inspection older than 7 days)
  const inspectNeeded = await Equipment.find({ condition: 'Inspect' });
  if (inspectNeeded.length > 0) {
    suggestions.push({
      title: `Complete weekly safety inspection for ${inspectNeeded.length} assets`,
      explanation: `${inspectNeeded.length} equipment assets are awaiting condition inspection. Log weekly checks with photographic evidence.`,
      priority: 'Medium',
      category: 'Operations',
      actionableType: 'inspections'
    });
  }

  // 5. Unmarked Attendance in Past Sessions
  const allSessions = await Session.find({});
  let unmarkedSessionCount = 0;
  for (const s of allSessions) {
    const un = (s.rollCall || []).filter(e => e.status === 'Not marked').length;
    if (un > 0) {
      unmarkedSessionCount++;
    }
  }

  if (unmarkedSessionCount > 0) {
    suggestions.push({
      title: `Finalize roll call for ${unmarkedSessionCount} practice/match sessions`,
      explanation: `Attendance records remain unmarked across ${unmarkedSessionCount} sessions. Coaches should finalize roll calls to ensure accurate season attendance rates.`,
      priority: 'Medium',
      category: 'Administration',
      actionableType: 'attendance'
    });
  }

  // 6. MCA Match Fixture Readiness
  const upcomingMatches = await Match.find({ result: 'Pending' });
  for (const m of upcomingMatches) {
    const playingCount = (m.playingXI || []).filter(p => p.status === 'Playing XI').length;
    if (playingCount < 11) {
      suggestions.push({
        title: `Select Playing XI for fixture vs ${m.opponent}`,
        explanation: `Match on ${m.date} at ${m.venue || 'TBD'} currently has ${playingCount}/11 players selected for the starting lineup.`,
        priority: 'High',
        category: 'Match Prep',
        actionableType: 'match_selection'
      });
    }
  }

  // General seasonal best practice
  if (suggestions.length === 0) {
    suggestions.push({
      title: 'Review first aid kit expiry dates and hydration stocks',
      explanation: 'All operational records are currently up to date. Conduct preventative check of hydration and medical kits before the upcoming MCA fixture.',
      priority: 'Low',
      category: 'Medical/Safety',
      actionableType: 'general'
    });
  }

  return suggestions;
}

/**
 * Generate suggestions with optional AI augmentation.
 * Strict privacy rule: ONLY aggregate operational metrics are passed to the AI prompt.
 * No personal employee data, phone numbers, NICs, or private documents are ever transmitted.
 */
async function getManagementSuggestions() {
  const ruleSuggestions = await generateRuleBasedSuggestions();

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    return {
      source: 'Rule-Based Engine',
      suggestions: ruleSuggestions
    };
  }

  try {
    // Collect aggregated metrics only
    const unverifiedCount = await Equipment.countDocuments({ countVerified: false });
    const damagedCount = await Equipment.countDocuments({ condition: { $in: ['Damaged', 'Lost'] } });
    const openDamageReports = await DamageReport.countDocuments({ status: { $in: ['Open', 'In progress'] } });
    const pendingMatches = await Match.countDocuments({ result: 'Pending' });

    const systemPrompt = `You are an expert sports club operations consultant for Akbar Cricket Club. 
Provide 3-5 concise, high-impact management recommendations based on aggregate club metrics.
Return ONLY a valid JSON array of objects with keys: "title", "explanation", "priority" (Low, Medium, High, or Critical), and "category" (Operations, Match Prep, Inventory, Medical/Safety, Administration).`;

    const userContent = `Club Aggregate Status:
- Unverified equipment records: ${unverifiedCount}
- Damaged/Lost equipment count: ${damagedCount}
- Open damage incident reports: ${openDamageReports}
- Pending MCA league fixtures: ${pendingMatches}
Current rule suggestions identified: ${JSON.stringify(ruleSuggestions.map(s => s.title))}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.3
      })
    });

    if (!response.ok) {
      console.warn('OpenAI API request returned non-200, falling back to rule suggestions');
      return {
        source: 'Rule-Based Engine (AI Service Fallback)',
        suggestions: ruleSuggestions
      };
    }

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    // Parse JSON from code fence or raw string
    const jsonStr = content.replace(/^```json/i, '').replace(/```$/i, '').trim();
    const aiSuggestions = JSON.parse(jsonStr);

    return {
      source: 'AI Assistant (Augmented)',
      suggestions: aiSuggestions
    };
  } catch (err) {
    console.warn('AI suggestion generation failed, falling back to rule engine:', err.message);
    return {
      source: 'Rule-Based Engine (Fallback)',
      suggestions: ruleSuggestions
    };
  }
}

module.exports = {
  getManagementSuggestions,
  generateRuleBasedSuggestions
};
