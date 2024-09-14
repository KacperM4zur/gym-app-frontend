// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

const Dashboard = () => {
    const [currentDay, setCurrentDay] = useState('');
    const [trainingToday, setTrainingToday] = useState([]);
    const [supplementsToday, setSupplementsToday] = useState([]);
    const [weightHistory, setWeightHistory] = useState([75, 74, 73, 72, 71]);  // Historia wagi (kg)
    const [strengthProgress, setStrengthProgress] = useState({
        squat: [100, 110, 120, 130],
        deadlift: [120, 130, 140, 150],
        benchPress: [80, 85, 90, 95],
    });
    const [isWeightDetailsVisible, setIsWeightDetailsVisible] = useState(false);
    const [isStrengthDetailsVisible, setIsStrengthDetailsVisible] = useState(false);

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
        const currentDay = days[today.getDay()];
        setCurrentDay(currentDay);

        setTrainingToday(trainingPlan[currentDay] || []);
        setSupplementsToday(supplementPlan[currentDay] || []);
    }, []);

    // Dane do wykresu wagi
    const weightData = {
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
    };

    // Dane do wykresu siłowego
    const strengthData = {
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
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-5xl font-bold mb-6 text-center">Panel główny</h1>

            {/* Kafelek treningu na dzisiaj */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-4">Trening na dziś ({currentDay})</h2>
                {trainingToday.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {trainingToday.map((exercise, index) => (
                            <li key={index} className="mb-2">{exercise}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Brak zaplanowanych treningów na dzisiaj.</p>
                )}
            </div>

            {/* Kafelek suplementów na dzisiaj */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold mb-4">Suplementy na dziś</h2>
                {supplementsToday.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {supplementsToday.map((supplement, index) => (
                            <li key={index} className="mb-2">{supplement}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Brak suplementów na dzisiaj.</p>
                )}
            </div>

            {/* Wykres wagi z możliwością rozwijania */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Postęp wagi</h2>
                    <button onClick={() => setIsWeightDetailsVisible(!isWeightDetailsVisible)}>
                        {isWeightDetailsVisible ? (
                            <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                        ) : (
                            <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                        )}
                    </button>
                </div>
                {isWeightDetailsVisible && <Line data={weightData} />}
            </div>

            {/* Wykres siłowy z możliwością rozwijania */}
            <div className="mb-8 bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Postęp siłowy</h2>
                    <button onClick={() => setIsStrengthDetailsVisible(!isStrengthDetailsVisible)}>
                        {isStrengthDetailsVisible ? (
                            <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                        ) : (
                            <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                        )}
                    </button>
                </div>
                {isStrengthDetailsVisible && <Line data={strengthData} />}
            </div>

            {/* Motywacyjny cytat */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Motywacyjny cytat dnia</h2>
                <p className="text-xl text-gray-700 italic">
                    "Nie ma skrótu do miejsca, do którego warto dotrzeć."
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
