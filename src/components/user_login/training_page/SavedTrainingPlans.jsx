import React, { useState } from 'react';

const SavedTrainingPlans = ({ plans }) => {
    const [expandedPlan, setExpandedPlan] = useState(null);

    const togglePlan = (index) => {
        setExpandedPlan(expandedPlan === index ? null : index);
    };

    return (
        <div className="mb-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Zapisane Plany Treningowe</h2>
            {plans.map((plan, index) => (
                <div
                    key={index}
                    className="mb-4 p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => togglePlan(index)}
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <span className="text-blue-500">
                            <svg
                                className={`w-6 h-6 transition-transform ${expandedPlan === index ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </span>
                    </div>
                    {expandedPlan === index && (
                        <div className="mt-4">
                            {Object.entries(plan.days).map(([day, exercises], i) => (
                                <div key={i} className="mb-4">
                                    <h4 className="font-semibold">{day}</h4>
                                    <ul className="list-disc list-inside">
                                        {exercises.map((exercise, j) => (
                                            <li key={j}>
                                                {exercise.exercise} - Serie: {exercise.sets}, Powtórzenia: {exercise.reps}, Przerwa: {exercise.rest}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SavedTrainingPlans;
