import React, { useState } from 'react';

const PlanForm = ({ onSavePlan, supplements, days, onPlanCreated }) => {
    const [planName, setPlanName] = useState('');
    const [plan, setPlan] = useState([]);

    const addDayToPlan = () => {
        setPlan([...plan, { day_of_week: '', supplements: [] }]);
    };

    const handleDayChange = (index, dayId) => {
        const updatedPlan = [...plan];
        updatedPlan[index].day_of_week = dayId;
        setPlan(updatedPlan);
    };

    const addSupplementToDay = (index) => {
        const updatedPlan = [...plan];
        updatedPlan[index].supplements.push({ supplement_id: '', amount: '', unit: '' });
        setPlan(updatedPlan);
    };

    const handleSupplementChange = (dayIndex, supplementIndex, field, value) => {
        const updatedPlan = [...plan];
        updatedPlan[dayIndex].supplements[supplementIndex][field] = value;
        setPlan(updatedPlan);
    };

    const handleSave = async () => {
        if (planName && plan.length > 0) {
            const newPlan = { plan_name: planName, plan };
            await onSavePlan(newPlan); // Call the function to save the plan in parent
            setPlanName(''); // Reset plan name
            setPlan([]); // Clear the plan
            onPlanCreated(newPlan); // Trigger callback to refresh the saved plans
        }
    };

    return (
        <div className="p-4 border rounded bg-gray-100 shadow-md mb-4">
            <h2 className="text-2xl font-semibold mb-4">Tworzenie planu suplementacyjnego</h2>
            <input
                type="text"
                placeholder="Nazwa planu"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            {plan.map((day, index) => (
                <div key={index} className="mb-4 p-3 border rounded bg-white shadow">
                    <label className="block mb-1">Wybierz dzień:</label>
                    <select
                        className="w-full p-2 border rounded mb-2"
                        onChange={(e) => handleDayChange(index, e.target.value)}
                        value={day.day_of_week || ''}
                    >
                        <option value="">-- Wybierz dzień --</option>
                        {days.map((dayOption) => (
                            <option key={dayOption.id} value={dayOption.id}>
                                {dayOption.name}
                            </option>
                        ))}
                    </select>
                    {day.supplements.map((supplement, supIndex) => (
                        <div key={supIndex} className="mt-2 flex items-center">
                            <select
                                className="flex-1 p-2 border rounded"
                                onChange={(e) => handleSupplementChange(index, supIndex, 'supplement_id', e.target.value)}
                                value={supplement.supplement_id || ''}
                            >
                                <option value="">-- Wybierz suplement --</option>
                                {supplements.map((supp) => (
                                    <option key={supp.id} value={supp.id}>
                                        {supp.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Ilość"
                                className="ml-2 p-2 border rounded w-1/4"
                                onChange={(e) => handleSupplementChange(index, supIndex, 'amount', e.target.value)}
                                value={supplement.amount || ''}
                            />
                            <input
                                type="text"
                                placeholder="Jednostka"
                                className="ml-2 p-2 border rounded w-1/4"
                                onChange={(e) => handleSupplementChange(index, supIndex, 'unit', e.target.value)}
                                value={supplement.unit || ''}
                            />
                        </div>
                    ))}
                    <button
                        onClick={() => addSupplementToDay(index)}
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
                    >
                        Dodaj suplement
                    </button>
                </div>
            ))}
            <button
                onClick={addDayToPlan}
                className="bg-green-500 text-white px-4 py-2 m-2 rounded shadow hover:bg-green-600 mb-4"
            >
                Dodaj dzień
            </button>
            <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 m-2 rounded shadow hover:bg-blue-700"
            >
                Zapisz plan
            </button>
        </div>
    );
};

export default PlanForm;
