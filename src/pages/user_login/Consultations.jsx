import React, { useState, useEffect } from 'react';
import Chat from "../../components/user_login/chat_page/Chat.jsx";
import AdviceSection from "../../components/user_login/chat_page/AdviceSection.jsx";

const Consultations = () => {
    const [trainers, setTrainers] = useState([]);
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetchTrainers();
        fetchUserId();
    }, []);

    const fetchTrainers = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/customers/trainers', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setTrainers(data);
        } catch (error) {
            console.error("Błąd pobierania trenerów:", error);
        }
    };

    const fetchUserId = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setUserId(data.id);
        } catch (error) {
            console.error("Błąd pobierania ID użytkownika:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Konsultacje z Trenerem</h1>
            <div className="flex space-x-4">
                <div className="w-1/3 bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Lista Trenerów</h2>
                    <ul>
                        {trainers.map((trainer) => (
                            <li key={trainer.id} className="mb-2">
                                <button
                                    onClick={() => setSelectedTrainer(trainer)}
                                    className={`px-4 py-2 w-full text-left rounded ${selectedTrainer && selectedTrainer.id === trainer.id ? 'bg-blue-100 text-blue-600' : 'bg-blue-500 text-white'}`}
                                >
                                    {trainer.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-2/3">
                    {selectedTrainer ? (
                        <Chat trainer={selectedTrainer} userId={userId} />
                    ) : (
                        <p className="text-gray-500 text-center">Wybierz trenera, aby rozpocząć czat.</p>
                    )}
                </div>
            </div>
            <div className="mt-4">
                <AdviceSection/>
            </div>

        </div>
    );
};

export default Consultations;
