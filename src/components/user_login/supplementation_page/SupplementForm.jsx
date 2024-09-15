import React from 'react';
import {PlusCircleIcon, XCircleIcon} from "@heroicons/react/16/solid";

const SupplementForm = ({
                            currentSupplement,
                            handleSupplementChange,
                            addSupplement,
                            setStep,
                            selectedDay,
                            supplementOptions,
                        }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Dodaj suplement dla {selectedDay}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                    name="name"
                    value={currentSupplement.name}
                    onChange={handleSupplementChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Wybierz suplement</option>
                    {supplementOptions.map((supp) => (
                        <option key={supp} value={supp}>{supp}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="amount"
                    placeholder="Ilość (mg/ml/szt.)"
                    value={currentSupplement.amount}
                    onChange={handleSupplementChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="time"
                    placeholder="Kiedy (np. rano, po obiedzie)"
                    value={currentSupplement.time}
                    onChange={handleSupplementChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setStep(1)}
                    className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-transform transform hover:scale-105"
                >
                    <XCircleIcon className="w-6 h-6 inline-block mr-2" />
                    Anuluj
                </button>
                <button
                    onClick={addSupplement}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
                >
                    <PlusCircleIcon className="w-6 h-6 inline-block mr-2" />
                    Dodaj suplement
                </button>
            </div>
        </div>
    );
};

export default SupplementForm;
