import React, { useState } from 'react';

const PostForm = ({ addPost }) => {
    const [formData, setFormData] = useState({ title: '', content: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.content) {
            addPost(formData);
            setFormData({ title: '', content: '' }); // Reset formularza
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Dodaj Nowy Post</h2>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Tytuł</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Wpisz tytuł posta"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Treść</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Wpisz treść posta"
                        rows="5"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                    Dodaj Post
                </button>
            </form>
        </div>
    );
};

export default PostForm;
