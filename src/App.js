import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Load saved todos from localStorage when app starts
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [inputValue, setInputValue] = useState('');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Function to add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Function to toggle todo completion status
  const toggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="app-container">
      <h1>📝 Todo List App</h1>
      
      {/* Input section */}
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a new task..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">
          Add Task
        </button>
      </div>

      {/* Todo list */}
      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No tasks yet! Add one above ☝️</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="todo-checkbox"
              />
              <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      {todos.length > 0 && (
        <div className="stats">
          <p>Total tasks: {todos.length}</p>
          <p>Completed: {todos.filter(todo => todo.completed).length}</p>
        </div>
      )}
    </div>
  );
}

export default App;