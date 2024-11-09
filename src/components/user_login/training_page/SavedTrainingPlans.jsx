import React, { useState } from 'react';

const SavedTrainingPlans = ({ plans, exerciseOptions, onDelete }) => {
    const [expandedPlan, setExpandedPlan] = useState(null);
    const [planToDelete, setPlanToDelete] = useState(null);

    const togglePlan = (index) => {
        setExpandedPlan(expandedPlan === index ? null : index);
    };

    const getExerciseNameByName = (exerciseName) => {
        console.log('Received exerciseName:', exerciseName);
        console.log('Exercise options:', exerciseOptions);
        const exercise = exerciseOptions.find(ex => ex.name === exerciseName);
        console.log('Matched exercise:', exercise);
        return exercise ? exercise.name : 'Nieznane ćwiczenie';
    };

    const confirmDelete = (planId) => {
        setPlanToDelete(planId);
    };

    const cancelDelete = () => {
        setPlanToDelete(null);
    };

    const handleDelete = async () => {
        await onDelete(planToDelete);
        setPlanToDelete(null);
    };

    return (
        <div className="mb-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Zapisane Plany Treningowe</h2>
            {plans.map((plan, index) => (
                <div
                    key={index}
                    className="mb-4 p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => togglePlan(index)}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <span className="text-blue-500">
                            <svg
                                className={`w-6 h-6 transition-transform ${expandedPlan === index ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    </div>
                    {expandedPlan === index && (
                        <div className="mt-4">
                            {plan.plan.map((dayPlan, i) => (
                                <div key={i} className="mb-4">
                                    <h4 className="font-semibold">{dayPlan.day}</h4>
                                    <ul className="list-disc list-inside">
                                        {dayPlan.exercises.map((exercise, j) => {
                                            console.log('Exercise data:', exercise);
                                            return (
                                                <li key={j}>
                                                    {getExerciseNameByName(exercise.name)} - Waga: {exercise.weight}, Serie: {exercise.sets}, Powtórzenia: {exercise.reps}, Przerwa: {exercise.break || exercise.rest}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                            {/* Przycisk usunięcia planu */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    confirmDelete(plan.id);
                                }}
                                className="text-red-500 hover:text-red-700 mt-4"
                            >
                                Usuń
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {/* Modal potwierdzenia usunięcia */}
            {planToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Czy na pewno chcesz usunąć ten plan?</h2>
                        <div className="flex justify-end">
                            <button
                                onClick={cancelDelete}
                                className="mr-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Anuluj
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Tak, usuń
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedTrainingPlans;
