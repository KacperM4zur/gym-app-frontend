import React, { useState } from 'react';

const SavedSupplementPlans = ({ plans, onDelete }) => {
    const [expandedPlan, setExpandedPlan] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [planToDelete, setPlanToDelete] = useState(null);

    const togglePlan = (index) => {
        setExpandedPlan(expandedPlan === index ? null : index);
    };

    const confirmDelete = (planId) => {
        setPlanToDelete(planId);
        setShowDeleteModal(true);
    };

    const deletePlan = () => {
        if (planToDelete !== null) {
            onDelete(planToDelete);
        }
        closeDeleteModal();
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setPlanToDelete(null);
    };

    return (
        <div className="mb-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Zapisane Plany Suplementacyjne</h2>
            {plans.map((plan, index) => (
                <div
                    key={plan.id}
                    className="mb-4 p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                >
                    <div className="flex justify-between items-center" onClick={() => togglePlan(index)}>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <span className={`text-blue-500 ${expandedPlan === index ? 'rotate-180' : ''}`}>
                            <svg
                                className="w-6 h-6 transition-transform"
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
                            {plan.plan.map((dayPlan, i) => (
                                <div key={i} className="mb-4">
                                    <h4 className="font-semibold">{dayPlan.day}</h4>
                                    <ul className="list-disc list-inside">
                                        {dayPlan.supplements.map((supplement, j) => (
                                            <li key={j}>
                                                {supplement.name} - {supplement.amount} {supplement.unit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    confirmDelete(plan.id);
                                }}
                                className="text-sm text-red-500 hover:text-red-700 mt-4"
                            >
                                Usuń
                            </button>
                        </div>
                    )}
                </div>
            ))}

            {/* Modal usuwania */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Czy na pewno chcesz usunąć ten plan?</h3>
                        <div className="flex justify-end">
                            <button
                                onClick={deletePlan}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                            >
                                Tak, usuń
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                            >
                                Anuluj
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedSupplementPlans;
