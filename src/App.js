import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Use deployed backend in production, localhost in development
const API_URL =
  process.env.REACT_APP_API_URL;

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  // Fetch all todos from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/todos`);
        setTodos(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load todos.');
      }
    };
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/api/todos`, { text: newTodo, completed: false });
      setTodos((prev) => [...prev, res.data]);
      setNewTodo('');
    } catch (err) {
      console.error(err);
      setError('Failed to add todo.');
    }
  };

  // Toggle completed
  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/api/todos/${id}`, { completed: !completed });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? res.data : todo))
      );
    } catch (err) {
      console.error(err);
      setError('Failed to update todo.');
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete todo.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h1>My To-Do List</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={addTodo} style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Add</button>
      </form>

      {todos.length === 0 ? (
        <p>No todos yet. Add one!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 0',
                borderBottom: '1px solid #ccc',
              }}
            >
              <span
                onClick={() => toggleComplete(todo.id, todo.completed)}
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
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
