import React from 'react';

const Summary = ({ daysOfWeek, supplements }) => {
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Twój plan suplementacyjny</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {daysOfWeek.map((day) => (
                    <div key={day} className="bg-gray-100 shadow-lg rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">{day}</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            {supplements[day] ? (
                                supplements[day].map((supplement, index) => (
                                    <li key={index} className="mb-2">
                                        <span className="font-semibold">{supplement.name}</span> - {supplement.amount} - {supplement.time}
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-400">Brak suplementów</li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Summary;
