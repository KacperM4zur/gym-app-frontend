import React, { useState, useEffect } from 'react';

const Chat = ({ trainerId, closeChat }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        const message = {
            id: Date.now(),
            content: newMessage,
            author: 'Użytkownik',
            timestamp: new Date().toLocaleTimeString()
        };
        setMessages([...messages, message]);
        setNewMessage('');
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <button onClick={closeChat} className="text-red-500 float-right">Zamknij</button>
            <h2 className="text-2xl font-bold mb-4">Czat z trenerem {trainerId}</h2>
            <div className="chat-box h-64 overflow-y-scroll border p-4 mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.author === 'Użytkownik' ? 'text-right' : 'text-left'}`}>
                        <span className="font-bold">{msg.author}</span>: {msg.content}
                        <div className="text-xs text-gray-500">{msg.timestamp}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Napisz wiadomość..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
                    Wyślij
                </button>
            </form>
        </div>
    );
};

export default Chat;
