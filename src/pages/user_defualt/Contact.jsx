import LayoutDefaultUser from "../../components/user_defualt/LayoutDefaultUser.jsx";
import React, { useState } from 'react';

const Contact = () => {
    // State for handling form input
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://gym-app.test/api/contact-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage('Wiadomość została wysłana pomyślnie.');
            } else {
                setResponseMessage('Wystąpił błąd: ' + (data.errors ? JSON.stringify(data.errors) : data.message));
            }
        } catch (error) {
            setResponseMessage('Wystąpił błąd podczas wysyłania wiadomości.');
        }
    };

    return (
        <LayoutDefaultUser>
            <div className="flex flex-col min-h-full bg-gray-50">
                {/* Header Section */}
                <div className="bg-gray-700 text-white py-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Kontakt</h1>
                    <p className="text-lg mb-6">Masz pytanie? Skontaktuj się z nami!</p>
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col lg:flex-row p-6">
                    {/* Image Section */}
                    <div className="lg:w-1/2 flex justify-center items-center">
                        <img
                            src="/src/assets/contact-image-jakub-zerdzicki.jpg"
                            alt="Contact Us"
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Contact Form Section */}
                    <div className="lg:w-1/2 p-6 flex justify-center items-center">
                        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-100 p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Formularz kontaktowy</h2>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Imię:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700">Wiadomość:</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Wyślij
                            </button>

                            {/* Response Message */}
                            {responseMessage && (
                                <div className="mt-4 text-center text-red-500">
                                    {responseMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </LayoutDefaultUser>
    );
};

export default Contact;
