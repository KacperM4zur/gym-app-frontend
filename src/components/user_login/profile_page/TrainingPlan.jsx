// import React, { useState, useEffect } from 'react';
//
// const TrainingPlan = () => {
//     const [activePlan, setActivePlan] = useState(null);
//     const [availablePlans, setAvailablePlans] = useState([]);
//     const [selectedPlan, setSelectedPlan] = useState(null);
//     const [daysOfWeek, setDaysOfWeek] = useState({});
//
//     useEffect(() => {
//         fetchActivePlan();
//         fetchAvailablePlans();
//         fetchDaysOfWeek();
//     }, []);
//
//     const fetchActivePlan = async () => {
//         try {
//             const response = await fetch('http://gym-app.test/api/user-active-workout-plan', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const data = await response.json();
//             setActivePlan(data.data);
//         } catch (error) {
//             console.error('Error fetching active workout plan:', error);
//         }
//     };
//
//     const fetchAvailablePlans = async () => {
//         try {
//             const response = await fetch('http://gym-app.test/api/user-workout-plans', {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const data = await response.json();
//             setAvailablePlans(data.data || []);
//         } catch (error) {
//             console.error('Error fetching workout plans:', error);
//         }
//     };
//
//     const fetchDaysOfWeek = async () => {
//         try {
//             const response = await fetch('http://gym-app.test/api/days');
//             const data = await response.json();
//             const daysMapping = data.data.reduce((acc, day) => {
//                 acc[day.id] = day.name;
//                 return acc;
//             }, {});
//             setDaysOfWeek(daysMapping);
//         } catch (error) {
//             console.error('Error fetching days of week:', error);
//         }
//     };
//
//     const handlePlanChange = (e) => {
//         const selectedId = parseInt(e.target.value, 10);
//         const plan = availablePlans.find((p) => p.id === selectedId);
//         setSelectedPlan(plan);
//     };
//
//     const activatePlan = async (planId) => {
//         try {
//             await fetch(`http://gym-app.test/api/workout-plans/${planId}/activate`, {
//                 method: 'PATCH',
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             fetchActivePlan();
//         } catch (error) {
//             console.error('Error activating workout plan:', error);
//         }
//     };
//
//     const getDayName = (dayId) => {
//         return daysOfWeek[dayId] || `Dzień ${dayId}`;
//     };
//
//     return (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-4">Aktualny Plan Treningowy</h2>
//             {activePlan ? (
//                 <div className="p-4 mb-4 bg-green-100 rounded">
//                     <h3 className="text-lg font-semibold">Tytuł: {activePlan.name}</h3>
//                     {activePlan.workout_days ? (
//                         <ul className="mt-2">
//                             {activePlan.workout_days.map((day) => (
//                                 <li key={day.id} className="mt-4">
//                                     <strong>{getDayName(day.day_id)}:</strong>
//                                     <ul className="ml-4 mt-2">
//                                         {day.workout_exercises.map((exercise) => (
//                                             <li key={exercise.id}>
//                                                 {exercise.exercise.name} - {exercise.sets} serie, {exercise.reps} powtórzeń, {exercise.weight}kg obciążenie, {exercise.break}s przerwa
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>Brak ćwiczeń w planie</p>
//                     )}
//                 </div>
//             ) : (
//                 <p>Brak aktywnego planu</p>
//             )}
//
//             <h3 className="text-xl font-bold mt-6">Wybierz inny plan do podglądu</h3>
//             <select onChange={handlePlanChange} className="w-full p-2 border rounded-lg mt-2">
//                 <option value="">Wybierz plan</option>
//                 {availablePlans.map((plan) => (
//                     <option key={plan.id} value={plan.id}>
//                         {plan.name}
//                     </option>
//                 ))}
//             </select>
//
//             {selectedPlan && (
//                 <div className="mt-4">
//                     <h3 className="text-lg font-semibold">Tytuł: {selectedPlan.name}</h3>
//                     <ul className="mt-2">
//                         {selectedPlan.plan && selectedPlan.plan.length > 0 ? (
//                             selectedPlan.plan.map((day) => (
//                                 <li key={day.day}>
//                                     <strong>Dzień {day.day}:</strong> {/* Zostawiamy oryginalny format, żeby uniknąć "undefined" */}
//                                     <ul className="ml-4">
//                                         {day.exercises.map((exercise, index) => (
//                                             <li key={index}>
//                                                 {exercise.name} - {exercise.sets} serie, {exercise.reps} powtórzeń, {exercise.weight}kg obciążenie, {exercise.break}s przerwa
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </li>
//                             ))
//                         ) : (
//                             <p>Brak ćwiczeń w tym planie</p>
//                         )}
//                     </ul>
//                     <button
//                         onClick={() => activatePlan(selectedPlan.id)}
//                         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//                     >
//                         Aktywuj Plan
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default TrainingPlan;
//
//
//

import React, { useState, useEffect } from 'react';

const TrainingPlan = () => {
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
            const response = await fetch('http://gym-app.test/api/user-active-workout-plan', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setActivePlan(data.data);
        } catch (error) {
            console.error('Error fetching active workout plan:', error);
        }
    };

    const fetchAvailablePlans = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/user-workout-plans', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setAvailablePlans(data.data || []);
        } catch (error) {
            console.error('Error fetching workout plans:', error);
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
            await fetch(`http://gym-app.test/api/workout-plans/${planId}/activate`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            fetchActivePlan();
        } catch (error) {
            console.error('Error activating workout plan:', error);
        }
    };

    const getDayName = (dayId) => {
        return daysOfWeek[dayId] || `Dzień ${dayId}`;
    };

    return (
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-6">Aktualny Plan Treningowy</h2>

            {activePlan ? (
                <div className="p-6 mb-6 bg-green-100 rounded-lg shadow-inner">
                    <h3 className="text-xl font-semibold text-green-900 mb-3">Plan: {activePlan.name}</h3>
                    <ul className="space-y-6">
                        {activePlan.workout_days.map((day) => (
                            <li key={day.id} className="border-b pb-4">
                                <div className="text-lg font-medium text-green-800">{getDayName(day.day_id)}</div>
                                <ul className="mt-2 space-y-1">
                                    {day.workout_exercises.map((exercise) => (
                                        <li key={exercise.id} className="flex justify-between items-center">
                                            <span className="text-gray-700 font-medium">
                                                {exercise.exercise.name}
                                            </span>
                                            <div className="text-gray-600 text-sm">
                                                <span>{exercise.sets} serie, {exercise.reps} powtórzeń</span> |
                                                <span> {exercise.weight}kg</span> |
                                                <span> {exercise.break}s przerwa</span>
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
                                    <div className="text-lg font-medium text-blue-800">Dzień {day.day}</div>
                                    <ul className="mt-2 space-y-1">
                                        {day.exercises.map((exercise, index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span className="text-gray-700 font-medium">
                                                    {exercise.name}
                                                </span>
                                                <div className="text-gray-600 text-sm">
                                                    <span>{exercise.sets} serie, {exercise.reps} powtórzeń</span> |
                                                    <span> {exercise.weight}kg</span> |
                                                    <span> {exercise.break}s przerwa</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))
                        ) : (
                            <p>Brak ćwiczeń w tym planie</p>
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

export default TrainingPlan;
