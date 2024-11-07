import React from 'react';
import ExercisePlanCard from "../../components/user_login/dashboard_page/ExercisePlanCard.jsx";
import SupplementPlanCard from "../../components/user_login/dashboard_page/SupplementPlanCard.jsx";
import ToDoList from "../../components/trainer/trainer_dashboard/ToDoList.jsx";
import TrainerCalendar from "../../components/trainer/trainer_dashboard/TrainerCalendar.jsx";
import HydrationReminder from "../../components/user_login/dashboard_page/HydrationReminder.jsx";

const Dashboard = () => {
    const currentDayNumber = new Date().getDay() || 7;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-5xl font-bold mb-6 text-left">Panel główny</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <ExercisePlanCard day={currentDayNumber} />
                <SupplementPlanCard day={currentDayNumber} />
            </div>
            <HydrationReminder/>
            <ToDoList />
            <TrainerCalendar />
            <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Motywacyjny cytat dnia</h2>
                <p className="text-xl text-gray-700 italic">"Nie ma skrótu do miejsca, do którego warto dotrzeć."</p>
            </div>
        </div>
    );
};

export default Dashboard;
