// components/PlanModal.jsx
import React from 'react';
import {XCircleIcon} from "@heroicons/react/16/solid";

const PlanModal = ({ plan, closeModal, daysOfWeek }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 transition-colors"
                >
                    <XCircleIcon className="w-8 h-8" />
                </button>
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Podgląd Planu Suplementacyjnego</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="bg-gray-100 shadow-lg rounded-lg p-4">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">{day}</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                {plan[day] ? (
                                    plan[day].map((supplement, index) => (
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
        </div>
    );
};

export default PlanModal;
