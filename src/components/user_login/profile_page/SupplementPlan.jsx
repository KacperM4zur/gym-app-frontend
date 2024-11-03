// import React, { useState } from 'react';
//
// const SupplementPlan = () => {
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const plans = [
//         { id: 1, name: 'Plan dla początkujących', supplements: ['Białko serwatkowe', 'Witamina D'] },
//         { id: 2, name: 'Plan zaawansowany', supplements: ['Kreatyna', 'BCAA', 'Omega-3'] }
//     ];
//
//     const handlePlanSelect = (plan) => {
//         setSelectedPlan(plan);
//     };
//
//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Plan Suplementacyjny</h2>
//
//             {/* Wybór planu */}
//             <div className="mb-4">
//                 <label className="block text-gray-700 font-semibold mb-2">Wybierz plan</label>
//                 <select
//                     onChange={(e) => handlePlanSelect(plans.find(plan => plan.id === Number(e.target.value)))}
//                     className="w-full p-2 border rounded-lg"
//                 >
//                     <option value="">Wybierz plan</option>
//                     {plans.map(plan => (
//                         <option key={plan.id} value={plan.id}>{plan.name}</option>
//                     ))}
//                 </select>
//             </div>
//
//             {/* Podgląd wybranego planu */}
//             {selectedPlan && (
//                 <div className="mt-6">
//                     <h3 className="text-xl font-bold mb-2">{selectedPlan.name}</h3>
//                     <ul className="list-disc ml-5">
//                         {selectedPlan.supplements.map((supplement, index) => (
//                             <li key={index}>{supplement}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default SupplementPlan;

import React, { useState, useEffect } from 'react';

const SupplementPlan = () => {
    const [activePlan, setActivePlan] = useState(null);
    const [availablePlans, setAvailablePlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [daysOfWeek, setDaysOfWeek] = useState({});

    useEffect(() => {
        fetchActivePlan();
        fetchAvailablePlans();
        fetchDaysOfWeek();
    }, []);

    const fetchActivePlan = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/user-active-supplement-plan', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setActivePlan(data.data);
        } catch (error) {
            console.error('Error fetching active supplement plan:', error);
        }
    };

    const fetchAvailablePlans = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/user-supplement-plans', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setAvailablePlans(data.data || []);
        } catch (error) {
            console.error('Error fetching supplement plans:', error);
        }
    };

    const fetchDaysOfWeek = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/days');
            const data = await response.json();
            const daysMapping = data.data.reduce((acc, day) => {
                acc[day.id] = day.name;
                return acc;
            }, {});
            setDaysOfWeek(daysMapping);
        } catch (error) {
            console.error('Error fetching days of week:', error);
        }
    };

    const handlePlanChange = (e) => {
        const selectedId = parseInt(e.target.value, 10);
        const plan = availablePlans.find((p) => p.id === selectedId);
        setSelectedPlan(plan);
    };

    const activatePlan = async (planId) => {
        try {
            await fetch(`http://gym-app.test/api/supplement-plans/${planId}/activate`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            fetchActivePlan();
        } catch (error) {
            console.error('Error activating supplement plan:', error);
        }
    };

    const getDayName = (dayId) => {
        return daysOfWeek[dayId] || `Dzień ${dayId}`;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">Aktualny Plan Suplementacyjny</h2>

            {activePlan ? (
                <div className="p-6 mb-6 bg-green-100 rounded-lg shadow-inner">
                    <h3 className="text-xl font-semibold text-green-900 mb-3">Plan: {activePlan.name}</h3>
                    <ul className="space-y-6">
                        {activePlan.supplement_plan_days.map((day) => (
                            <li key={day.id} className="border-b pb-4">
                                <div className="text-lg font-medium text-green-800">{getDayName(day.day_id)}</div>
                                <ul className="mt-2 space-y-1">
                                    {day.supplement_details.map((detail) => (
                                        <li key={detail.id} className="flex justify-between items-center">
                                            <span className="text-gray-700 font-medium">
                                                {detail.supplement.name}
                                            </span>
                                            <div className="text-gray-600 text-sm">
                                                <span>{detail.amount} {detail.unit}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-gray-600">Brak aktywnego planu</p>
            )}

            <h3 className="text-2xl font-semibold mt-8 mb-4">Wybierz inny plan do podglądu</h3>
            <select
                onChange={handlePlanChange}
                className="w-full p-3 border rounded-lg mb-6 shadow"
            >
                <option value="">Wybierz plan</option>
                {availablePlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                        {plan.name}
                    </option>
                ))}
            </select>

            {selectedPlan && (
                <div className="p-6 bg-blue-100 rounded-lg shadow-inner">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3">Podgląd: {selectedPlan.name}</h3>
                    <ul className="space-y-6">
                        {selectedPlan.plan && selectedPlan.plan.length > 0 ? (
                            selectedPlan.plan.map((day) => (
                                <li key={day.day} className="border-b pb-4">
                                    <div className="text-lg font-medium text-blue-800">{getDayName(day.day)}</div>
                                    <ul className="mt-2 space-y-1">
                                        {day.supplements.map((supplement, index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span className="text-gray-700 font-medium">
                                                    {supplement.name}
                                                </span>
                                                <div className="text-gray-600 text-sm">
                                                    <span>{supplement.amount} {supplement.unit}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        ) : (
                            <p>Brak suplementów w tym planie</p>
                        )}
                    </ul>
                    <button
                        onClick={() => activatePlan(selectedPlan.id)}
                        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition"
                    >
                        Aktywuj Plan
                    </button>
                </div>
            )}
        </div>
    );
};

export default SupplementPlan;







