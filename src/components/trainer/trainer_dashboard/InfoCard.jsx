import React from 'react';

const InfoCard = ({ title, value, description }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="text-4xl font-bold">{value}</p>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default InfoCard;
