import React, { useState } from 'react';

const PlanForm = ({ onSave, onSetPlanName, planNameSet }) => {
    const [selectedDay, setSelectedDay] = useState('Poniedziałek');
    const [currentSupplement, setCurrentSupplement] = useState({ name: '', amount: '', time: '' });
    const [planName, setPlanName] = useState('');

    const handleAddSupplement = () => {
        if (currentSupplement.name && currentSupplement.amount && currentSupplement.time) {
            onSave(selectedDay, currentSupplement);
            setCurrentSupplement({ name: '', amount: '', time: '' });
        }
    };

    const handlePlanNameSubmit = () => {
        if (planName) {
            onSetPlanName(planName);
            setPlanName('');  // Reset nazwy planu po zapisaniu
        }
    };

    return (
        <div className="p-4 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4">Tworzenie planu suplementacyjnego</h2>

            {!planNameSet && (
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Nazwa planu</label>
                    <input
                        type="text"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        placeholder="Wprowadź nazwę planu"
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handlePlanNameSubmit}
                        className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition duration-300"
                    >
                        Zatwierdź nazwę planu
                    </button>
                </div>
            )}

            {/* Wybór dnia */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Wybierz dzień</label>
                <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg w-full"
                >
                    <option value="Poniedziałek">Poniedziałek</option>
                    <option value="Wtorek">Wtorek</option>
                    <option value="Środa">Środa</option>
                    <option value="Czwartek">Czwartek</option>
                    <option value="Piątek">Piątek</option>
                    <option value="Sobota">Sobota</option>
                    <option value="Niedziela">Niedziela</option>
                </select>
            </div>

            {/* Dodawanie suplementu */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Suplement</label>
                <input
                    type="text"
                    value={currentSupplement.name}
                    onChange={(e) => setCurrentSupplement({ ...currentSupplement, name: e.target.value })}
                    placeholder="Nazwa suplementu"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-2"
                />
                <input
                    type="text"
                    value={currentSupplement.amount}
                    onChange={(e) => setCurrentSupplement({ ...currentSupplement, amount: e.target.value })}
                    placeholder="Ilość"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-2"
                />
                <input
                    type="text"
                    value={currentSupplement.time}
                    onChange={(e) => setCurrentSupplement({ ...currentSupplement, time: e.target.value })}
                    placeholder="Pora dnia"
                    className="border border-gray-300 p-3 rounded-lg w-full mb-2"
                />
                <button
                    onClick={handleAddSupplement}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Dodaj suplement
                </button>
            </div>
        </div>
    );
};

export default PlanForm;
