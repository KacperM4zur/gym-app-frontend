import React, { useState } from 'react';

const AddNoteForm = ({ onAddNote }) => {
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (note) {
            onAddNote(note);
            setNote(''); // Resetuj pole
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Dodaj Notatkę</h2>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
                <textarea
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Wpisz notatkę o postępach klienta"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows="4"
                ></textarea>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                    Dodaj Notatkę
                </button>
            </form>
        </div>
    );
};

export default AddNoteForm;
