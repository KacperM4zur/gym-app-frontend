import React from 'react';
import CommentSection from './CommentSection';

const PostModal = ({ post, closePostModal }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg max-w-4xl w-full p-6 relative">
                {/* Przycisk zamykania w formie "X" */}
                <button
                    onClick={closePostModal}
                    className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 text-2xl"
                    style={{ zIndex: 10 }} // Zapewnienie, że przycisk "X" będzie nad obrazem
                >
                    &times; {/* Symbol X */}
                </button>

                {/* Obniżenie zdjęcia i dodanie marginesu na górze */}
                {post.image && (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-56 object-cover mb-6 rounded-lg"
                        style={{ marginTop: '40px' }} // Dodatkowy margines górny dla obrazu
                    />
                )}

                <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
                <p className="text-gray-600 mb-6">{post.date}</p>
                <p className="text-gray-800 mb-6">{post.content}</p>

                {/* Sekcja komentarzy */}
                <CommentSection postId={post.id} comments={post.comments} />
            </div>
        </div>
    );
};

export default PostModal;
