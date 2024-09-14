import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts, openPostModal }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
                <PostItem key={post.id} post={post} openPostModal={openPostModal} />
            ))}
        </div>
    );
};

export default PostList;
