import React, { useState } from 'react';
import LayoutLoginUser from "../../components/user_login/LayoutLoginUser.jsx";
import TrainerList from "../../components/user_login/chat_page/TrainerList.jsx";
import Chat from "../../components/user_login/chat_page/Chat.jsx";
import AdviceSection from "../../components/user_login/chat_page/AdviceSection.jsx";

const trainers = [
    { id: 1, name: 'Jan Kowalski', specialty: 'Trening siłowy' },
    { id: 2, name: 'Anna Nowak', specialty: 'Trening funkcjonalny' },
    { id: 3, name: 'Tomasz Zieliński', specialty: 'Trening wytrzymałościowy' }
];

const advices = [
    { id: 1, title: 'Jak prawidłowo wykonywać przysiady?', content: 'Upewnij się, że... ', author: 'Jan Kowalski' },
    { id: 2, title: 'Znaczenie rozciągania po treningu', content: 'Rozciąganie pomaga... ', author: 'Anna Nowak' }
];

const Consultations = () => {
    const [selectedTrainer, setSelectedTrainer] = useState(null);

    const openChat = (trainerId) => {
        setSelectedTrainer(trainerId);
    };

    const closeChat = () => {
        setSelectedTrainer(null);
    };

    return (
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6">Konsultacje z Trenerami</h1>
                {!selectedTrainer ? (
                    <>
                        <TrainerList trainers={trainers} openChat={openChat} />
                        <AdviceSection advices={advices} />
                    </>
                ) : (
                    <Chat trainerId={selectedTrainer} closeChat={closeChat} />
                )}
            </div>
    );
};

export default Consultations;
