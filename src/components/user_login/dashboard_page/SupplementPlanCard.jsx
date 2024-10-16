import React from 'react';

const SupplementPlanCard = ({ currentDay, supplementsToday }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Suplementy na dziś</h2>
            {supplementsToday.length > 0 ? (
                <ul className="list-disc list-inside">
                    {supplementsToday.map((supplement, index) => (
                        <li key={index} className="mb-2">{supplement}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">Brak suplementów na dzisiaj.</p>
            )}
        </div>
    );
};

export default SupplementPlanCard;
