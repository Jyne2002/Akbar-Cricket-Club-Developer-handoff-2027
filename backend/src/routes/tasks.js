const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { authenticate, requireRoles } = require('../middleware/auth');
const { getManagementSuggestions } = require('../services/aiAssistantService');

/**
 * GET /api/tasks
 * Returns tasks grouped by column status or as list
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });

    const grouped = {
      'To do': [],
      'In progress': [],
      'Blocked': [],
      'Done': []
    };

    tasks.forEach(t => {
      if (grouped[t.status]) {
        grouped[t.status].push(t);
      } else {
        grouped['To do'].push(t);
      }
    });

    return res.json({
      success: true,
      tasks,
      board: {
        todo: grouped['To do'],
        inProgress: grouped['In progress'],
        blocked: grouped['Blocked'],
        done: grouped['Done'],
        counts: {
          todo: grouped['To do'].length,
          inProgress: grouped['In progress'].length,
          blocked: grouped['Blocked'].length,
          done: grouped['Done'].length,
          total: tasks.length
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve tasks.' });
  }
});

/**
 * GET /api/tasks/suggestions
 * Generates automated suggestions from operational scanner or AI assistant.
 * Strict privacy protection: only aggregate operational statistics are processed.
 */
router.get('/suggestions', authenticate, async (req, res) => {
  try {
    const result = await getManagementSuggestions();
    return res.json({
      success: true,
      source: result.source,
      suggestions: result.suggestions
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to generate suggestions.' });
  }
});

/**
 * POST /api/tasks
 * Create task (explicitly called by user or when clicking '+ Add' on a suggestion)
 */
router.post('/', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const { title, details, owner, dueDate, category, priority, status, source } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Task title is required.' });
    }

    const task = await Task.create({
      title: title.trim(),
      details: details || '',
      owner: owner || req.user.name || 'Unassigned',
      dueDate: dueDate || '',
      category: category || 'Operations',
      priority: priority || 'Medium',
      status: status || 'To do',
      source: source || 'Manual'
    });

    return res.status(201).json({
      success: true,
      message: `Task "${task.title}" added to board.`,
      task
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create task.' });
  }
});

/**
 * PUT /api/tasks/:id
 * Update task
 */
router.put('/:id', authenticate, requireRoles('Administrator', 'Manager', 'Coach'), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }

    const fields = ['title', 'details', 'owner', 'dueDate', 'category', 'priority', 'status'];
    fields.forEach(f => {
      if (req.body[f] !== undefined) task[f] = req.body[f];
    });

    await task.save();
    return res.json({ success: true, message: 'Task updated.', task });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update task.' });
  }
});

/**
 * DELETE /api/tasks/:id
 */
router.delete('/:id', authenticate, requireRoles('Administrator', 'Manager'), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    return res.json({ success: true, message: 'Task deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete task.' });
  }
});

module.exports = router;
