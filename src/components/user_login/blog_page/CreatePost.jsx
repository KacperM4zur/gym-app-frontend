import React, { useState } from 'react';

const CreatePost = ({ addPost, closeForm, currentUser }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // Przechowywanie pliku obrazu

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            id: Date.now(),
            title,
            summary: content.substring(0, 100) + '...',
            content,
            date: new Date().toLocaleDateString(),
            image: image ? URL.createObjectURL(image) : '', // Przechowywanie URL obrazu lokalnie
            comments: [],
            author: currentUser, // Autor to aktualny użytkownik
        };

        addPost(newPost);
        setTitle('');
        setContent('');
        setImage(null);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Zapisanie wybranego pliku
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Stwórz Nowy Post</h2>
            <input
                type="text"
                placeholder="Tytuł postu"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
            />
            <textarea
                placeholder="Treść postu"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                rows="4"
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 mb-4 border rounded"
                required
            />
            <div className="flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
                    Dodaj Post
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" type="button" onClick={closeForm}>
                    Anuluj
                </button>
            </div>
        </form>
    );
};

export default CreatePost;
