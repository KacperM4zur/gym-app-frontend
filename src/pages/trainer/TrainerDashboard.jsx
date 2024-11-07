import React, { useEffect, useState } from 'react';
import TrainerCalendar from "../../components/trainer/trainer_dashboard/TrainerCalendar.jsx";
import ActionShortcut from "../../components/trainer/trainer_dashboard/ActionShortcut.jsx";
import { useNavigate } from "react-router-dom";
import ToDoList from "../../components/trainer/trainer_dashboard/ToDoList.jsx";
import InfoCard from "../../components/trainer/trainer_dashboard/InfoCard.jsx";

const TrainerDashboard = () => {
    const navigate = useNavigate();
    const [clientsCount, setClientsCount] = useState(0);
    const [workoutPlansCount, setWorkoutPlansCount] = useState(0);
    const [supplementPlansCount, setSupplementPlansCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                // Pobieranie liczby klientów
                const clientsResponse = await fetch('http://gym-app.test/api/clients/count', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const clientsData = await clientsResponse.json();
                setClientsCount(clientsData.count);

                // Pobieranie liczby planów treningowych
                const workoutPlansResponse = await fetch('http://gym-app.test/api/clients/workout-plans/count', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const workoutPlansData = await workoutPlansResponse.json();
                setWorkoutPlansCount(workoutPlansData.count);

                // Pobieranie liczby planów suplementacyjnych
                const supplementPlansResponse = await fetch('http://gym-app.test/api/clients/supplement-plans/count', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const supplementPlansData = await supplementPlansResponse.json();
                setSupplementPlansCount(supplementPlansData.count);
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-left">Panel Trenera</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                <InfoCard title="Klienci" value={clientsCount} description="Aktywnych klientów" />
                <InfoCard title="Plany Treningowe" value={workoutPlansCount} description="Stworzone plany treningowe" />
                <InfoCard title="Plany Suplementacyjne" value={supplementPlansCount} description="Stworzone plany suplementacyjne" />
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ActionShortcut title="Nowy Plan Treningowy" color="bg-green-500" onClick={() => navigate('/trainer-workout-plans')} />
                <ActionShortcut title="Nowa Suplementacja" color="bg-blue-500" onClick={() => navigate('/trainer-supplement-plans')} />
                <ActionShortcut title="Monitorowanie Postępów" color="bg-yellow-500" onClick={() => navigate('/trainer-progress')} />
            </div>
            <ToDoList />
            <TrainerCalendar />
        </div>
    );
};

export default TrainerDashboard;
