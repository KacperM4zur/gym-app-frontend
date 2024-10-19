import React, { useState } from 'react';

const ExerciseForm = ({ onAddExercise }) => {
    const [exercise, setExercise] = useState('Przysiad');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');

    const exercises = ['Przysiad', 'Martwy ciąg', 'Wyciskanie na ławce', 'Podciąganie'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddExercise({ exercise, weight: parseFloat(weight), date });
        setWeight('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <label className="block mb-2">Ćwiczenie</label>
            <select
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                {exercises.map((ex) => (
                    <option key={ex} value={ex}>
                        {ex}
                    </option>
                ))}
            </select>
            <label className="block mb-2">Ciężar (kg)</label>
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
            />
            <label className="block mb-2">Data</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Dodaj
            </button>
        </form>
    );
};

export default ExerciseForm;
