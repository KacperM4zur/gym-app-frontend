import React, { useState } from 'react';

const TrainingPlan = () => {
    const availablePlans = [
        { id: 1, name: 'Plan Siłowy' },
        { id: 2, name: 'Plan Wytrzymałościowy' },
        { id: 3, name: 'Plan Cardio' },
    ];

    const [selectedPlan, setSelectedPlan] = useState(availablePlans[0]);

    const handlePlanChange = (e) => {
        const selectedId = parseInt(e.target.value, 10);
        const plan = availablePlans.find(p => p.id === selectedId);
        setSelectedPlan(plan);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Aktualny Plan Treningowy</h2>

            <div className="mb-4">
                <label className="block mb-2 font-semibold">Wybierz Plan</label>
                <select onChange={handlePlanChange} value={selectedPlan.id} className="w-full p-2 border rounded-lg">
                    {availablePlans.map(plan => (
                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                    ))}
                </select>
            </div>

            <h3 className="text-xl font-bold mb-4">Podgląd Plan {selectedPlan.name}</h3>
            <ul className="list-disc list-inside">
                {/* Przykładowe ćwiczenia */}
                <li>Poniedziałek: Wyciskanie sztangi - 4 serie, 10 powtórzeń</li>
                <li>Środa: Martwy ciąg - 3 serie, 8 powtórzeń</li>
                <li>Piątek: Przysiady - 4 serie, 12 powtórzeń</li>
            </ul>
        </div>
    );
};

export default TrainingPlan;
