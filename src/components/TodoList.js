import TodoItem from './TodoItem';

export default function TodoList({ todos, toggleComplete, deleteTodo }) {
  if (todos.length === 0) return <p>No to-dos yet!</p>;

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
