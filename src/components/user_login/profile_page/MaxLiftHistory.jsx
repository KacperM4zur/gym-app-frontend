import React from 'react';

const MaxLiftHistory = ({ maxLifts, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Historia Maksymalnych Obciążeń</h3>
            {maxLifts.length === 0 ? (
                <p className="text-gray-600">Brak zapisanych obciążeń.</p>
            ) : (
                <ul className="space-y-4">
                    {maxLifts.map((lift, index) => (
                        <li key={index} className="border p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold">{lift.exercise}</p>
                                <p>Ciężar: {lift.weight} kg</p>
                                <p>Data: {lift.date}</p>
                            </div>
                            <div className="space-x-4">
                                <button
                                    onClick={() => onEdit(lift)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Edytuj
                                </button>
                                <button
                                    onClick={() => onDelete(lift)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MaxLiftHistory;
