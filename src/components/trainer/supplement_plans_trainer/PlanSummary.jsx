import React from 'react';

const PlanSummary = ({ plan, planName, onSave, planNameSet }) => {
    return (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Podgląd planu</h2>
            {planNameSet && <h3 className="text-xl font-semibold mb-2">{planName || 'Bez nazwy'}</h3>}
            {Object.keys(plan).length > 0 ? (
                Object.keys(plan).map((day) => (
                    <div key={day} className="mb-4">
                        <h4 className="font-bold">{day}</h4>
                        <ul className="list-disc ml-6">
                            {plan[day].map((supplement, index) => (
                                <li key={index}>
                                    {supplement.name} - {supplement.amount} - {supplement.time}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Brak suplementów w planie</p>
            )}

            {planNameSet && (
                <button
                    onClick={onSave}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-600 transition duration-300"
                >
                    Zapisz plan
                </button>
            )}
        </div>
    );
};

export default PlanSummary;
