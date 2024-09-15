import React, { useState } from 'react';
import DaySelectionTraining from "../../components/user_login/training_page/DaySelectionTraining.jsx";
import TrainingForm from "../../components/user_login/training_page/TrainingForm.jsx";
import TrainingSummary from "../../components/user_login/training_page/TrainingSummary.jsx";
import SavedTrainingPlans from "../../components/user_login/training_page/SavedTrainingPlans.jsx";

const Training = () => {
    const [step, setStep] = useState(1);  // Krok kreatora
    const [selectedDay, setSelectedDay] = useState('');  // Wybrany dzień
    const [trainingPlan, setTrainingPlan] = useState({});  // Plan treningowy dla dni
    const [currentExercise, setCurrentExercise] = useState({ exercise: '', sets: '', reps: '', rest: '' });  // Aktualne ćwiczenie
    const [savedPlans, setSavedPlans] = useState([
        {
            name: 'Trening siłowy A',
            days: {
                'Poniedziałek': [
                    { exercise: 'Przysiady', sets: '4', reps: '12', rest: '1 min' },
                    { exercise: 'Martwy ciąg', sets: '3', reps: '10', rest: '2 min' },
                ],
                'Wtorek': [
                    { exercise: 'Wyciskanie na ławce', sets: '4', reps: '10', rest: '1.5 min' },
                    { exercise: 'Podciąganie', sets: '3', reps: '8', rest: '2 min' },
                ],
            }
        },
        {
            name: 'Trening funkcjonalny',
            days: {
                'Środa': [
                    { exercise: 'Plank', sets: '3', reps: '1 min', rest: '2 min' },
                    { exercise: 'Wiosłowanie hantlami', sets: '4', reps: '12', rest: '1.5 min' },
                ]
            }
        },
    ]);
    const [planName, setPlanName] = useState('');  // Nazwa planu
    const [isPlanNameSet, setIsPlanNameSet] = useState(false);  // Czy nazwa planu została ustawiona

    const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    const exerciseOptions = ['Przysiady', 'Martwy ciąg', 'Wyciskanie na ławce', 'Podciąganie', 'Plank'];

    const selectDay = (day) => {
        setSelectedDay(day);
        setStep(2);  // Przejście do następnego kroku
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
            setStep(1);  // Powrót do wyboru dnia
        }
    };

    const savePlan = () => {
        if (planName && Object.keys(trainingPlan).length > 0) {
            setSavedPlans((prevPlans) => [
                ...prevPlans,
                { name: planName, days: trainingPlan }
            ]);
            setTrainingPlan({});
            setPlanName('');
            setStep(1);
            setIsPlanNameSet(false);  // Reset po zapisaniu planu
            console.log('Zapisany plan treningowy:', { planName, trainingPlan });
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

            {/* Sekcja zapisanych planów */}
            <SavedTrainingPlans plans={savedPlans} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                {/* Wybór dni */}
                <div className="col-span-1">
                    <DaySelectionTraining
                        daysOfWeek={daysOfWeek}
                        selectedDay={selectedDay}
                        selectDay={selectDay}
                    />
                </div>

                <div className="col-span-3">
                    {/* Wyświetl pole nazwy planu tylko raz, przed dodawaniem ćwiczeń */}
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

                    {/* Formularz dodawania ćwiczeń */}
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

                    {/* Podsumowanie planu */}
                    {isPlanNameSet && (
                        <>
                            <TrainingSummary daysOfWeek={daysOfWeek} trainingPlan={trainingPlan} />

                            {/* Przycisk zapisu planu */}
                            <div className="flex justify-center mt-10">
                                <button
                                    onClick={savePlan}
                                    className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 mt-6"
                                    style={{ marginBottom: "80px" }}  // Przesunięcie przycisku
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
