import React, { useState } from 'react';
import Chat from "../../components/user_login/chat_page/Chat.jsx";
import AdviceSection from "../../components/user_login/chat_page/AdviceSection.jsx";
import LayoutDefaultUser from "../../components/user_defualt/LayoutDefaultUser.jsx"; // Dodajemy layout użytkownika, aby był spójny

const Consultations = () => {
    const [trainerName] = useState('Jan Nowak'); // Jeden trener, statyczne dane
    const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: 'Jan Nowak', content: 'Witaj! Jak mogę Ci pomóc dzisiaj?' },
        { id: 2, sender: 'User', content: 'Cześć! Mam pytanie odnośnie treningu na plecy.' },
    ]);

    const addMessage = (message) => {
        setChatMessages([...chatMessages, { id: chatMessages.length + 1, sender: 'User', content: message }]);
    };

    return (
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6">Konsultacje z Trenerem</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Trener: {trainerName}</h2>

                    {/* Sekcja czatu */}
                    <Chat messages={chatMessages} addMessage={addMessage} />

                    {/* Sekcja porad */}
                    <div className="mt-8">
                        <AdviceSection />
                    </div>
                </div>
            </div>
    );
};

export default Consultations;
