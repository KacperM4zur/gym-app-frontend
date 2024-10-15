import React, { useState } from 'react';

const Chat = ({ messages, addMessage }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            addMessage(newMessage);
            setNewMessage(''); // Reset pola po wysłaniu
        }
    };

    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <div className="h-64 overflow-y-scroll mb-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`mb-2 ${msg.sender === 'User' ? 'text-right' : ''}`}>
                        <span className="font-bold">{msg.sender}: </span>
                        <span>{msg.content}</span>
                    </div>
                ))}
            </div>

            <div className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Napisz wiadomość..."
                    className="flex-grow p-2 border rounded-lg"
                />
                <button
                    onClick={handleSend}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Wyślij
                </button>
            </div>
        </div>
    );
};

export default Chat;
