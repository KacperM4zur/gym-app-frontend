import React, { useState, useEffect } from 'react';
import PersonalDetails from "../../components/user_login/profile_page/PersonalDetails.jsx";
import TrainingPlan from "../../components/user_login/profile_page/TrainingPlan.jsx";
import SupplementPlan from "../../components/user_login/profile_page/SupplementPlan.jsx";

const Profile = () => {
    const [activeTab, setActiveTab] = useState('personal');

    const [activeTrainingPlan, setActiveTrainingPlan] = useState(null);
    const [activeSupplementPlan, setActiveSupplementPlan] = useState(null);

    useEffect(() => {
        fetchActivePlans();
    }, []);

    const fetchActivePlans = async () => {
        try {
            const trainingResponse = await fetch('http://gym-app.test/api/user-workout-plans', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const trainingData = await trainingResponse.json();
            setActiveTrainingPlan(trainingData.data.find(plan => plan.is_active));

            const supplementResponse = await fetch('http://gym-app.test/api/user-supplement-plans', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const supplementData = await supplementResponse.json();
            setActiveSupplementPlan(supplementData.data.find(plan => plan.is_active));
        } catch (error) {
            console.error('Error fetching active plans:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-center text-gray-800">
                Profil Użytkownika
            </h1>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4 mb-6 sm:mb-8">
                {['personal', 'training', 'supplement'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`w-full sm:w-auto px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${
                            activeTab === tab
                                ? 'bg-blue-500 text-white shadow-md transform scale-105'
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
                        } mx-1 sm:mx-2`}
                    >
                        {tab === 'personal' && 'Dane Osobowe'}
                        {tab === 'training' && 'Plan Treningowy'}
                        {tab === 'supplement' && 'Plan Suplementacyjny'}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg transition-all duration-500 transform">
                {activeTab === 'personal' && (
                    <div className="animate__animated animate__fadeIn animate__faster">
                        <PersonalDetails />
                    </div>
                )}
                {activeTab === 'training' && (
                    <div className="animate__animated animate__fadeIn animate__faster">
                        <TrainingPlan activePlan={activeTrainingPlan} />
                    </div>
                )}
                {activeTab === 'supplement' && (
                    <div className="animate__animated animate__fadeIn animate__faster">
                        <SupplementPlan activePlan={activeSupplementPlan} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
