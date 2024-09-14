import React from 'react';
import CommentSection from './CommentSection';

const PostDetail = ({ post, addComment }) => {
    return (
        <div className="mt-6">
            <p className="text-gray-700 mb-4">{post.content}</p>
            <CommentSection postId={post.id} comments={post.comments} addComment={addComment} />
        </div>
    );
};

export default PostDetail;
