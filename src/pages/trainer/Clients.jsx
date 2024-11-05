import React, { useState, useEffect } from 'react';
import ClientList from "../../components/trainer/clients/ClientList.jsx";
import ClientProfile from "../../components/trainer/clients/ClientProfile.jsx";
import Chat from "../../components/trainer/clients/Chat.jsx";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);
    const [activeSupplementPlan, setActiveSupplementPlan] = useState(null);
    const [activeTrainingPlan, setActiveTrainingPlan] = useState(null);
    const [senderId, setSenderId] = useState(15); // Example trainer ID as sender
    const [receiverId, setReceiverId] = useState(null); // Selected client's ID

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/clients', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setClients(data); // Adjust to your API's data format
            } else {
                console.error("Failed to fetch clients list.");
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const handleSelectClient = async (clientId) => {
        setReceiverId(clientId);
        try {
            const [profileRes, supplementRes, trainingRes] = await Promise.all([
                fetch(`http://gym-app.test/api/clients/${clientId}/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }),
                fetch(`http://gym-app.test/api/clients/${clientId}/active-supplement-plan`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }),
                fetch(`http://gym-app.test/api/clients/${clientId}/active-workout-plan`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }),
            ]);

            const profileData = await profileRes.json();
            const supplementData = await supplementRes.json();
            const trainingData = await trainingRes.json();

            setSelectedClient(profileData.data || null);
            setActiveSupplementPlan(supplementData.data || null);
            setActiveTrainingPlan(trainingData.data || null);
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row md:space-x-4 p-4">
            {/* Lista klientów */}
            <div className="md:w-1/4 w-full mb-4 md:mb-0">
                <ClientList clients={clients} onSelectClient={handleSelectClient} selectedClient={receiverId} />
            </div>

            {/* Profil klienta i czat */}
            <div className="flex flex-col md:w-3/4 w-full space-y-4">
                <div className="w-full">
                    {selectedClient ? (
                        <ClientProfile client={selectedClient} supplementPlan={activeSupplementPlan} trainingPlan={activeTrainingPlan} />
                    ) : (
                        <p>Wybierz klienta, aby zobaczyć szczegóły</p>
                    )}
                </div>

                {/* Czat wyświetlany obok lub poniżej w zależności od szerokości ekranu */}
                <div className="w-full">
                    {receiverId ? (
                        <Chat senderId={senderId} receiverId={receiverId} />
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Clients;
