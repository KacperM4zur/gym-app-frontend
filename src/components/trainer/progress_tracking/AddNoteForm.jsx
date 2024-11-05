import React, { useState } from 'react';

const AddNoteForm = ({ onAddNote }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onAddNote(content);
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Dodaj notatkę..."
                className="w-full p-2 border rounded mb-2"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Dodaj Notatkę</button>
        </form>
    );
};

export default AddNoteForm;
