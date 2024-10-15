import React, { useState, useEffect } from 'react';

const MaxLiftForm = ({ onAddMaxLift, liftToEdit, onCancel }) => {
    const [exercise, setExercise] = useState(liftToEdit ? liftToEdit.exercise : '');
    const [weight, setWeight] = useState(liftToEdit ? liftToEdit.weight : '');
    const [date, setDate] = useState(liftToEdit ? liftToEdit.date : '');

    useEffect(() => {
        if (liftToEdit) {
            setExercise(liftToEdit.exercise);
            setWeight(liftToEdit.weight);
            setDate(liftToEdit.date);
        }
    }, [liftToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (exercise && weight && date) {
            const newLift = { exercise, weight, date };
            onAddMaxLift(newLift);
            setExercise('');
            setWeight('');
            setDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-bold mb-4">{liftToEdit ? 'Edytuj Maksymalne Obciążenie' : 'Dodaj Maksymalne Obciążenie'}</h3>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ćwiczenie:</label>
                <input
                    type="text"
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Wpisz nazwę ćwiczenia"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ciężar (kg):</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Wpisz ciężar"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Data:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                />
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                    Anuluj
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    {liftToEdit ? 'Zaktualizuj' : 'Dodaj'}
                </button>
            </div>
        </form>
    );
};

export default MaxLiftForm;
