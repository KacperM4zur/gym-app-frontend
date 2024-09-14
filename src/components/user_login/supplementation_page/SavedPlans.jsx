// components/SavedPlans.jsx
import React from 'react';

const SavedPlans = ({ plans, selectPlan }) => {
    return (
        <div className="mb-8">
            <h1 className="text-5xl font-semibold mb-6 text-center text-gray-800">Zapisane Plany Suplementacyjne</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        onClick={() => selectPlan(plan)}
                        className="bg-gray-200 shadow-lg rounded-lg p-6 cursor-pointer transition-transform transform hover:scale-105"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">Plan {index + 1}</h3>
                        <p className="text-gray-500">Suplementacja na {Object.keys(plan).length} dni</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedPlans;
