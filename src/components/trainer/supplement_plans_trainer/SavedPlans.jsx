import React, { useEffect, useState } from 'react';

const SavedPlans = ({ clientId, refresh, onRefreshComplete }) => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            const response = await fetch(`http://gym-app.test/api/clients/${clientId}/supplement-plans`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setPlans(data.data.reverse()); // Display latest plans first
        };

        if (clientId) {
            fetchPlans();
        }
    }, [clientId]);

    // Odświeżanie, gdy zmienia się prop `refresh`
    useEffect(() => {
        if (refresh && clientId) {
            const fetchPlans = async () => {
                const response = await fetch(`http://gym-app.test/api/clients/${clientId}/supplement-plans`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const data = await response.json();
                setPlans(data.data.reverse()); // Display latest plans first
                onRefreshComplete(); // Informujemy rodzica o zakończeniu odświeżania
            };
            fetchPlans();
        }
    }, [refresh, clientId, onRefreshComplete]);

    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold">Zapisane plany suplementacyjne</h3>
            {plans.length > 0 ? (
                plans.map((plan, index) => (
                    <div key={index} className="mt-2 p-3 border rounded bg-white shadow">
                        <strong className="text-lg">{plan.name}</strong>
                        {plan.plan.map((day, i) => (
                            <div key={i} className="mt-2">
                                <p className="font-semibold">{day.day}:</p>
                                <ul className="list-disc ml-4">
                                    {day.supplements.map((supp, j) => (
                                        <li key={j}>
                                            {supp.name} - {supp.amount} {supp.unit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p className="text-gray-500 mt-2">Brak zapisanych planów.</p>
            )}
        </div>
    );
};

export default SavedPlans;
