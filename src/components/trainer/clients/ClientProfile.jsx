import React, { useState } from 'react';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

const ClientProfile = ({ client, supplementPlan, trainingPlan }) => {
    const [isSupplementPlanOpen, setIsSupplementPlanOpen] = useState(false);
    const [isTrainingPlanOpen, setIsTrainingPlanOpen] = useState(false);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-4">{client.name}</h2>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Telefon:</strong> {client.phone}</p>
            <p><strong>Wiek:</strong> {client.age}</p>

            {/* Plan Suplementacyjny */}
            <div className="mt-8">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsSupplementPlanOpen(!isSupplementPlanOpen)}
                >
                    <h3 className="text-2xl font-semibold mb-2">Aktualny Plan Suplementacyjny:</h3>
                    {isSupplementPlanOpen ? (
                        <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                    ) : (
                        <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                    )}
                </div>
                {isSupplementPlanOpen && (
                    <div className="bg-gray-100 p-4 rounded-lg shadow transition-all">
                        {supplementPlan ? (
                            Object.entries(supplementPlan).map(([day, supplements], index) => (
                                <div key={index}>
                                    <h4 className="text-xl font-semibold">{day}</h4>
                                    <ul className="list-disc list-inside">
                                        {supplements.map((supplement, idx) => (
                                            <li key={idx}>
                                                {supplement.name} – {supplement.amount} – {supplement.time}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Brak planu suplementacyjnego</p>
                        )}
                    </div>
                )}
            </div>

            {/* Plan Treningowy */}
            <div className="mt-8">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsTrainingPlanOpen(!isTrainingPlanOpen)}
                >
                    <h3 className="text-2xl font-semibold mb-2">Aktualny Plan Treningowy:</h3>
                    {isTrainingPlanOpen ? (
                        <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                    ) : (
                        <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                    )}
                </div>
                {isTrainingPlanOpen && (
                    <div className="bg-gray-100 p-4 rounded-lg shadow transition-all">
                        {trainingPlan ? (
                            Object.entries(trainingPlan).map(([day, exercises], index) => (
                                <div key={index}>
                                    <h4 className="text-xl font-semibold">{day}</h4>
                                    <ul className="list-disc list-inside">
                                        {exercises.map((exercise, idx) => (
                                            <li key={idx}>
                                                {exercise.name} – {exercise.sets} serie, {exercise.reps} powtórzeń
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Brak planu treningowego</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientProfile;
