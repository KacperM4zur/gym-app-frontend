import React, { useState } from 'react';

const PostItem = ({ post, onClick, onDelete, userId }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        onDelete(post.id);
        setShowModal(false);
    };

    return (
        <div className="p-4 mb-4 bg-gray-100 rounded shadow-md hover:bg-gray-200">
            <div onClick={onClick} className="cursor-pointer">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p>{post.body.substring(0, 100)}...</p>
                {post.customer && post.customer.name && (
                    <p className="text-sm text-gray-600">Autor: {post.customer.name}</p>
                )}
            </div>

            {post.customer && post.customer.id === userId && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowModal(true);
                    }}
                    className="mt-2 text-red-600 hover:underline"
                >
                    Usuń
                </button>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded">
                        <p className="mb-4">Czy na pewno chcesz usunąć ten post?</p>
                        <button onClick={handleDelete} className="mr-2 px-4 py-2 bg-red-600 text-white rounded">Tak</button>
                        <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Anuluj</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostItem;
