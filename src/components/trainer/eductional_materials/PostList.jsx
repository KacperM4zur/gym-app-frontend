import React from 'react';

const PostList = ({ posts }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Lista Postów</h2>
            {posts.length === 0 ? (
                <p className="text-gray-600">Brak postów do wyświetlenia.</p>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-gray-600">{post.date}</p>
                        <p className="mt-2">{post.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;
