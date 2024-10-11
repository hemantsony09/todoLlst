import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import CancelIcon from '@mui/icons-material/Cancel';

const TodoItem = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [error, setError] = useState(''); 
  const handleEdit = () => {
    if (editedText.trim() === '') {
      setError('Todo cannot be empty!'); 
      return;
    }

    editTodo(todo._id, editedText);
    setIsEditing(false);
    setError(''); 
  };

  const handleComplete = async () => {
    await toggleComplete(todo._id, !todo.completed);


    if (!todo.completed) {
      setTimeout(() => {
        deleteTodo(todo._id);
      }, 3000);
    }
  };

  return (
    <li className="flex flex-col items-center justify-between p-3 mb-2 bg-white bg-opacity-90 rounded shadow-md hover:shadow-lg transition-shadow duration-200">
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={editedText}
            onChange={(e) => {
              setEditedText(e.target.value);
              setError('');
            }}
            className="p-2 rounded border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
            placeholder="Edit todo"
          />
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white rounded-md px-2 py-1 hover:bg-blue-600 transition duration-200"
          >
            <CheckCircleIcon fontSize="small" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-600 transition duration-200 ml-2"
          >
            <CancelIcon fontSize="small" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full">
          <span
            className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
          >
            {todo.text}
          </span>
          <div className="flex items-center ml-2">
            <button
              onClick={handleComplete} // Updated to use the new handleComplete function
              className="flex justify-center items-center bg-yellow-500 text-white rounded-md p-3 hover:bg-yellow-600 transition duration-200 mr-1"
            >
              {todo.completed ? <UndoIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
            </button>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="flex justify-center items-center bg-red-500 text-white rounded-md p-3 hover:bg-red-600 transition duration-200 mr-1"
            >
              <DeleteIcon fontSize="small" />
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex justify-center items-center bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 transition duration-200"
            >
              <EditIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>} 
    </li>
  );
};

export default TodoItem;
