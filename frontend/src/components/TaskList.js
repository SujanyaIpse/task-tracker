import React, { useState, useEffect } from 'react';
import { fetchTasks, deleteTask } from '../api';
import TaskForm from './TaskForm'; // Import TaskForm
import './TaskList.css';  // Import the CSS file for TaskList styling


const TaskList = ({ filter }) => {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // For editing a task

  // Fetch tasks when the component mounts
  useEffect(() => {
    const getTasks = async () => {
      const { data } = await fetchTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  // Handle task deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id)); // Remove the deleted task from the state
    }
  };

  // Function to handle task update (called after editing or creating a task)
  const handleTaskUpdate = async () => {
    const { data } = await fetchTasks(); // Fetch the updated task list
    setTasks(data); // Update the task list state with the latest data
    setIsFormOpen(false); // Close the form modal after update
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter(
    (task) => filter === 'All' || task.status === filter
  );

  // Handle edit button click to open the form with the selected task's data
  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsFormOpen(true); // Open the form to edit the selected task
  };

  return (
    <div>
      <h2>Task List</h2>
      {filteredTasks.map((task) => (
        <div key={task._id} className="task-item">
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => handleEdit(task)}>Edit</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </div>
      ))}

      {isFormOpen && (
        <TaskForm
          task={taskToEdit}
          onClose={() => setIsFormOpen(false)} // Close the form
          onTaskUpdate={handleTaskUpdate} // Notify the parent component when a task is updated
        />
      )}
    </div>
  );
};

export default TaskList;
