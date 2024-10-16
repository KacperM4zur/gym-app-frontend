import React from 'react';

const ActionShortcut = ({ title, color, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`${color} text-white p-6 rounded-lg shadow-lg hover:opacity-90 transition duration-300 w-full`}
        >
            {title}
        </button>
    );
};

export default ActionShortcut;
