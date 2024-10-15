import React from 'react';

const CategoryCard = ({ category, isSelected, onClick }) => {
    return (
        <div
            onClick={() => onClick(category)}
            className={`p-6 text-lg font-semibold rounded-lg cursor-pointer transition-transform transform hover:scale-105 shadow-lg w-48 h-24 flex items-center justify-center text-center
            ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} `}
        >
            {category}
        </div>
    );
};

export default CategoryCard;
