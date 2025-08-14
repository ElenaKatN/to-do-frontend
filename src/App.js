import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // full backend URL

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");

  // Fetch todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/todos`);
        if (Array.isArray(res.data)) {
          setTodos(res.data);
        } else {
          setTodos([]);
          console.error("API did not return an array:", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch todos:", err);
        setTodos([]);
        setError("Failed to load todos from server.");
      }
    };
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/api/todos`, { task: newTodo });
      setTodos((prev) => [...prev, res.data]);
      setNewTodo("");
    } catch (err) {
      console.error("Failed to add todo:", err);
      setError("Failed to add todo.");
    }
  };

  // Toggle completed
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const res = await axios.put(`${API_URL}/api/todos/${id}`, {
        completed: !todo.completed,
      });

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? res.data : t))
      );
    } catch (err) {
      console.error("Failed to toggle todo:", err);
      setError("Failed to update todo.");
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
      setError("Failed to delete todo.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>My To-Do List</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={addTodo}
        style={{ display: "flex", marginBottom: "1rem" }}
      >
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add
        </button>
      </form>

      {(!todos || todos.length === 0) ? (
        <p>No todos yet. Add one!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
                borderBottom: "1px solid #ccc",
              }}
            >
              <span
                onClick={() => toggleComplete(todo.id)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {todo.task}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ marginLeft: "10px" }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
