import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ trainer, userId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://gym-app.test/api/contact_messages/${userId}/${trainer.id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setMessages(data);
                scrollToBottom();
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [trainer, userId]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const messageData = {
                sender_id: userId,
                receiver_id: trainer.id,
                message: newMessage,
            };

            try {
                const response = await fetch('http://gym-app.test/api/contact_messages/send', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageData),
                });

                if (response.ok) {
                    const sentMessage = await response.json();
                    setMessages((prevMessages) => [...prevMessages, sentMessage]);
                    setNewMessage('');
                    scrollToBottom();
                } else {
                    console.error("Failed to send message");
                }
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg mb-4 shadow-inner max-h-96">
            <h3 className="text-xl font-semibold mb-2">Czat z trenerem: {trainer.name}</h3>
            <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg mb-4 shadow-inner">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender_id === userId ? 'justify-end' : 'justify-start'} mb-2`}
                    >
                        <span
                            className={`px-4 py-2 rounded-lg ${msg.sender_id === userId ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        >
                            {msg.message}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center mt-4">
                <input
                    type="text"
                    placeholder="Napisz wiadomość..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-2 border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition"
                >
                    Wyślij
                </button>
            </div>
        </div>
    );
};

export default Chat;
