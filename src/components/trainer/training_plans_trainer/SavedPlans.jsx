import React, { useEffect, useState } from 'react';

const SavedPlans = ({ clientId, refresh }) => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            const response = await fetch(`http://gym-app.test/api/clients/${clientId}/workout-plans`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setPlans(data.data ? data.data.reverse() : []); // Display latest plans first or set empty array
        };
        if (clientId) fetchPlans();
    }, [clientId, refresh]); // Re-fetch when clientId changes or refresh toggles

    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold">Zapisane plany treningowe</h3>
            {plans.length > 0 ? (
                plans.map((plan, index) => (
                    <div key={index} className="mt-2 p-3 border rounded bg-white shadow">
                        <strong className="text-lg">{plan.name}</strong>
                        {plan.plan && plan.plan.length > 0 ? (
                            plan.plan.map((day, i) => (
                                <div key={i} className="mt-2">
                                    <p className="font-semibold">{day.day}:</p>
                                    <ul className="list-disc ml-4">
                                        {day.exercises && day.exercises.length > 0 ? (
                                            day.exercises.map((exercise, j) => (
                                                <li key={j}>
                                                    {exercise.name} - {exercise.sets} serii x {exercise.reps} powt. ({exercise.weight} kg, przerwa {exercise.break} s)
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-500">Brak ćwiczeń w tym dniu.</li>
                                        )}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Brak dni w tym planie.</p>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-gray-500 mt-2">Brak zapisanych planów.</p>
            )}
        </div>
    );
};

export default SavedPlans;
