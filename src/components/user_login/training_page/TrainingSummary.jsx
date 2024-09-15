import React from 'react';

const TrainingSummary = ({ daysOfWeek, trainingPlan }) => {
    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Podsumowanie Planu Treningowego</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {daysOfWeek.map((day) => (
                    <div key={day} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">{day}</h3>
                        <ul className="list-disc list-inside">
                            {trainingPlan[day] ? (
                                trainingPlan[day].map((exercise, index) => (
                                    <li key={index} className="mb-2">
                                        <span className="font-semibold">{exercise.exercise}</span> - Serie: {exercise.sets}, Powtórzenia: {exercise.reps}, Przerwa: {exercise.rest}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400">Brak ćwiczeń</li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingSummary;
