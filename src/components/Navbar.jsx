import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars4Icon, XMarkIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Hook to get the current route
    const currentPath = location.pathname;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            {/* Logo / Title and Menu Toggle */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold p-2">GymApp</h1>
                <ul className="hidden lg:flex lg:space-x-4 ml-auto">
                    {/* Menu items for large screens */}
                    <li>
                        <Link
                            to={"/"}
                            className={`px-4 py-2 rounded-lg transition-colors ${currentPath === '/' ? 'text-red-600' : 'text-white hover:text-red-600'} ${currentPath === '/' ? 'bg-gray-800' : ''}`}
                        >
                            Strona główna
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/guides"}
                            className={`px-4 py-2 rounded-lg transition-colors ${currentPath === '/guides' ? 'text-red-600' : 'text-white hover:text-red-600'} ${currentPath === '/guides' ? 'bg-gray-800' : ''}`}
                        >
                            Poradniki
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/faq"}
                            className={`px-4 py-2 rounded-lg transition-colors ${currentPath === '/faq' ? 'text-red-600' : 'text-white hover:text-red-600'} ${currentPath === '/faq' ? 'bg-gray-800' : ''}`}
                        >
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/about"}
                            className={`px-4 py-2 rounded-lg transition-colors ${currentPath === '/about' ? 'text-red-600' : 'text-white hover:text-red-600'} ${currentPath === '/about' ? 'bg-gray-800' : ''}`}
                        >
                            Informacje o aplikacji
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/contact"}
                            className={`px-4 py-2 rounded-lg transition-colors ${currentPath === '/contact' ? 'text-red-600' : 'text-white hover:text-red-600'} ${currentPath === '/contact' ? 'bg-gray-800' : ''}`}
                        >
                            Kontakt
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/login"}
                            className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
                        >
                            Logowanie
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/register"}
                            className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
                        >
                            Rejestracja
                        </Link>
                    </li>
                </ul>
                {/* Hamburger Icon */}
                <button
                    className="lg:hidden p-2 text-white"
                    onClick={toggleMenu}
                >
                    {isOpen ? (
                        <XMarkIcon className="w-6 h-6" />
                    ) : (
                        <Bars4Icon className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <ul
                className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4 space-y-2`}
            >
                <li>
                    <Link
                        to={"/"}
                        className={`block px-4 py-2 rounded-lg transition-colors ${currentPath === '/' ? 'text-red-600' : 'text-white hover:text-red-600'}`}
                    >
                        Strona główna
                    </Link>
                </li>
                <li>
                    <Link
                        to={"/guides"}
                        className={`block px-4 py-2 rounded-lg transition-colors ${currentPath === '/guides' ? 'text-red-600' : 'text-white hover:text-red-600'}`}
                    >
                        Poradniki
                    </Link>
                </li>
                <li>
                    <Link
                        to={"/faq"}
                        className={`block px-4 py-2 rounded-lg transition-colors ${currentPath === '/faq' ? 'text-red-600' : 'text-white hover:text-red-600'}`}
                    >
                        FAQ
                    </Link>
                </li>
                <li>
                    <Link
                        to={"/about"}
                        className={`block px-4 py-2 rounded-lg transition-colors ${currentPath === '/about' ? 'text-red-600' : 'text-white hover:text-red-600'}`}
                    >
                        Informacje o aplikacji
                    </Link>
                </li>
                <li>
                    <Link
                        to={"/contact"}
                        className={`block px-4 py-2 rounded-lg transition-colors ${currentPath === '/contact' ? 'text-red-600' : 'text-white hover:text-red-600'}`}
                    >
                        Kontakt
                    </Link>
                </li>
                <li>
                    <Link
                        to={"/login"}
                        className="block px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
                    >
                        Logowanie
                    </Link>
                </li>
                <li>
                    <Link
                        to={"/register"}
                        className="block px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
                    >
                        Rejestracja
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
