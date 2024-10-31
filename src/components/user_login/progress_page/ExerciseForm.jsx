import React, { useState, useEffect } from 'react';

const ExerciseForm = ({ onSubmit }) => {
    const [exerciseId, setExerciseId] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');
    const [exercises, setExercises] = useState([]);

    const fetchExercises = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/exercises', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setExercises(data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://gym-app.test/api/user-max-lifts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exercise_id: exerciseId,
                    weight,
                    date
                })
            });
            setExerciseId('');
            setWeight('');
            setDate('');
            onSubmit(); // Wywołanie funkcji aktualizacji
        } catch (error) {
            console.error("Error adding max lift:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Wybierz ćwiczenie:</label>
                <select
                    value={exerciseId}
                    onChange={(e) => setExerciseId(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">-- Wybierz ćwiczenie --</option>
                    {exercises.map((exercise) => (
                        <option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Maksymalne obciążenie (kg):</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Data:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Dodaj
            </button>
        </form>
    );
};

export default ExerciseForm;
