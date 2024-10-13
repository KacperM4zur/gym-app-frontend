import React from 'react';

const TrainerList = ({ trainers, openChat }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map(trainer => (
                <div key={trainer.id} className="bg-gray-200 shadow-md rounded-lg p-4 text-center">
                    <h2 className="text-2xl font-bold mb-2">{trainer.name}</h2>
                    <p className="text-gray-700 mb-4">{trainer.specialty}</p>
                    <button
                        onClick={() => openChat(trainer.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded">
                        Rozpocznij Czat
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TrainerList;
