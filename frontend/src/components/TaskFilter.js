import React from 'react';

const TaskFilter = ({ filter, onFilterChange }) => {
  return (
    <div>
      <label>Filter by Status: </label>
      <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;
