import React, { useState, useEffect } from 'react';
import './css/todoarea.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      try {
        const response = await fetch('http://localhost:3500/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: newTodo }),
        });
        const data = await response.json();
        console.log(data);
        setNewTodo('');
        fetchTodos();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/api/todos/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const editTodo = async (id, newValue) => {
    try {
      const response = await fetch(`http://localhost:3500/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newValue }),
      });
      const data = await response.json();
      console.log(data);
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo">
      <div className="container">
        <div className="input_field">
          <input
            type="text"
            value={newTodo}
            placeholder="task"
            onChange={handleInputChange}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul className="tasks">
          {todos.map((todo) => (
            <li key={todo.id} className="task-item">
              {todo.text}
              <div className="btns">
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button
                  onClick={() => editTodo(todo.id, prompt('Enter new value', todo.text))}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
