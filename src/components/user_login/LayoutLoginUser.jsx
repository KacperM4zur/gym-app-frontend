import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const LayoutLoginUser = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
                <div className="max-w-7xl mx-auto p-4">{children}</div>
            </main>
            <Footer />
        </div>
    );
};

export default LayoutLoginUser;
