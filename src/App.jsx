import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(null); // Track which todo is being edited
  const [editInput, setEditInput] = useState("");   // Input for editing a todo

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setIsEditing(index);            // Set the current todo being edited
    setEditInput(todos[index].text); // Set the input to the todo's current text
  };

  const saveEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editInput; // Update the todo's text
    setTodos(newTodos);
    setIsEditing(null);               // Exit editing mode
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-6">Todo List</h1>
      <div className="mt-4 flex">
        <input 
          type="text" 
          className="border-2 p-2 rounded-lg w-64 focus:outline-none" 
          placeholder="Add a new todo" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={addTodo} 
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="mt-6 w-64">
        {todos.map((todo, index) => (
          <li key={index} className={`p-2 mt-2 flex justify-between items-center ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {isEditing === index ? (
              <input 
                type="text" 
                className="border-2 p-1 rounded-lg w-full"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
              />
            ) : (
              <span>{todo.text}</span>
            )}

            <div className="flex">
              {isEditing === index ? (
                <button 
                  onClick={() => saveEdit(index)} 
                  className="bg-blue-500 text-white p-1 rounded mr-2"
                >
                  Save
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => toggleComplete(index)} 
                    className={`mr-2 p-1 rounded ${todo.completed ? 'bg-green-300' : 'bg-green-500 text-white'}`}
                  >
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button 
                    onClick={() => startEditing(index)} 
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                </>
              )}

              <button 
                onClick={() => deleteTodo(index)} 
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;