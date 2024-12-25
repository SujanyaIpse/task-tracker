# Task Management App

This is a task management app built with React that allows users to create, update, delete, and filter tasks. The app communicates with a backend API using axios to manage tasks and provides a simple UI for task management.

## Features

- **Create tasks**: Add new tasks with a name, description, due date, status, and priority.
- **Update tasks**: Edit existing tasks.
- **Delete tasks**: Remove tasks from the list.
- **Filter tasks**: Filter tasks based on their status (All, Completed, Pending, etc.).
- **Error handling**: The app uses error boundaries to handle unexpected errors gracefully.

## Technologies

- **React**: JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for the browser and Node.js, used to interact with the API.
- **React Hooks**: Used for managing component state and side effects (`useState`, `useEffect`).
- **CSS**: For styling the app.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/task-management-app.git
    ```

2. Navigate to the project directory:
    ```bash
    cd task-management-app
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
   - Create a `.env` file in the root of the project and add the following:
     ```
     REACT_APP_API_URL=http://localhost:5000
     ```

5. Start the development server:
    ```bash
    npm start
    ```

The app will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints

The app interacts with the backend API to manage tasks. Below are the available endpoints:

- **GET** `/api/tasks`: Fetch all tasks.
- **POST** `/api/tasks`: Create a new task.
- **PATCH** `/api/tasks/{id}`: Update an existing task.
- **DELETE** `/api/tasks/{id}`: Delete a task.

## Folder Structure

- **`src/`**: The source code for the app.
  - **`components/`**: React components (e.g., `TaskList.js`, `TaskForm.js`).
  - **`api.js`**: The file where axios API requests are defined.
  - **`App.js`**: The main app component that uses the `TaskList` and `TaskForm`.
  - **`TaskList.css`**: The CSS file for styling the task list.
  - **`TaskForm.js`**: The form component for adding and editing tasks.

## Usage

- **Creating a task**: Fill in the task form (name, description, due date, etc.) and click "Create Task".
- **Editing a task**: Click on the "Edit" button next to the task you want to modify, make changes, and click "Save".
- **Deleting a task**: Click on the "Delete" button next to the task you want to remove.
- **Filtering tasks**: Use the filter dropdown to display tasks based on their status (All, Completed, Pending).

    