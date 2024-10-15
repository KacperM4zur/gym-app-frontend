import React from 'react';

const ProgressDetails = ({ progress }) => {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Postępy Klienta</h2>
            {progress.length === 0 ? (
                <p className="text-gray-600">Brak zapisanych postępów.</p>
            ) : (
                <table className="w-full bg-white shadow-md rounded-lg">
                    <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-3">Data</th>
                        <th className="p-3">Waga (kg)</th>
                        <th className="p-3">Wyciskanie (kg)</th>
                        <th className="p-3">Przysiady (kg)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {progress.map((entry, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-3">{entry.date}</td>
                            <td className="p-3">{entry.weight}</td>
                            <td className="p-3">{entry.benchPress}</td>
                            <td className="p-3">{entry.squat}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProgressDetails;
