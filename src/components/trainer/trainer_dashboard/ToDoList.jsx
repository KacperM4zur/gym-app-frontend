import React, { useState, useEffect } from 'react';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });

    useEffect(() => {
        fetch('http://gym-app.test/api/todos', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then(response => response.json())
            .then(data => setTodos(data.todos));
    }, []);

    const handleAddTodo = async (e) => {
        e.preventDefault();
        const response = await fetch('http://gym-app.test/api/todos', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });

        if (response.ok) {
            const newTodoItem = await response.json();
            setTodos([...todos, newTodoItem.todo]);
            setNewTodo({ title: '', description: '' });
        }
    };

    const handleToggleComplete = async (id, completed) => {
        await fetch(`http://gym-app.test/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !completed }),
        });

        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
    };

    const handleDelete = async (id) => {
        await fetch(`http://gym-app.test/api/todos/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Lista zadań</h2>
            <form onSubmit={handleAddTodo} className="mb-6">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nowe zadanie"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="Opis"
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Dodaj
                </button>
            </form>
            <ul className="space-y-4">
                {todos.map(todo => (
                    <li key={todo.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                        <div className="flex items-center space-x-4">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleComplete(todo.id, todo.completed)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <div className={`flex flex-col ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                                <span className="font-medium">{todo.title}</span>
                                <span className="text-sm text-gray-600">{todo.description}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Usuń
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
