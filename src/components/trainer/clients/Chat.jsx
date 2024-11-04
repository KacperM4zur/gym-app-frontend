import React, { useState, useEffect, useRef } from 'react';

const Chat = ({ senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null);

    useEffect(() => {
        fetchMessages();
    }, [receiverId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://gym-app.test/api/clients/${senderId}/${receiverId}/messages`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setMessages(data);
            } else {
                console.error("Failed to fetch messages.");
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const response = await fetch(`http://gym-app.test/api/clients/${senderId}/messages/send`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    receiver_id: receiverId,
                    message: newMessage
                })
            });
            const data = await response.json();
            if (response.ok) {
                setMessages(prevMessages => [...prevMessages, data]);
                setNewMessage("");
                scrollToBottom();
            } else {
                console.error("Failed to send message.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex flex-col h-full bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">Czat</h2>

            {/* Sekcja wiadomości z przewijaniem */}
            <div className="flex-1 overflow-y-auto mb-4 p-2 max-h-[400px] space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender_id === senderId ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs p-2 rounded-lg ${msg.sender_id === senderId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                            style={{
                                borderRadius: "15px",
                                padding: "10px 15px",
                                maxWidth: "60%", // Ogranicza szerokość wiadomości
                                wordWrap: "break-word" // Złamuje długie słowa
                            }}
                        >
                            {msg.message}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Pole do wpisywania wiadomości */}
            <div className="flex items-center">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Napisz wiadomość..."
                    className="flex-1 p-2 border rounded-lg mr-2"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Wyślij
                </button>
            </div>
        </div>
    );
};

export default Chat;
