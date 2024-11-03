import React from 'react';
import CommentForm from './CommentForm';

const CommentSection = ({ postId, comments, onAddComment }) => {
    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Komentarze</h3>
            {comments.map((comment) => (
                <div key={comment.id} className="mb-4 p-2 bg-gray-100 rounded">
                    <p>{comment.body}</p>
                    {comment.customer && comment.customer.name && (
                        <p className="text-sm text-gray-600">Autor: {comment.customer.name}</p>
                    )}
                </div>
            ))}
            <CommentForm postId={postId} onAddComment={onAddComment} />
        </div>
    );
};

export default CommentSection;
