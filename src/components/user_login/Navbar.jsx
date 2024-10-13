import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
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
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <div className="hidden md:flex space-x-4">
                        <Link to="/dashboard" className="mr-4">Panel Główny</Link>
                        <Link to="/profile" className="mr-4">Profil</Link>
                        <Link to="/training" className="mr-4">Trening</Link>
                        <Link to="/supplementation" className="mr-4">Suplementacja</Link>
                        <Link to="/blog" className="mr-4">Blog</Link>
                        <Link to="/calculators" className="mr-4">Kalkulatory</Link>
                        <Link to="/consultations" className="mr-4">Konsultacje</Link>
                        <Link to="/progress" className="mr-4">Proges</Link>
                    </div>
                </div>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Wyloguj</button>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <Link to="/dashboard" className="block py-2">Panel Główny</Link>
                    <Link to="/profile" className="block py-2">Profil</Link>
                    <Link to="/training" className="block py-2">Trening</Link>
                    <Link to="/supplementation" className="block py-2">Suplementacja</Link>
                    <Link to="/blog" className="block py-2">Blog</Link>
                    <Link to="/calculators" className="block py-2">Kalkulatory</Link>
                    <Link to="/consultations" className="block py-2">Konsultacje</Link>
                    <Link to="/progress" className="block py-2">Progres</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
