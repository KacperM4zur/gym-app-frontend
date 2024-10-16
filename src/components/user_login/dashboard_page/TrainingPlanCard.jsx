import React from 'react';

const TrainingPlanCard = ({ currentDay, trainingToday }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Trening na dziś ({currentDay})</h2>
            {trainingToday.length > 0 ? (
                <ul className="list-disc list-inside">
                    {trainingToday.map((exercise, index) => (
                        <li key={index} className="mb-2">{exercise}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">Brak zaplanowanych treningów na dzisiaj.</p>
            )}
        </div>
    );
};

export default TrainingPlanCard;