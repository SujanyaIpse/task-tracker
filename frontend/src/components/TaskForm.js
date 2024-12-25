import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api'; // Ensure these functions are implemented correctly
import './TaskForm.css';  // Import the CSS file for TaskForm styling

const TaskForm = ({ task, onClose, onTaskUpdate }) => {
  const [formData, setFormData] = useState({
    name: task?.name || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    status: task?.status || 'Pending',
    priority: task?.priority || 'Low',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task]); // Update form data if the task changes

  // Get the current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await updateTask(task._id, formData); // Update the task if we are editing
        console.log('Task updated successfully');
      } else {
        await createTask(formData); // Create a new task if it's a new task
        console.log('Task created successfully');
      }
      onTaskUpdate(); // Notify the parent component to refresh the task list
      onClose(); // Close the modal after updating/creating
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Task Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          min={currentDate} // Set the minimum date to the current date
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">{task ? 'Update' : 'Create'} Task</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskForm;
