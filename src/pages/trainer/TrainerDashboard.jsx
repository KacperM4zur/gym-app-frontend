import React from 'react';
import InfoCard from "../../components/trainer/trainer_dashboard/InfoCard.jsx";
import RecentProgress from "../../components/trainer/trainer_dashboard/RecentProgress.jsx";
import ActionShortcut from "../../components/trainer/trainer_dashboard/ActionShortcut.jsx";
import TrainerCalendar from "../../components/trainer/trainer_dashboard/TrainerCalendar.jsx";
import { useNavigate } from 'react-router-dom';

const TrainerDashboard = () => {
    const navigate = useNavigate();

    const progressData = [
        { client: 'Jan Kowalski', weight: 80, height: 178, date: '2024-02-01' },
        { client: 'Anna Nowak', weight: 65, height: 165, date: '2024-01-28' },
    ];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Dashboard Trenera</h1>

            {/* Karty z ogólnymi informacjami */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InfoCard title="Klienci" value="12" description="Aktywnych klientów" />
                <InfoCard title="Postępy" value="27" description="Ostatnie wpisy" />
                <InfoCard title="Nowe Plany" value="5" description="Nowo stworzone plany" />
                <InfoCard title="Treningi" value="18" description="Zrealizowane treningi" />
            </div>

            {/* Ostatnie postępy klientów */}
            <RecentProgress progressData={progressData} />

            {/* Skróty do funkcji */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ActionShortcut title="Nowy Plan Treningowy" color="bg-green-500" onClick={() => navigate('/trainer-workout-plans')} />
                <ActionShortcut title="Nowa Suplementacja" color="bg-blue-500" onClick={() => navigate('/trainer-supplement-plans')} />
                <ActionShortcut title="Monitorowanie Postępów" color="bg-yellow-500" onClick={() => navigate('/trainer-progress')} />
            </div>

            {/* Kalendarz */}
            <TrainerCalendar />
        </div>
    );
};

export default TrainerDashboard;
