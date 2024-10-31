import React, { useState, useEffect } from 'react';
import WeightForm from "../../components/user_login/progress_page/WeightForm.jsx";
import ExerciseForm from "../../components/user_login/progress_page/ExerciseForm.jsx";
import ProgressChart from "../../components/user_login/progress_page/ProgressChart.jsx";
import MaxLiftChart from "../../components/user_login/progress_page/MaxLiftChart.jsx";
import BodyPartChart from "../../components/user_login/progress_page/BodyPartChart.jsx";
import MeasurementForm from "../../components/user_login/progress_page/MeasurementForm.jsx";

const Progress = () => {
    const [weightData, setWeightData] = useState([]);
    const [maxLiftData, setMaxLiftData] = useState([]);
    const [measurementData, setMeasurementData] = useState([]);

    const [showWeightForm, setShowWeightForm] = useState(false);
    const [showExerciseForm, setShowExerciseForm] = useState(false);
    const [showMeasurementForm, setShowMeasurementForm] = useState(false);

    // Fetch weight data from API
    const fetchWeightData = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/user-weights', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setWeightData(data);
        } catch (error) {
            console.error("Error fetching weight data:", error);
        }
    };

    // Fetch max lift data from API
    const fetchMaxLiftData = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/user-max-lifts', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setMaxLiftData(data);
        } catch (error) {
            console.error("Error fetching max lift data:", error);
        }
    };

    const fetchMeasurementData = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/user-measurements', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setMeasurementData(data);
        } catch (error) {
            console.error("Error fetching measurement data:", error);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchWeightData();
        fetchMaxLiftData();
        fetchMeasurementData();
    }, []);

    // Handle form submissions and refresh data
    const handleWeightFormSubmit = async () => {
        await fetchWeightData();
    };

    const handleExerciseFormSubmit = async () => {
        await fetchMaxLiftData();
    };

    const handleMeasurementFormSubmit = async () => {
        await fetchMeasurementData();
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Monitorowanie Postępów</h1>

            {/* Weight Section */}
            <div className="p-4 bg-white rounded-lg shadow-md mb-6">
                <button
                    onClick={() => setShowWeightForm(!showWeightForm)}
                    className="w-full text-lg font-semibold bg-blue-500 text-white p-2 rounded-lg mb-4"
                >
                    {showWeightForm ? 'Ukryj Formularz Wagi' : 'Dodaj Wagę'}
                </button>
                {showWeightForm && <WeightForm onSubmit={handleWeightFormSubmit} />}
                <ProgressChart data={weightData} label="Waga (kg)" />
            </div>

            {/* Max Lift Section */}
            <div className="p-4 bg-white rounded-lg shadow-md mb-6">
                <button
                    onClick={() => setShowExerciseForm(!showExerciseForm)}
                    className="w-full text-lg font-semibold bg-green-500 text-white p-2 rounded-lg mb-4"
                >
                    {showExerciseForm ? 'Ukryj Formularz Maksymalnych Obciążeń' : 'Dodaj Maksymalne Obciążenie'}
                </button>
                {showExerciseForm && <ExerciseForm onSubmit={handleExerciseFormSubmit} />}
                <MaxLiftChart data={maxLiftData} />
            </div>

            {/* Body Measurement Section */}
            <div className="p-4 bg-white rounded-lg shadow-md">
                <button
                    onClick={() => setShowMeasurementForm(!showMeasurementForm)}
                    className="w-full text-lg font-semibold bg-purple-500 text-white p-2 rounded-lg mb-4"
                >
                    {showMeasurementForm ? 'Ukryj Formularz Pomiarów' : 'Dodaj Pomiary Ciała'}
                </button>
                {showMeasurementForm && <MeasurementForm onSubmit={handleMeasurementFormSubmit} />}
                <BodyPartChart data={measurementData} />
            </div>
        </div>
    );
};

export default Progress;

