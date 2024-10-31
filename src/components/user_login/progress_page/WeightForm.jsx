

import React, { useState } from 'react';

const WeightForm = ({ onSubmit }) => {
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://gym-app.test/api/user-weights', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    weight: parseFloat(weight),
                    date,
                }),
            });

            if (response.ok) {
                setWeight('');
                setDate('');
                onSubmit();
            } else {
                console.error("Failed to submit weight entry.");
            }
        } catch (error) {
            console.error("Error submitting weight entry:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <label className="block font-semibold mb-2">Waga (kg):</label>
            <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4 w-full"
                required
            />
            <label className="block font-semibold mb-2">Data:</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4 w-full"
                required
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Dodaj
            </button>
        </form>
    );
};

export default WeightForm;
