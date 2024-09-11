// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link to="/dashboard" className="mr-4">Panel Główny</Link>
                    <Link to="/profile" className="mr-4">Profil</Link>
                    <Link to="/training" className="mr-4">Trening</Link>
                    <Link to="/supplementation" className="mr-4">Suplementacja</Link>
                    <Link to="/blog" className="mr-4">Blog</Link>
                    <Link to="/calculators" className="mr-4">Kalkulatory</Link>
                </div>
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Wyloguj</button>
            </div>
        </nav>
    );
};

export default Navbar;
