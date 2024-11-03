import React from 'react';
import PostDetail from './PostDetail';

const PostModal = ({ postId, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/5 lg:w-1/2 max-h-screen overflow-y-auto">
                <button
                    onClick={onClose}
                    className="text-red-500 font-bold mb-4"
                >
                    Zamknij
                </button>
                <PostDetail postId={postId} />
            </div>
        </div>
    );
};

export default PostModal;
