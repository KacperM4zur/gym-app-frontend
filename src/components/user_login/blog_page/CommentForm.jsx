import React, { useState } from 'react';

const CommentForm = ({ postId, onAddComment }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://gym-app.test/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ body: comment }),
            });

            if (response.ok) {
                const newComment = await response.json();
                onAddComment(newComment.data);
                setComment('');
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                placeholder="Napisz komentarz..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                required
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Dodaj komentarz</button>
        </form>
    );
};

export default CommentForm;
