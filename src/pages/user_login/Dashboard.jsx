import React, { useState, useEffect } from 'react';
import InfoCard from "../../components/user_login/dashboard_page/InfoCard.jsx";
import TrainingPlanCard from "../../components/user_login/dashboard_page/TrainingPlanCard.jsx";
import SupplementPlanCard from "../../components/user_login/dashboard_page/SupplementPlanCard.jsx";
import WeightProgressChart from "../../components/user_login/dashboard_page/WeightProgressChart.jsx";
import StrengthProgressChart from "../../components/user_login/dashboard_page/StrengthProgressChart.jsx";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

const Dashboard = () => {
    const [currentDay, setCurrentDay] = useState('');
    const [trainingToday, setTrainingToday] = useState([]);
    const [supplementsToday, setSupplementsToday] = useState([]);
    const [isWeightDetailsVisible, setIsWeightDetailsVisible] = useState(false);
    const [isStrengthDetailsVisible, setIsStrengthDetailsVisible] = useState(false);
    const weightHistory = [75, 74, 73, 72, 71];
    const strengthProgress = {
        squat: [100, 110, 120, 130],
        deadlift: [120, 130, 140, 150],
        benchPress: [80, 85, 90, 95],
    };

    const trainingPlan = {
        'Poniedziałek': ['Przysiady', 'Wyciskanie na ławce', 'Podciąganie'],
        'Wtorek': ['Martwy ciąg', 'Wiosłowanie hantlami'],
        'Środa': ['Bieg', 'Plank'],
        'Czwartek': ['Przysiady', 'Martwy ciąg', 'Podciąganie'],
        'Piątek': ['Bieg', 'Wyciskanie na ławce'],
    };

    const supplementPlan = {
        'Poniedziałek': ['Białko 30g', 'Kreatyna 5g'],
        'Wtorek': ['Omega 3 1000mg', 'BCAA 10g'],
        'Środa': ['Witamina D 2000 IU'],
    };

    useEffect(() => {
        const today = new Date();
        const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
        setCurrentDay(days[today.getDay()]);
        setTrainingToday(trainingPlan[days[today.getDay()]] || []);
        setSupplementsToday(supplementPlan[days[today.getDay()]] || []);
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-5xl font-bold mb-6 text-center">Panel główny</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <InfoCard title="Treningi na dziś" value={trainingToday.length} description="Zaplanuj swój dzień" />
                <InfoCard title="Suplementacja na dziś" value={supplementsToday.length} description="Pamiętaj o suplementach" />
                <InfoCard title="Waga" value={`${weightHistory[weightHistory.length - 1]} kg`} description="Ostatni pomiar wagi" />
                <InfoCard title="Postęp siłowy" value="3 ćwiczenia" description="Wzrost siły" />
            </div>

            {/* Trening i Suplementacja na dziś */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <TrainingPlanCard currentDay={currentDay} trainingToday={trainingToday} />
                <SupplementPlanCard currentDay={currentDay} supplementsToday={supplementsToday} />
            </div>

            {/* Wykres postępu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <WeightProgressChart
                    isWeightDetailsVisible={isWeightDetailsVisible}
                    weightData={{
                        labels: ['Tydzień 1', 'Tydzień 2', 'Tydzień 3', 'Tydzień 4', 'Tydzień 5'],
                        datasets: [
                            {
                                label: 'Waga (kg)',
                                data: weightHistory,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                tension: 0.4,
                            },
                        ],
                    }}
                    toggleDetails={() => setIsWeightDetailsVisible(!isWeightDetailsVisible)}
                />
                <StrengthProgressChart
                    isStrengthDetailsVisible={isStrengthDetailsVisible}
                    strengthData={{
                        labels: ['Tydzień 1', 'Tydzień 2', 'Tydzień 3', 'Tydzień 4'],
                        datasets: [
                            {
                                label: 'Przysiad (kg)',
                                data: strengthProgress.squat,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                tension: 0.4,
                            },
                            {
                                label: 'Martwy ciąg (kg)',
                                data: strengthProgress.deadlift,
                                borderColor: 'rgba(54, 162, 235, 1)',
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                tension: 0.4,
                            },
                            {
                                label: 'Wyciskanie na ławce (kg)',
                                data: strengthProgress.benchPress,
                                borderColor: 'rgba(255, 206, 86, 1)',
                                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                                tension: 0.4,
                            },
                        ],
                    }}
                    toggleDetails={() => setIsStrengthDetailsVisible(!isStrengthDetailsVisible)}
                />
            </div>

            {/* Motywacyjny cytat */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Motywacyjny cytat dnia</h2>
                <p className="text-xl text-gray-700 italic">"Nie ma skrótu do miejsca, do którego warto dotrzeć."</p>
            </div>
        </div>
    );
};

export default Dashboard;
