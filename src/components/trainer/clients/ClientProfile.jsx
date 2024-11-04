import React, { useState } from 'react';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

const dayMap = {
    1: 'Poniedziałek',
    2: 'Wtorek',
    3: 'Środa',
    4: 'Czwartek',
    5: 'Piątek',
    6: 'Sobota',
    7: 'Niedziela'
};

const ClientProfile = ({ client, supplementPlan, trainingPlan }) => {
    const [isSupplementPlanOpen, setIsSupplementPlanOpen] = useState(false);
    const [isTrainingPlanOpen, setIsTrainingPlanOpen] = useState(false);

    if (!client) {
        return <p>Ładowanie profilu...</p>;
    }

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-4">{client.first_name} {client.last_name}</h2>
            <p><strong>Telefon:</strong> {client.phone}</p>
            <p><strong>Data urodzenia:</strong> {client.birthdate}</p>
            <p><strong>Adres:</strong> {client.address}</p>

            {/* Supplement Plan */}
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
                            supplementPlan.supplement_plan_days.map((day, index) => (
                                <div key={index}>
                                    <h4 className="text-xl font-semibold">{dayMap[day.day_id]}</h4>
                                    <ul className="list-disc list-inside">
                                        {day.supplement_details.map((supplement, idx) => (
                                            <li key={idx}>
                                                {supplement.supplement.name} - {supplement.amount} {supplement.unit}
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

            {/* Training Plan */}
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
                            trainingPlan.workout_days.map((day, index) => (
                                <div key={index}>
                                    <h4 className="text-xl font-semibold">{dayMap[day.day_id]}</h4>
                                    <ul className="list-disc list-inside">
                                        {day.workout_exercises.map((exercise, idx) => (
                                            <li key={idx}>
                                                {exercise.exercise.name} - {exercise.sets} serie, {exercise.reps} powtórzeń, {exercise.weight} kg
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


