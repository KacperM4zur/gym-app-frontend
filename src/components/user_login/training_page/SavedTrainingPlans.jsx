import react, { useState } from 'react';
import {EyeIcon} from "@heroicons/react/16/solid/index.js";

const SavedTrainingPlans = ({ plans }) => {
    const [expandedPlan, setExpandedPlan] = useState(null);

    const togglePlanDetails = (index) => {
        if (expandedPlan === index) {
            setExpandedPlan(null);  // Ukryj, jeśli jest już otwarty
        } else {
            setExpandedPlan(index);  // Rozwiń wybrany plan
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Zapisane Plany Treningowe</h2>
            <div className="space-y-4">
                {plans.map((plan, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-gray-700">
                                {plan.name || `Plan Treningowy ${index + 1}`}
                            </h3>
                            <button
                                onClick={() => togglePlanDetails(index)}
                                className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-105"
                            >
                                <EyeIcon className="w-6 h-6" />
                            </button>
                        </div>
                        {expandedPlan === index && (
                            <div className="mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.keys(plan.days).map((day) => (
                                        <div key={day} className="bg-gray-50 p-4 rounded-lg">
                                            <h4 className="text-lg font-semibold mb-2 text-gray-800">{day}</h4>
                                            <ul className="list-disc list-inside text-gray-600">
                                                {plan.days[day].map((exercise, i) => (
                                                    <li key={i} className="mb-2">
                                                        <span className="font-bold">{exercise.exercise}</span>
                                                        <br />Serie: {exercise.sets}, Powtórzenia: {exercise.reps}, Przerwa: {exercise.rest} min
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedTrainingPlans;
