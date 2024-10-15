import React, { useState } from 'react';

const AddProgressForm = ({ clientId, onAddProgress }) => {
    const [weight, setWeight] = useState('');
    const [note, setNote] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (weight && note && date) {
            const newProgress = {
                date: date,
                weight: parseFloat(weight),
                note: note
            };
            onAddProgress(clientId, newProgress);  // Wywołanie funkcji dodawania
            setWeight('');
            setNote('');
            setDate('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Dodaj nowy postęp</h3>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Waga (kg):</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Wprowadź wagę"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Notatka:</label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                    placeholder="Dodaj notatkę"
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-2">Data:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                Dodaj postęp
            </button>
        </form>
    );
};

export default AddProgressForm;
