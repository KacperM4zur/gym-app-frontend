import React, { useState } from 'react';

const WeightForm = ({ onAddWeight }) => {
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddWeight({ weight: parseFloat(weight), date });
        setWeight('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <label className="block mb-2">Waga (kg)</label>
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

export default WeightForm;
