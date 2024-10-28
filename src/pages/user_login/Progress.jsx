import React, { useState } from 'react';
import ExerciseForm from "../../components/user_login/progress_page/ExerciseForm.jsx";
import MeasurementForm from "../../components/user_login/progress_page/MeasurementForm.jsx";
import WeightForm from "../../components/user_login/progress_page/WeightForm.jsx";
import ProgressChart from "../../components/user_login/progress_page/ProgressChart.jsx";

const Progress = () => {
    const [exerciseData, setExerciseData] = useState([]);
    const [measurementData, setMeasurementData] = useState([]);
    const [weightData, setWeightData] = useState([]);

    const addExercise = (data) => {
        setExerciseData([...exerciseData, { value: data.weight, date: data.date, exercise: data.exercise }]);
    };

    const addMeasurement = (data) => {
        setMeasurementData([...measurementData, { value: data.value, date: data.date, part: data.part }]);
    };

    const addWeight = (data) => {
        setWeightData([...weightData, { value: data.weight, date: data.date }]);
    };

    const exerciseOptions = ['Przysiad', 'Martwy ciąg', 'Wyciskanie na ławce', 'Podciąganie'];
    const bodyParts = ['Klatka piersiowa', 'Plecy', 'Nogi', 'Ramiona'];

    return (
        <div className="container mx-auto p-4 sm:p-6 bg-gray-50 rounded-lg">
            <h1 className="text-4xl font-bold mb-6 text-center">Monitorowanie Postępów</h1>
            <div className="grid grid-cols-1 gap-6">
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <ExerciseForm onAddExercise={addExercise} />
                    <ProgressChart
                        data={exerciseData}
                        label="Maksymalne Obciążenia"
                        filterOptions={exerciseOptions}
                        filterBy="exercise"
                    />
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <WeightForm onAddWeight={addWeight} />
                    <ProgressChart
                        data={weightData}
                        label="Waga"
                        filterOptions={['Waga']}
                        filterBy="weight"
                    />
                </div>
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <MeasurementForm onAddMeasurement={addMeasurement} />
                    <ProgressChart
                        data={measurementData}
                        label="Pomiary ciała"
                        filterOptions={bodyParts}
                        filterBy="part"
                    />
                </div>
            </div>
        </div>
    );
};

export default Progress;
