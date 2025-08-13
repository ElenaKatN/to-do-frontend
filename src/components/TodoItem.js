export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
    return (
      <li>
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : '' }}
          onClick={() => toggleComplete(todo.id, !todo.completed)}
        >
          {todo.text}
        </span>
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </li>
    );
  }
  