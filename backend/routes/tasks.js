const express = require('express');
const { body, validationResult } = require('express-validator');
const Task = require('../models/Task');

const router = express.Router();

// Validation middleware for task fields
const validateTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status'),
  body('dueDate').optional().isISO8601().toDate().withMessage('Invalid due date'),
];

// POST /tasks - Add a new task
router.post('/', validateTask, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Error in /tasks route:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// GET /tasks - Fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error in /tasks route:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// GET /tasks/:id - Fetch a single task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error('Error in /tasks route:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// PUT /tasks/:id - Update a task
router.put('/:id', validateTask, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error('Error in /tasks route:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error in /tasks route:', err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

module.exports = router;
