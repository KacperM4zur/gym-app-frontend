import React, { useEffect, useState } from 'react';

const ExercisePlanCard = ({ day }) => {
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [days, setDays] = useState([]);

    useEffect(() => {
        const fetchWorkoutPlan = async () => {
            const response = await fetch('http://gym-app.test/api/user-active-workout-plan', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setWorkoutPlan(data.data);
        };

        const fetchDays = async () => {
            const response = await fetch('http://gym-app.test/api/days', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            const data = await response.json();
            setDays(data.data);
        };

        fetchWorkoutPlan();
        fetchDays();
    }, []);

    const currentDay = days.find(d => d.number === day);

    const exercisesForDay = workoutPlan
        ? workoutPlan.workout_days.filter(dayPlan => dayPlan.day_id === day)
        : [];

    return (
        <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-2">Trening na {currentDay ? currentDay.name : 'dzień'}</h2>
            {exercisesForDay.length > 0 ? (
                exercisesForDay.map((dayPlan, index) => (
                    <div key={index}>
                        {dayPlan.workout_exercises.map((exercise, exIndex) => (
                            <p key={exIndex}>
                                <strong>{exercise.exercise.name}</strong>: {exercise.sets} x {exercise.reps} powtórzeń - {exercise.weight}kg - {exercise.break}s
                            </p>
                        ))}
                    </div>
                ))
            ) : (
                <p>Brak ćwiczeń na dzisiaj.</p>
            )}
        </div>
    );
};

export default ExercisePlanCard;
