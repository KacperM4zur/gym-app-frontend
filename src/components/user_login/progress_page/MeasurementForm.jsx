import React, { useState } from 'react';

const MeasurementForm = ({ onAddMeasurement }) => {
    const [part, setPart] = useState('Klatka piersiowa');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');

    const bodyParts = ['Klatka piersiowa', 'Plecy', 'Nogi', 'Ramiona'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMeasurement({ part, value: parseFloat(value), date });
        setValue('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <label className="block mb-2">Partia ciała</label>
            <select
                value={part}
                onChange={(e) => setPart(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                {bodyParts.map((part) => (
                    <option key={part} value={part}>
                        {part}
                    </option>
                ))}
            </select>
            <label className="block mb-2">Wartość (cm)</label>
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
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

export default MeasurementForm;
