import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from '../component/TodoList';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState(''); // State for error message

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') { // Validation: Check if the input is empty
      setError('Todo cannot be empty!'); // Set error message
      return; // Prevent further execution
    }

    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:5000/todos', { text: newTodo }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos([...todos, res.data]);
    setNewTodo(''); // Clear the input after adding the todo
    setError(''); // Clear any previous error message
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleComplete = async (id, completed) => {
    const token = localStorage.getItem('token');
    const res = await axios.put(`http://localhost:5000/todos/${id}`, { completed }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const editTodo = async (id, newText) => {
    const token = localStorage.getItem('token');
    const res = await axios.put(`http://localhost:5000/todos/${id}`, { text: newText }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  return (
    <div className='login h-screen w-screen flex justify-center items-center'>
      <div className='text-white bg-[#00000065] border-2 border-solid border-[#6a90ff] rounded-lg p-4 relative backdrop-blur-sm w-[400px] h-[560px] overflow-hidden'>
        <h2 className='font-bold text-center py-4 text-[25px]'>My Todos</h2>
        <div className='flex items-center mb-4'>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => {
              setNewTodo(e.target.value);
              setError(''); // Clear error when user starts typing
            }}
            placeholder="Add new todo"
            className="flex-1 p-2 border text-black border-gray-300 rounded"
          />
          <button onClick={addTodo} className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2 hover:bg-blue-600 transition duration-200">
            Add
          </button>
        </div>
        {error && <p className="text-red-500 font-bold pb-3 ">{error}</p>} {/* Display error message */}

        {/* Scrollable Container for Todos */}
        <div className="overflow-auto h-[420px] custom-scrollbar">
          <TodoList
            todos={todos}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
