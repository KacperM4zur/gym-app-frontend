import React, { useState } from 'react';

const CommentSection = ({ postId, comments }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = (e) => {
        e.preventDefault();
        const comment = {
            id: Date.now(),
            author: 'Użytkownik',
            content: newComment,
        };
        comments.push(comment); // W praktyce będziesz dodawał komentarze do stanu globalnego
        setNewComment('');
    };

    return (
        <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4">Komentarze</h3>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id} className="mb-2">
                        <strong>{comment.author}</strong>: {comment.content}
                    </div>
                ))
            ) : (
                <p>Brak komentarzy.</p>
            )}

            <form onSubmit={handleAddComment} className="mt-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Dodaj komentarz..."
                    className="w-full p-2 border rounded mb-2"
                    rows="3"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Dodaj Komentarz
                </button>
            </form>
        </div>
    );
};

export default CommentSection;
