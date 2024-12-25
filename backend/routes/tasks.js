const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

const app = express();
// Middleware to parse JSON request bodies
app.use(express.json());

// Fetch all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Add a new task
app.post('/tasks', async (req, res) => {
    const { name, description, dueDate, status, priority } = req.body;

    try {
        const newTask = new Task({
            name,
            description,
            dueDate,
            status,
            priority,
        });

        await newTask.save();
        res.status(201).json(newTask); // Return the new task on success
    } catch (err) {
        res.status(500).json({ message: 'Error adding task' });
    }
});

// Update a task
router.patch('/tasks/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json(task);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    req.io.emit('task-deleted', id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = router;
