import React, { useState, useEffect } from 'react';

const MeasurementForm = ({ onSubmit }) => {
    const [bodyParts, setBodyParts] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState('');
    const [measurement, setMeasurement] = useState('');
    const [date, setDate] = useState('');

    // Fetch body parts for selection
    useEffect(() => {
        const fetchBodyParts = async () => {
            try {
                const response = await fetch('http://gym-app.test/api/body-parts', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setBodyParts(data);
            } catch (error) {
                console.error("Error fetching body parts:", error);
            }
        };
        fetchBodyParts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://gym-app.test/api/user-measurements', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    body_part_id: selectedBodyPart,
                    measurement,
                    date,
                }),
            });
            onSubmit(); // Refresh chart data after submission
            setSelectedBodyPart('');
            setMeasurement('');
            setDate('');
        } catch (error) {
            console.error("Error adding measurement:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Dodaj Pomiary Ciała</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Wybierz część ciała:</label>
                <select
                    value={selectedBodyPart}
                    onChange={(e) => setSelectedBodyPart(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                    required
                >
                    <option value="">-- Wybierz część ciała --</option>
                    {bodyParts.map((part) => (
                        <option key={part.id} value={part.id}>
                            {part.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Pomiar (cm):</label>
                <input
                    type="number"
                    value={measurement}
                    onChange={(e) => setMeasurement(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Data:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mt-1"
                    required
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Dodaj
            </button>
        </form>
    );
};

export default MeasurementForm;
