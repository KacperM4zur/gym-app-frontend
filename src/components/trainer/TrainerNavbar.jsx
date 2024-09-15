import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TrainerNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    {/* Hamburger icon for mobile view */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    {/* Navigation links for larger screens */}
                    <div className="hidden md:flex space-x-4">
                        <Link to="/trainer-dashboard" className="mr-4">Panel Trenera</Link>
                        <Link to="/trainer-materials" className="mr-4">Materiały Edukacyjne</Link>
                        <Link to="/trainer-workout-plans" className="mr-4">Plany Treningowe</Link>
                        <Link to="/trainer-supplement-plans" className="mr-4">Plany Suplementacyjne</Link>
                        <Link to="/trainer-clients" className="mr-4">Klienci</Link>
                        <Link to="/trainer-progress" className="mr-4">Monitorowanie Postępów</Link>
                    </div>
                </div>
                {/* Logout button */}
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Wyloguj</button>
            </div>

            {/* Dropdown menu for mobile view */}
            {isOpen && (
                <div className="md:hidden">
                    <Link to="/trainer-dashboard" className="block py-2">Panel Trenera</Link>
                    <Link to="/trainer-materials" className="block py-2">Materiały Edukacyjne</Link>
                    <Link to="/trainer-workout-plans" className="block py-2">Plany Treningowe</Link>
                    <Link to="/trainer-supplement-plans" className="block py-2">Plany Suplementacyjne</Link>
                    <Link to="/trainer-clients" className="block py-2">Klienci</Link>
                    <Link to="/trainer-progress" className="block py-2">Monitorowanie Postępów</Link>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 px-4 py-2 mt-2 rounded-lg hover:bg-red-600"
                    >
                        Wyloguj
                    </button>
                </div>
            )}
        </nav>
    );
};

export default TrainerNavbar;
