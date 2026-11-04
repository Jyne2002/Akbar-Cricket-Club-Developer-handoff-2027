// Validate additions before editing a document, including when using the embedded store.
function playerBenefits(body) {
  const result = {};
  if (body.allowanceEligible !== undefined) {
    if (typeof body.allowanceEligible !== 'boolean') throw new Error('Allowance eligibility must be yes or no.');
    result.allowanceEligible = body.allowanceEligible;
  }
  if (body.allowanceEligibilityNote !== undefined) {
    if (typeof body.allowanceEligibilityNote !== 'string' || body.allowanceEligibilityNote.length > 500) throw new Error('Eligibility note must be at most 500 characters.');
    result.allowanceEligibilityNote = body.allowanceEligibilityNote.trim();
  }
  if (body.jerseyKit !== undefined) {
    const kit = body.jerseyKit;
    if (!kit || typeof kit !== 'object' || Array.isArray(kit)) throw new Error('Invalid jersey kit.');
    const text = (key, max = 80) => {
      if (kit[key] !== undefined && (typeof kit[key] !== 'string' || kit[key].length > max)) throw new Error(`Invalid jersey kit ${key}.`);
      return (kit[key] || '').trim();
    };
    const status = kit.status || 'Not ordered';
    if (!['Not ordered', 'Ordered', 'Issued', 'Returned'].includes(status)) throw new Error('Invalid jersey kit status.');
    const quantity = kit.quantity ?? 0;
    if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0 || quantity > 100) throw new Error('Kit quantity must be a whole number between 0 and 100.');
    const issuedDate = text('issuedDate');
    if (issuedDate && (!/^\d{4}-\d{2}-\d{2}$/.test(issuedDate) || !Number.isFinite(Date.parse(issuedDate)) || new Date(issuedDate).toISOString().slice(0, 10) !== issuedDate)) throw new Error('Enter a valid kit issue date.');
    result.jerseyKit = { printedName: text('printedName'), shirtSize: text('shirtSize'), trouserSize: text('trouserSize'), status, quantity, issuedDate, notes: text('notes', 500) };
  }
  return result;
}

module.exports = { playerBenefits };
