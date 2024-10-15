import React, { useState } from 'react';

const SupplementPlan = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const plans = [
        { id: 1, name: 'Plan dla początkujących', supplements: ['Białko serwatkowe', 'Witamina D'] },
        { id: 2, name: 'Plan zaawansowany', supplements: ['Kreatyna', 'BCAA', 'Omega-3'] }
    ];

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Plan Suplementacyjny</h2>

            {/* Wybór planu */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Wybierz plan</label>
                <select
                    onChange={(e) => handlePlanSelect(plans.find(plan => plan.id === Number(e.target.value)))}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="">Wybierz plan</option>
                    {plans.map(plan => (
                        <option key={plan.id} value={plan.id}>{plan.name}</option>
                    ))}
                </select>
            </div>

            {/* Podgląd wybranego planu */}
            {selectedPlan && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">{selectedPlan.name}</h3>
                    <ul className="list-disc ml-5">
                        {selectedPlan.supplements.map((supplement, index) => (
                            <li key={index}>{supplement}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SupplementPlan;
