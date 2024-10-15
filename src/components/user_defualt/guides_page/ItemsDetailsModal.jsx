import React from 'react';

const ItemsDetailsModal = ({ item, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full shadow-lg">
                <h2 className="text-3xl font-bold mb-6">{item.name}</h2>
                <p className="text-gray-800 mb-4">{item.description}</p>

                {item.technique && (
                    <>
                        <h4 className="text-xl font-bold">Technika</h4>
                        <p className="mb-4">{item.technique}</p>
                    </>
                )}
                {item.advantages && (
                    <>
                        <h4 className="text-xl font-bold">Zalety</h4>
                        <p className="mb-4">{item.advantages}</p>
                    </>
                )}
                {item.disadvantages && (
                    <>
                        <h4 className="text-xl font-bold">Wady</h4>
                        <p className="mb-4">{item.disadvantages}</p>
                    </>
                )}
                <div className="flex justify-end">
                    <button
                        onClick={closeModal}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Zamknij
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ItemsDetailsModal;
