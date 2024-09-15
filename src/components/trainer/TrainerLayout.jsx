import React from 'react';
import TrainerNavbar from './TrainerNavbar.jsx';
import TrainerFooter from './TrainerFooter.jsx';

const TrainerLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <TrainerNavbar />
            <main className="flex-grow container mx-auto p-4">
                <div className="max-w-7xl mx-auto p-4">{children}</div>
            </main>
            <TrainerFooter />
        </div>
    );
};

export default TrainerLayout;
