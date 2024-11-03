import React, { useState, useEffect } from 'react';
import CommentSection from './CommentSection';

const PostDetail = ({ post, onBack }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, [post]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`http://gym-app.test/api/posts/${post.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setComments(data.data.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = (newComment) => {
        setComments([...comments, newComment]);
    };

    return (
        <div>
            <button onClick={onBack} className="text-blue-500 mb-4">← Powrót do listy postów</button>
            <h2 className="text-3xl font-bold">{post.title}</h2>
            <p className="text-gray-700 mt-4 mb-6">{post.body}</p>
            <CommentSection postId={post.id} comments={comments} onAddComment={handleAddComment} />
        </div>
    );
};

export default PostDetail;
