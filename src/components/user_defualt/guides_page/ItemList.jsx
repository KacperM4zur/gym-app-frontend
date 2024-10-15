import React from 'react';

const ItemList = ({ items, onItemSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
                <div
                    key={index}
                    onClick={() => onItemSelect(item)}
                    className="bg-white p-8 rounded-lg shadow-lg hover:bg-blue-100 cursor-pointer transition-transform transform hover:scale-105"
                >
                    <h3 className="text-2xl font-semibold mb-4">{item.name}</h3>
                    <p className="text-gray-700">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ItemList;
