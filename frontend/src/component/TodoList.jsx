import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="todo-list-container">
      {todos.length === 0 ? (
        <p className="no-todos-message">No todos available. Please add some!</p>
      ) : (
        <ul className="todo-list">
          {todos.slice().reverse().map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
export default TodoList;
