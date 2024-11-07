import React, { useEffect, useState } from 'react';

const SupplementPlanCard = ({ day }) => {
    const [supplementPlan, setSupplementPlan] = useState(null);
    const [days, setDays] = useState([]);

    useEffect(() => {
        const fetchSupplementPlan = async () => {
            const response = await fetch('http://gym-app.test/api/user-active-supplement-plan', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setSupplementPlan(data.data);
        };

        const fetchDays = async () => {
            const response = await fetch('http://gym-app.test/api/days', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setDays(data.data);
        };

        fetchSupplementPlan();
        fetchDays();
    }, []);

    const currentDay = days.find(d => d.number === day);

    const supplementsForDay = supplementPlan
        ? supplementPlan.supplement_plan_days.filter(dayPlan => dayPlan.day_id === day)
        : [];

    return (
        <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-2">Suplementy na {currentDay ? currentDay.name : 'dzień'}</h2>
            {supplementsForDay.length > 0 ? (
                supplementsForDay.map((dayPlan, index) => (
                    <div key={index}>
                        {dayPlan.supplement_details.map((supplement, supIndex) => (
                            <p key={supIndex}>
                                <strong>{supplement.supplement.name}</strong>: {supplement.amount} {supplement.unit}
                            </p>
                        ))}
                    </div>
                ))
            ) : (
                <p>Brak suplementów na dzisiaj.</p>
            )}
        </div>
    );
};

export default SupplementPlanCard;
