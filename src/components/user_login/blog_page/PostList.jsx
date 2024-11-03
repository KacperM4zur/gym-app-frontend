import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, onPostSelect, onDelete, userId }) => {
    return (
        <div>
            {posts.map((post) => (
                <PostItem
                    key={post.id}
                    post={post}
                    onClick={() => onPostSelect(post)}
                    onDelete={onDelete}
                    userId={userId}
                />
            ))}
        </div>
    );
};

export default PostList;
