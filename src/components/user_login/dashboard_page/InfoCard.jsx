import React from 'react';

const InfoCard = ({ title, value, description }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-4xl font-bold mb-2">{value}</p>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default InfoCard;
