import React from 'react';

const SavedPlans = ({ plans, selectedClientId, onDelete }) => {
    const clientPlans = plans.filter(plan => plan.clientId === selectedClientId);

    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6">Zapisane Plany Suplementacyjne</h2>
            {clientPlans.length > 0 ? (
                clientPlans.map((plan, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow-md mb-4">
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        {Object.keys(plan.days).map((day, i) => (
                            <div key={i} className="mt-2">
                                <h4 className="font-semibold">{day}</h4>
                                <ul className="list-disc ml-5">
                                    {plan.days[day].map((supplement, j) => (
                                        <li key={j}>
                                            {supplement.name} - {supplement.amount}, {supplement.time}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {/* Przycisk do usunięcia planu */}
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
