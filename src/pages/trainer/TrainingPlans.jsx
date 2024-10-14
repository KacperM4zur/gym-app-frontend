import React, { useState } from 'react';
import ClientSelector from "../../components/trainer/training_plans_trainer/ClientSelector.jsx";
import PlanForm from "../../components/trainer/training_plans_trainer/PlanForm.jsx";
import PlanSummary from "../../components/trainer/training_plans_trainer/PlanSummary.jsx";
import SavedPlans from "../../components/trainer/training_plans_trainer/SavedPlans.jsx";

const TrainingPlans = () => {
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [plan, setPlan] = useState({});
    const [planName, setPlanName] = useState('');
    const [planNameSet, setPlanNameSet] = useState(false);
    const [plans, setPlans] = useState([
        { id: 1, name: 'Plan A', days: { 'Poniedziałek': [{ name: 'Przysiady', sets: '3', reps: '10', rest: '60s' }] }, clientId: 1 },
        { id: 2, name: 'Plan B', days: { 'Wtorek': [{ name: 'Wyciskanie sztangi', sets: '4', reps: '8', rest: '90s' }] }, clientId: 2 }
    ]);

    const clients = [
        { id: 1, name: 'Jan Kowalski', email: 'jan.kowalski@gmail.com' },
        { id: 2, name: 'Anna Nowak', email: 'anna.nowak@gmail.com' }
    ];

    const handleClientSelect = (clientId) => {
        setSelectedClientId(clientId);
        setPlan({});
        setPlanName('');
        setPlanNameSet(false);
    };

    const handleSaveExercise = (day, exercise) => {
        setPlan((prevPlan) => ({
            ...prevPlan,
            [day]: [...(prevPlan[day] || []), exercise]
        }));
    };

    const handleSavePlan = () => {
        setPlans([...plans, { id: plans.length + 1, name: planName, days: plan, clientId: selectedClientId }]);
        setPlan({});
        setPlanName('');
        setPlanNameSet(false);
    };

    const handleSetPlanName = (name) => {
        setPlanName(name);
        setPlanNameSet(true);
    };

    // Nowa funkcja do usuwania planów
    const handleDeletePlan = (planId) => {
        const updatedPlans = plans.filter(plan => plan.id !== planId);
        setPlans(updatedPlans);  // Aktualizacja stanu planów
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Plany Treningowe</h1>

            <ClientSelector clients={clients} selectedClientId={selectedClientId} onSelect={handleClientSelect} />

            {selectedClientId && (
                <>
                    {/* Przekazujemy handleDeletePlan do komponentu SavedPlans */}
                    <SavedPlans plans={plans} selectedClientId={selectedClientId} onDelete={handleDeletePlan} />
                    <PlanForm onSave={handleSaveExercise} onSetPlanName={handleSetPlanName} planNameSet={planNameSet} />
                    <PlanSummary plan={plan} planName={planName} onSave={handleSavePlan} planNameSet={planNameSet} />

                </>
            )}
        </div>
    );
};

export default TrainingPlans;
