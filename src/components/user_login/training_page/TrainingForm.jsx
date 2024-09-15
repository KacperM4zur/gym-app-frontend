import React from 'react';
import {PlusCircleIcon, XCircleIcon} from "@heroicons/react/16/solid";

const TrainingForm = ({ currentExercise, handleExerciseChange, addExercise, setStep, selectedDay, exerciseOptions }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Dodaj ćwiczenie dla {selectedDay}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <select
                    name="exercise"
                    value={currentExercise.exercise}
                    onChange={handleExerciseChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Wybierz ćwiczenie</option>
                    {exerciseOptions.map((exercise, index) => (
                        <option key={index} value={exercise}>{exercise}</option>
                    ))}
                </select>
                <input
                    type="number"
                    name="sets"
                    placeholder="Serie"
                    value={currentExercise.sets}
                    onChange={handleExerciseChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="reps"
                    placeholder="Powtórzenia"
                    value={currentExercise.reps}
                    onChange={handleExerciseChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="rest"
                    placeholder="Przerwa (minuty)"
                    value={currentExercise.rest}
                    onChange={handleExerciseChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setStep(1)}
                    className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-transform transform hover:scale-105"
                >
                    <XCircleIcon className="w-6 h-6 inline-block mr-2" />
                    Anuluj
                </button>
                <button
                    onClick={addExercise}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
                >
                    <PlusCircleIcon className="w-6 h-6 inline-block mr-2" />
                    Dodaj ćwiczenie
                </button>
            </div>
        </div>
    );
};

export default TrainingForm;
