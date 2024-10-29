import React from 'react';

const SupplementSummary = ({ daysOfWeek, supplements, supplementOptions = [] }) => {
    // Funkcja mapująca `supplement_id` na nazwę suplementu
    const getSupplementName = (supplementId) => {
        const supplement = supplementOptions.find(supp => supp.id === parseInt(supplementId, 10));
        return supplement ? supplement.name : 'Nieznany suplement';
    };

    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Podsumowanie Planu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {daysOfWeek.map((day) => (
                    <div key={day} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">{day}</h3>
                        <ul className="list-disc list-inside">
                            {supplements[day] ? (
                                supplements[day].map((supplement, index) => (
                                    <li key={index} className="mb-2">
                                        <span className="font-semibold">{getSupplementName(supplement.supplement_id)}</span> - {supplement.amount} - {supplement.unit}
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

export default SupplementSummary;
