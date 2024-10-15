import React, { useState } from 'react';
import ClientList from "../../components/trainer/clients/ClientList.jsx";
import ClientProfile from "../../components/trainer/clients/ClientProfile.jsx";
import Chat from "../../components/trainer/clients/Chat.jsx";

const Clients = () => {
    const [selectedClientId, setSelectedClientId] = useState(null);

    const clients = [
        { id: 1, name: 'Jan Kowalski', email: 'jan.kowalski@gmail.com', phone: '123-456-789', age: 30 },
        { id: 2, name: 'Anna Nowak', email: 'anna.nowak@gmail.com', phone: '987-654-321', age: 25 },
    ];

    // Przykładowe plany suplementacyjne i treningowe
    const supplementPlans = {
        1: {
            'Poniedziałek': [
                { name: 'Białko', amount: '30g', time: 'po treningu' },
                { name: 'Kreatyna', amount: '5g', time: 'po treningu' },
            ],
            'Wtorek': [
                { name: 'Witamina D', amount: '2000 IU', time: 'rano' },
            ],
        },
        2: {
            'Środa': [
                { name: 'Omega 3', amount: '1 kapsułka', time: 'rano' },
            ],
        },
    };

    const trainingPlans = {
        1: {
            'Poniedziałek': [
                { name: 'Przysiady', sets: 4, reps: 10 },
                { name: 'Wyciskanie sztangi', sets: 3, reps: 8 },
            ],
            'Środa': [
                { name: 'Martwy ciąg', sets: 4, reps: 6 },
            ],
        },
        2: {
            'Wtorek': [
                { name: 'Pompki', sets: 3, reps: 15 },
            ],
        },
    };

    const selectedClient = clients.find(client => client.id === selectedClientId);
    const selectedSupplementPlan = supplementPlans[selectedClientId];
    const selectedTrainingPlan = trainingPlans[selectedClientId];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Klienci</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <ClientList clients={clients} onSelectClient={setSelectedClientId} />
                </div>
                <div className="lg:col-span-2">
                    {selectedClient ? (
                        <>
                            <ClientProfile
                                client={selectedClient}
                                supplementPlan={selectedSupplementPlan}
                                trainingPlan={selectedTrainingPlan}
                            />
                            <Chat client={selectedClient} />
                        </>
                    ) : (
                        <p className="text-xl text-gray-500">Wybierz klienta, aby zobaczyć szczegóły i rozpocząć czat.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Clients;
