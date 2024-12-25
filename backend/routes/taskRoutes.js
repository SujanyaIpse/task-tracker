const express = require('express');
const router = express.Router();
const Task = require('../models/ask'); // Assuming you have a Task model for MongoDB

// GET: Fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();  // Retrieve all tasks from the database
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Server error');
  }
});

// POST: Create a new task
router.post('/', async (req, res) => {
  try {
    const { name, description, dueDate, status, priority } = req.body;
    const newTask = new Task({
      name,
      description,
      dueDate,
      status,
      priority,
    });
    await newTask.save();  // Save the new task to the database
    res.status(201).json(newTask);  // Return the created task
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Server error');
  }
});

// PUT: Update an existing task
router.put('/:id', async (req, res) => {
  try {
    const { name, description, dueDate, status, priority } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { name, description, dueDate, status, priority },
      { new: true }  // Return the updated task
    );
    if (!updatedTask) {
      return res.status(404).send('Task not found');
    }
    res.json(updatedTask);  // Return the updated task
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Server error');
  }
});

// DELETE: Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);  // Find and delete task by ID
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send('Task deleted');  // Send success response
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
