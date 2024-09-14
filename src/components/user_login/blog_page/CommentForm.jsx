import React, { useState } from 'react';

const CommentForm = ({ postId, addComment }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = { id: Date.now(), author: 'Użytkownik', content: comment };
        addComment(postId, newComment);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                placeholder="Dodaj komentarz..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                rows="2"
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
                Dodaj Komentarz
            </button>
        </form>
    );
};

export default CommentForm;
