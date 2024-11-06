import React from 'react';

const PlanSummary = ({ plan }) => {
    return (
        <div className="p-4 border rounded mt-4">
            <h3 className="text-lg font-bold">Podsumowanie planu</h3>
            <p>Nazwa planu: {plan.plan_name}</p>
            {plan.plan.map((day, index) => (
                <div key={index} className="mt-2">
                    <strong>{day.day_of_week_name}</strong>
                    <ul>
                        {day.supplements.map((supp, i) => (
                            <li key={i}>
                                {supp.name} - {supp.amount} {supp.unit}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PlanSummary;
