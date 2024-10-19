import React from 'react';

const SavedPlans = ({ plans, selectedClientId, onDelete }) => {
    const clientPlans = plans.filter(plan => plan.clientId === selectedClientId);  // Filtrujemy plany dla wybranego klienta

    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6">Zapisane Plany Treningowe</h2>
            {clientPlans.length > 0 ? (
                clientPlans.map((plan, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow-md mb-4">
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        {Object.keys(plan.days).map((day, i) => (
                            <div key={i} className="mt-2">
                                <h4 className="font-semibold">{day}</h4>
                                <ul className="list-disc ml-5">
                                    {plan.days[day].map((exercise, j) => (
                                        <li key={j}>
                                            {exercise.name} - Serie: {exercise.sets}, Powtórzenia: {exercise.reps}, Odpoczynek: {exercise.rest}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <button
                            onClick={() => onDelete(plan.id)}
                            className="bg-red-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Usuń plan
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Brak zapisanych planów</p>
            )}
        </div>
    );
};

export default SavedPlans;
