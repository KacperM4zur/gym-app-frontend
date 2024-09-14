import React from 'react';

const PostItem = ({ post, openPostModal }) => {
    return (
        <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden mb-6 transition-transform hover:scale-105 duration-200 cursor-pointer" onClick={() => openPostModal(post)}>
            {post.image && <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />} {/* Obraz postu */}
            <div className="p-6">
                <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.date}</p>
                <p className="text-gray-700 mb-4">{post.summary}</p>
            </div>
        </div>
    );
};

export default PostItem;
