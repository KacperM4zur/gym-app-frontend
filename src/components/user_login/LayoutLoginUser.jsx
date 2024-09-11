// LayoutDefaultUser.jsx
import React from 'react';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const LayoutDefaultUser = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default LayoutDefaultUser;
