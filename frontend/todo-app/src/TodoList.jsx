import React, { useState, useEffect } from "react";

// Replace with your Django backend API URL
const API_URL = "http://127.0.0.1:8000/api/todos/";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch tasks from the backend on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks from the Django REST API
  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/todos/fetch/");
    const data = await response.json();
    setTasks(data);
  };

  // Add a new task to the backend
  const addTask = async () => {
    if (editText.trim()) {
      const newTask = {
        title: editText,
        completed: false,
      };

      const response = await fetch("http://127.0.0.1:8000/api/todos/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        fetchTasks(); // Reload tasks after adding
        setEditText(""); // Clear the input field
      }
    }
  };

  // Update a task on the backend
  const updateTask = async (id) => {
    const updatedTask = {
      title: editText,
      completed: tasks.find((task) => task.id === id).completed,
    };

    const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      fetchTasks(); // Reload tasks after update
      setEditingId(null); // Stop editing
      setEditText(""); // Clear the edit text field
    }
  };

  // Toggle the completed status of a task
  const toggleComplete = async (id) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      fetchTasks(); // Reload tasks after completion toggle
    }
  };

  // Delete a task from the backend
  const deleteTask = async (id) => {
    const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}/delete/`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchTasks(); // Reload tasks after deletion
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });



  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add new task..."
        />
        <button className="add-btn" onClick={addTask}>
          ➕ Add Task
        </button>
      </div>
      <button
        className="toggle-theme"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="filter-container">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <div className="task-content">
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => updateTask(task.id)} // Save on blur
                  autoFocus
                />
              ) : (
                <span className={task.completed ? "completed" : ""}>
                  {task.title}
                </span>
              )}
            </div>

            <div className="task-actions">
              <button
                className={`complete-btn ${task.completed ? "completed" : ""}`}
                onClick={() => toggleComplete(task.id)}
              >
                {task.completed ? "✅ Completed" : "✔ Complete"}
              </button>

              {editingId === task.id ? (
                <button className="edit-btn" onClick={() => updateTask(task.id)}>
                  💾 Save
                </button>
              ) : (
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditingId(task.id);
                    setEditText(task.title); // Start editing
                  }}
                >
                  ✎ Edit
                </button>
              )}

              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                🗑 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
