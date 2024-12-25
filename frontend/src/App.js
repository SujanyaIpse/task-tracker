import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';

const App = () => {
  const [filter, setFilter] = useState('All');
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleTaskUpdate = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskFilter filter={filter} onFilterChange={setFilter} />
      <TaskList filter={filter} onEdit={(task) => {
        setEditingTask(task);
        setShowForm(true);
      }} />
      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={() => setShowForm(false)}
          onTaskUpdate={handleTaskUpdate}
        />
      )}
      <button onClick={() => setShowForm(true)}>Add Task</button>
    </div>
  );
};

export default App;
