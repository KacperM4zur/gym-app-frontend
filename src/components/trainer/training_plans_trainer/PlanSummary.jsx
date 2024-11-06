import React from 'react';

const PlanSummary = ({ plan }) => {
    return (
        <div className="p-4 mt-4 border rounded bg-white">
            <h4 className="text-lg font-semibold">Podsumowanie planu</h4>
            {plan.map((day, index) => (
                <div key={index} className="mt-2">
                    <p className="font-semibold">{day.day}</p>
                    <ul className="list-disc ml-4">
                        {day.exercises.map((exercise, exIndex) => (
                            <li key={exIndex}>
                                {exercise.name} - {exercise.sets} serii x {exercise.reps} powt. ({exercise.weight} kg, przerwa {exercise.break} s)
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PlanSummary;
