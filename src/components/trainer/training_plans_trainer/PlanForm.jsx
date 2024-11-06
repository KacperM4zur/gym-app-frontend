import React, { useState } from 'react';

const PlanForm = ({ onSavePlan, exercises, days }) => {
    const [planName, setPlanName] = useState('');
    const [dayPlans, setDayPlans] = useState([]);

    const handleAddDay = () => {
        setDayPlans([...dayPlans, { day: '', exercises: [] }]);
    };

    const handleDayChange = (index, value) => {
        const newDayPlans = [...dayPlans];
        newDayPlans[index].day = value;
        setDayPlans(newDayPlans);
    };

    const handleAddExercise = (dayIndex) => {
        const newDayPlans = [...dayPlans];
        newDayPlans[dayIndex].exercises.push({ exercise_id: '', sets: '', reps: '', weight: '', break: '' });
        setDayPlans(newDayPlans);
    };

    const handleExerciseChange = (dayIndex, exerciseIndex, field, value) => {
        const newDayPlans = [...dayPlans];
        newDayPlans[dayIndex].exercises[exerciseIndex][field] = value;
        setDayPlans(newDayPlans);
    };

    const handleSave = () => {
        const planData = {
            workoutPlanName: planName,
            plan: dayPlans.map(dayPlan => ({
                day_of_week: dayPlan.day,
                exercises: dayPlan.exercises
            }))
        };
        onSavePlan(planData);
        setPlanName('');
        setDayPlans([]);
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Tworzenie planu treningowego</h3>
            <input
                type="text"
                placeholder="Nazwa planu"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <button
                onClick={handleAddDay}
                className="px-4 py-2 bg-green-500 text-white rounded-md mb-4"
            >
                Dodaj dzień
            </button>
            {dayPlans.map((dayPlan, dayIndex) => (
                <div key={dayIndex} className="mb-4 p-2 border border-gray-300 rounded-md">
                    <select
                        value={dayPlan.day}
                        onChange={(e) => handleDayChange(dayIndex, e.target.value)}
                        className="block w-full p-2 mb-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Wybierz dzień</option>
                        {days.map(day => (
                            <option key={day.id} value={day.number}>{day.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => handleAddExercise(dayIndex)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md mb-2"
                    >
                        Dodaj ćwiczenie
                    </button>
                    {dayPlan.exercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className="mb-2 p-2 border border-gray-200 rounded">
                            <select
                                value={exercise.exercise_id}
                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'exercise_id', e.target.value)}
                                className="block w-full p-2 mb-1 border border-gray-300 rounded-md"
                            >
                                <option value="">Wybierz ćwiczenie</option>
                                {exercises.map(ex => (
                                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                placeholder="Seria"
                                value={exercise.sets}
                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'sets', e.target.value)}
                                className="block w-full p-2 mb-1 border border-gray-300 rounded-md"
                            />
                            <input
                                type="number"
                                placeholder="Powtórzenia"
                                value={exercise.reps}
                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'reps', e.target.value)}
                                className="block w-full p-2 mb-1 border border-gray-300 rounded-md"
                            />
                            <input
                                type="number"
                                placeholder="Waga (kg)"
                                value={exercise.weight}
                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'weight', e.target.value)}
                                className="block w-full p-2 mb-1 border border-gray-300 rounded-md"
                            />
                            <input
                                type="number"
                                placeholder="Przerwa (sek)"
                                value={exercise.break}
                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'break', e.target.value)}
                                className="block w-full p-2 mb-1 border border-gray-300 rounded-md"
                            />
                        </div>
                    ))}
                </div>
            ))}
            <button
                onClick={handleSave}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md m-2"
            >
                Zapisz plan
            </button>
        </div>
    );
};

export default PlanForm;
