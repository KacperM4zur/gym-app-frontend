import React, { useState } from 'react';

const Chat = ({ client }) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                text: message,
                sender: 'trener',  // Zdefiniowane, że trener wysyła wiadomość
                timestamp: new Date(),
            };
            setChatHistory([...chatHistory, newMessage]);
            setMessage('');
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-6">
            <h2 className="text-2xl font-bold mb-4">Czat z {client.name}</h2>

            <div className="h-64 overflow-y-auto bg-white p-4 rounded-lg shadow-inner mb-4">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender === 'trener' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === 'trener' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                            {msg.text}
                        </span>
                        <div className="text-xs text-gray-500">{msg.timestamp.toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>

            <div className="flex space-x-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Napisz wiadomość..."
                    className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Wyślij
                </button>
            </div>
        </div>
    );
};

export default Chat;
