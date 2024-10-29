import React, { useState, useEffect } from 'react';
import DaySelectionTraining from "../../components/user_login/training_page/DaySelectionTraining.jsx";
import TrainingForm from "../../components/user_login/training_page/TrainingForm.jsx";
import TrainingSummary from "../../components/user_login/training_page/TrainingSummary.jsx";
import SavedTrainingPlans from "../../components/user_login/training_page/SavedTrainingPlans.jsx";

const Training = () => {
    const [step, setStep] = useState(1);
    const [selectedDay, setSelectedDay] = useState('');
    const [trainingPlan, setTrainingPlan] = useState({});
    const [currentExercise, setCurrentExercise] = useState({ exercise: '', sets: '', reps: '', rest: '' });
    const [savedPlans, setSavedPlans] = useState([]);
    const [planName, setPlanName] = useState('');
    const [isPlanNameSet, setIsPlanNameSet] = useState(false);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [exerciseOptions, setExerciseOptions] = useState([]);

    // Helper function to fetch API data with Authorization header
    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem('token');
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            };
        }
        const response = await fetch(url, options);
        return response.json();
    };

    // Fetch days and exercises when component mounts
    useEffect(() => {
        const fetchDaysAndExercises = async () => {
            try {
                const daysData = await fetchWithAuth("http://gym-app.test/api/days");
                setDaysOfWeek(daysData.data.map(day => day.name));

                const exercisesData = await fetchWithAuth("http://gym-app.test/api/exercises");
                setExerciseOptions(exercisesData.map(exercise => exercise.name));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDaysAndExercises();
    }, []);

    const selectDay = (day) => {
        setSelectedDay(day);
        setStep(2);
    };

    const handleExerciseChange = (e) => {
        setCurrentExercise({ ...currentExercise, [e.target.name]: e.target.value });
    };

    const handlePlanNameChange = (e) => {
        setPlanName(e.target.value);
    };

    const addExercise = () => {
        if (currentExercise.exercise && currentExercise.sets && currentExercise.reps && currentExercise.rest) {
            setTrainingPlan((prev) => ({
                ...prev,
                [selectedDay]: [...(prev[selectedDay] || []), currentExercise],
            }));
            setCurrentExercise({ exercise: '', sets: '', reps: '', rest: '' });
            setStep(1);
        }
    };

    const savePlan = async () => {
        if (planName && Object.keys(trainingPlan).length > 0) {
            try {
                // Przygotowanie struktury workoutPlanData zgodnie z oczekiwaniami API
                const workoutPlanData = {
                    workoutPlanName: planName,
                    plan: Object.entries(trainingPlan).map(([day, exercises]) => ({
                        day_of_week: daysOfWeek.indexOf(day) + 1, // Zamień dzień na indeks (1 dla Poniedziałku, itd.)
                        exercises: exercises.map(exercise => ({
                            exercise_id: exercise.exercise_id || 1, // Jeśli brakuje exercise_id, podaj przykładową wartość
                            sets: parseInt(exercise.sets),
                            reps: parseInt(exercise.reps),
                            break: parseInt(exercise.rest),
                            weight: parseFloat(exercise.weight || 0) // Zakładamy wagę jako 0 jeśli brak wartości
                        }))
                    }))
                };

                const response = await fetchWithAuth("http://gym-app.test/api/create-workout-plan", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ workoutPlan: workoutPlanData }),
                });

                if (response.status === 200) {
                    console.log("Plan saved successfully:", response);
                    setSavedPlans((prevPlans) => [
                        ...prevPlans,
                        { name: planName, days: trainingPlan },
                    ]);
                    setTrainingPlan({});
                    setPlanName('');
                    setStep(1);
                    setIsPlanNameSet(false);
                } else {
                    console.error("Failed to save plan:", response);
                }
            } catch (error) {
                console.error("Error saving plan:", error);
            }
        }
    };

    const handleSetPlanName = () => {
        if (planName) {
            setIsPlanNameSet(true);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-5xl font-bold mb-6 text-center text-gray-900">Kreator Planu Treningowego</h1>

            <SavedTrainingPlans plans={savedPlans} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div className="col-span-1">
                    <DaySelectionTraining
                        daysOfWeek={daysOfWeek}
                        selectedDay={selectedDay}
                        selectDay={selectDay}
                    />
                </div>

                <div className="col-span-3">
                    {!isPlanNameSet && (
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Nazwa planu</label>
                            <input
                                type="text"
                                value={planName}
                                onChange={handlePlanNameChange}
                                placeholder="Wprowadź nazwę planu"
                                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleSetPlanName}
                                className="bg-blue-500 text-white px-6 py-3 mt-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                            >
                                Zatwierdź nazwę planu
                            </button>
                        </div>
                    )}

                    {isPlanNameSet && step === 2 && (
                        <TrainingForm
                            currentExercise={currentExercise}
                            handleExerciseChange={handleExerciseChange}
                            addExercise={addExercise}
                            setStep={setStep}
                            selectedDay={selectedDay}
                            exerciseOptions={exerciseOptions}
                        />
                    )}

                    {isPlanNameSet && (
                        <>
                            <TrainingSummary daysOfWeek={daysOfWeek} trainingPlan={trainingPlan} />

                            <div className="flex justify-center mt-10">
                                <button
                                    onClick={savePlan}
                                    className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 mt-6"
                                    style={{ marginBottom: "80px" }}
                                >
                                    Zapisz plan
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Training;
