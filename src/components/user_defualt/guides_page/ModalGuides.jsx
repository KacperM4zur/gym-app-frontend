import React from 'react';
import {XCircleIcon} from "@heroicons/react/16/solid";

const ModalGuides = ({ children, closeModal }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                {/* Przycisk zamknięcia */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
                    onClick={closeModal}
                >
                    <XCircleIcon className="h-6 w-6" />
                </button>

                {/* Treść modala */}
                <div className="mt-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalGuides;
