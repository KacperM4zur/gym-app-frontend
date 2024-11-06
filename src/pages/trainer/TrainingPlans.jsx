import React, { useState, useEffect } from 'react';
import ClientSelector from "../../components/trainer/training_plans_trainer/ClientSelector.jsx";
import PlanForm from "../../components/trainer/training_plans_trainer/PlanForm.jsx";
import SavedPlans from "../../components/trainer/training_plans_trainer/SavedPlans.jsx";

const TrainingPlans = () => {
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [days, setDays] = useState([]);
    const [refreshPlans, setRefreshPlans] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            const response = await fetch('http://gym-app.test/api/clients', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setClients(data);
        };

        const fetchExercises = async () => {
            const response = await fetch('http://gym-app.test/api/exercises', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setExercises(data);
        };

        const fetchDays = async () => {
            const response = await fetch('http://gym-app.test/api/days', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setDays(data.data);
        };

        fetchClients();
        fetchExercises();
        fetchDays();
    }, []);

    const handleSavePlan = async (planData) => {
        const response = await fetch(`http://gym-app.test/api/clients/${selectedClientId}/workout-plans`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ workoutPlan: planData }),
        });

        if (response.ok) {
            setRefreshPlans((prev) => !prev); // Toggle refresh to force re-render
        }
    };

    return (
        <div>
            <ClientSelector clients={clients} onSelectClient={setSelectedClientId} selectedClientId={selectedClientId} />
            {selectedClientId && (
                <>
                    <PlanForm onSavePlan={handleSavePlan} exercises={exercises} days={days} />
                    <SavedPlans clientId={selectedClientId} refresh={refreshPlans} />
                </>
            )}
        </div>
    );
};

export default TrainingPlans;
