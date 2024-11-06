import React, { useState, useEffect } from 'react';
import ClientSelector from "../../components/trainer/supplement_plans_trainer/ClientSelector.jsx";
import PlanForm from "../../components/trainer/supplement_plans_trainer/PlanForm.jsx";
import SavedPlans from "../../components/trainer/supplement_plans_trainer/SavedPlans.jsx";

const SupplementPlans = () => {
    const [clients, setClients] = useState([]);
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [supplements, setSupplements] = useState([]);
    const [days, setDays] = useState([]);
    const [refreshPlans, setRefreshPlans] = useState(false); // Flaga do odświeżania planów

    useEffect(() => {
        const fetchClients = async () => {
            const response = await fetch('http://gym-app.test/api/clients', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setClients(data);
        };

        const fetchSupplements = async () => {
            const response = await fetch('http://gym-app.test/api/supplements', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setSupplements(data);
        };

        const fetchDays = async () => {
            const response = await fetch('http://gym-app.test/api/days', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setDays(data.data);
        };

        fetchClients();
        fetchSupplements();
        fetchDays();
    }, []);

    const handleSavePlan = async (planData) => {
        const response = await fetch(`http://gym-app.test/api/clients/${selectedClientId}/supplement-plan`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ supplementPlan: planData }),
        });

        if (response.ok) {
            console.log("Plan stworzony pomyślnie");
            setRefreshPlans(true); // Ustawienie flagi do odświeżenia planów
        } else {
            console.error("Błąd przy tworzeniu planu");
        }
    };

    return (
        <div className="p-6">
            <ClientSelector clients={clients} onSelectClient={setSelectedClientId} selectedClientId={selectedClientId} />
            {selectedClientId && (
                <>
                    <PlanForm onSavePlan={handleSavePlan} supplements={supplements} days={days} />
                    <SavedPlans clientId={selectedClientId} refresh={refreshPlans} onRefreshComplete={() => setRefreshPlans(false)} />
                </>
            )}
        </div>
    );
};

export default SupplementPlans;
