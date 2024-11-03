// import React, { useState } from 'react';
// import PersonalDetails from "../../components/user_login/profile_page/PersonalDetails.jsx";
// import TrainingPlan from "../../components/user_login/profile_page/TrainingPlan.jsx";
// import SupplementPlan from "../../components/user_login/profile_page/SupplementPlan.jsx";
// import BodyMeasurementsForm from "../../components/user_login/profile_page/BodyMeasurementsForm.jsx";
// import BodyMeasurementsHistory from "../../components/user_login/profile_page/BodyMeasurementsHistory.jsx";
// import MaxLiftForm from "../../components/user_login/profile_page/MaxLiftForm.jsx";
// import MaxLiftHistory from "../../components/user_login/profile_page/MaxLiftHistory.jsx";
//
// const Profile = () => {
//     const [activeTab, setActiveTab] = useState('personal');
//     const [measurements, setMeasurements] = useState([]);
//     const [maxLifts, setMaxLifts] = useState([]);
//     const [editingMeasurement, setEditingMeasurement] = useState(null);
//     const [editingMaxLift, setEditingMaxLift] = useState(null);
//
//     const handleAddMeasurement = (newMeasurement) => {
//         if (editingMeasurement) {
//             setMeasurements(
//                 measurements.map((measurement) =>
//                     measurement === editingMeasurement ? { ...editingMeasurement, ...newMeasurement } : measurement
//                 )
//             );
//             setEditingMeasurement(null);
//         } else {
//             setMeasurements([...measurements, newMeasurement]);
//         }
//     };
//
//     const handleAddMaxLift = (newLift) => {
//         if (editingMaxLift) {
//             setMaxLifts(
//                 maxLifts.map((lift) =>
//                     lift === editingMaxLift ? { ...editingMaxLift, ...newLift } : lift
//                 )
//             );
//             setEditingMaxLift(null);
//         } else {
//             setMaxLifts([...maxLifts, newLift]);
//         }
//     };
//
//     const handleEditMeasurement = (measurementToEdit) => {
//         setEditingMeasurement(measurementToEdit);
//     };
//
//     const handleEditMaxLift = (liftToEdit) => {
//         setEditingMaxLift(liftToEdit);
//     };
//
//     const handleDeleteMeasurement = (measurementToDelete) => {
//         setMeasurements(measurements.filter((measurement) => measurement !== measurementToDelete));
//     };
//
//     const handleDeleteMaxLift = (liftToDelete) => {
//         setMaxLifts(maxLifts.filter((lift) => lift !== liftToDelete));
//     };
//
//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-4xl font-bold mb-6 text-center">Profil Użytkownika</h1>
//
//             <div className="flex justify-center space-x-4 mb-8">
//                 <button onClick={() => setActiveTab('personal')} className={`px-4 py-2 rounded-lg ${activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Dane Osobowe</button>
//                 <button onClick={() => setActiveTab('training')} className={`px-4 py-2 rounded-lg ${activeTab === 'training' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Plan Treningowy</button>
//                 <button onClick={() => setActiveTab('supplement')} className={`px-4 py-2 rounded-lg ${activeTab === 'supplement' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Plan Suplementacyjny</button>
//                 <button onClick={() => setActiveTab('measurements')} className={`px-4 py-2 rounded-lg ${activeTab === 'measurements' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Pomiary Ciała</button>
//                 <button onClick={() => setActiveTab('maxLift')} className={`px-4 py-2 rounded-lg ${activeTab === 'maxLift' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Maksymalne Obciążenie</button>
//             </div>
//
//             {activeTab === 'personal' && <PersonalDetails />}
//             {activeTab === 'training' && <TrainingPlan />}
//             {activeTab === 'supplement' && <SupplementPlan />}
//             {activeTab === 'measurements' && (
//                 <>
//                     <BodyMeasurementsForm onAddMeasurement={handleAddMeasurement} measurementToEdit={editingMeasurement} />
//                     <BodyMeasurementsHistory
//                         measurements={measurements}
//                         onEdit={handleEditMeasurement}
//                         onDelete={handleDeleteMeasurement}
//                     />
//                 </>
//             )}
//             {activeTab === 'maxLift' && (
//                 <>
//                     <MaxLiftForm onAddMaxLift={handleAddMaxLift} liftToEdit={editingMaxLift} />
//                     <MaxLiftHistory
//                         maxLifts={maxLifts}
//                         onEdit={handleEditMaxLift}
//                         onDelete={handleDeleteMaxLift}
//                     />
//                 </>
//             )}
//         </div>
//     );
// };
//
// export default Profile;

import React, { useState, useEffect } from 'react';
import PersonalDetails from "../../components/user_login/profile_page/PersonalDetails.jsx";
import TrainingPlan from "../../components/user_login/profile_page/TrainingPlan.jsx";
import SupplementPlan from "../../components/user_login/profile_page/SupplementPlan.jsx";

const Profile = () => {
    const [activeTab, setActiveTab] = useState('personal');

    // State for active plans
    const [activeTrainingPlan, setActiveTrainingPlan] = useState(null);
    const [activeSupplementPlan, setActiveSupplementPlan] = useState(null);

    useEffect(() => {
        fetchActivePlans();
    }, []);

    // Fetch active plans from the backend
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
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Profil Użytkownika</h1>

            <div className="flex justify-center space-x-4 mb-8">
                <button onClick={() => setActiveTab('personal')} className={`px-4 py-2 rounded-lg ${activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Dane Osobowe</button>
                <button onClick={() => setActiveTab('training')} className={`px-4 py-2 rounded-lg ${activeTab === 'training' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Plan Treningowy</button>
                <button onClick={() => setActiveTab('supplement')} className={`px-4 py-2 rounded-lg ${activeTab === 'supplement' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Plan Suplementacyjny</button>
            </div>

            {activeTab === 'personal' && <PersonalDetails />}
            {activeTab === 'training' && <TrainingPlan activePlan={activeTrainingPlan} />}
            {activeTab === 'supplement' && <SupplementPlan activePlan={activeSupplementPlan} />}
        </div>
    );
};

export default Profile;
