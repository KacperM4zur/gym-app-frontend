import React, { useState } from 'react';

const AddNoteForm = ({ clientId, onAddNote }) => {
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (note) {
            onAddNote(clientId, note); // Dodanie nowej notatki
            setNote(''); // Czyszczenie formularza
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Dodaj notatkę</h3>

            <div className="mb-4">
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    rows="3"
                    placeholder="Dodaj nową notatkę"
                ></textarea>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                Dodaj Notatkę
            </button>
        </form>
    );
};

export default AddNoteForm;
