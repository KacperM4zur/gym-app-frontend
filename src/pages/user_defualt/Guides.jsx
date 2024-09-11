import LayoutDefaultUser from "../../components/user_defualt/LayoutDefaultUser.jsx";
import { useState } from 'react';

const Guides = () => {
    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const bodyParts = [
        { name: "Klatka piersiowa", exercises: ["Wyciskanie sztangi", "Rozpiętki", "Pompki"] },
        { name: "Plecy", exercises: ["Podciąganie", "Wiosłowanie sztangą", "Martwy ciąg"] },
        { name: "Nogi", exercises: ["Przysiady", "Wykroki", "Martwy ciąg na prostych nogach"] },
        { name: "Ramiona", exercises: ["Uginanie ramion", "Prostowanie ramion", "Wyciskanie francuskie"] },
        { name: "Barki", exercises: ["Wyciskanie sztangi", "Unoszenie hantli", "Arnoldki"] },
        { name: "Brzuch", exercises: ["Plank", "Brzuszki", "Unoszenie nóg"] }
    ];

    const exerciseDetails = {
        "Wyciskanie sztangi": "Wyciskanie sztangi to podstawowe ćwiczenie na klatkę piersiową, idealne do budowania siły.",
        "Rozpiętki": "Rozpiętki to świetne ćwiczenie izolacyjne na rozwój klatki piersiowej.",
        "Pompki": "Pompki to wszechstronne ćwiczenie wzmacniające klatkę piersiową, triceps i barki.",
        // Dodaj szczegóły dla pozostałych ćwiczeń
    };

    const examplePlans = [
        {
            name: "Plan treningowy dla początkujących",
            description: "Prosty plan dla osób zaczynających swoją przygodę z siłownią.",
            details: {
                daysPerWeek: 3,
                schedule: ["Dzień 1: Klatka piersiowa i triceps", "Dzień 2: Plecy i biceps", "Dzień 3: Nogi i barki"],
            }
        },
        {
            name: "Plan treningowy push-pull-legs",
            description: "Trening podzielony na partie pchające, ciągnące i nogi.",
            details: {
                daysPerWeek: 4,
                schedule: ["Dzień 1: Push", "Dzień 2: Pull", "Dzień 3: Legs", "Dzień 4: Odpoczynek"],
            }
        },
        {
            name: "Plan 5x5",
            description: "Skuteczny plan na siłę, z naciskiem na podstawowe ćwiczenia z wolnymi ciężarami.",
            details: {
                daysPerWeek: 3,
                schedule: ["Dzień 1: Przysiady, Wyciskanie, Martwy ciąg", "Dzień 2: Przysiady, Wyciskanie sztangi, Wiosłowanie"],
            }
        }
    ];

    const exampleWorkouts = [
        {
            name: "Trening całego ciała",
            description: "Idealny trening na szybki, kompleksowy rozwój mięśni.",
            details: ["Przysiady", "Wyciskanie sztangi", "Wiosłowanie", "Pompki"]
        },
        {
            name: "Trening na masę",
            description: "Skup się na dużej objętości i małych powtórzeniach.",
            details: ["Martwy ciąg", "Wyciskanie hantli", "Uginanie ramion", "Przysiady"]
        },
        {
            name: "Trening na redukcję",
            description: "Trening z większą ilością powtórzeń, mający na celu spalanie tłuszczu.",
            details: ["Plank", "Unoszenie nóg", "Pompki", "Przysiady"]
        }
    ];

    return (
        <LayoutDefaultUser>
            <div className="p-6 bg-gray-100 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-6 text-green-600">Poradniki</h1>

                {/* Body Parts Section */}
                {!selectedPart && !selectedPlan && !selectedWorkout && (
                    <>
                        <div className="w-full max-w-4xl mb-10">
                            <h2 className="text-2xl font-bold mb-4">Wybierz partię ciała</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {bodyParts.map((part, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedPart(part.name)}
                                        className="bg-white p-4 rounded-lg shadow-md hover:bg-green-100 cursor-pointer transition"
                                    >
                                        <h3 className="text-xl font-semibold">{part.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Example Training Plans */}
                        <div className="w-full max-w-4xl mb-10">
                            <h2 className="text-2xl font-bold mb-4">Przykładowe plany treningowe</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {examplePlans.map((plan, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedPlan(plan)}
                                        className="bg-white p-4 rounded-lg shadow-md hover:bg-green-100 cursor-pointer transition"
                                    >
                                        <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                        <p className="text-gray-700">{plan.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Example Workouts */}
                        <div className="w-full max-w-4xl mb-10">
                            <h2 className="text-2xl font-bold mb-4">Przykładowe treningi</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {exampleWorkouts.map((workout, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setSelectedWorkout(workout)}
                                        className="bg-white p-4 rounded-lg shadow-md hover:bg-green-100 cursor-pointer transition"
                                    >
                                        <h3 className="text-xl font-semibold mb-2">{workout.name}</h3>
                                        <p className="text-gray-700">{workout.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Full Access Information */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-2xl">
                            <h3 className="text-2xl font-bold text-green-600 mb-4">Chcesz więcej funkcji?</h3>
                            <p className="text-gray-700 mb-4">Zarejestruj się, aby uzyskać dostęp do pełnej wersji, gdzie możesz zapisywać wyniki, tworzyć własne plany treningowe i śledzić postępy!</p>
                            <a href="/user_defualt/Register" className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">Zarejestruj się teraz</a>
                        </div>
                    </>
                )}

                {/* Selected Part Details */}
                {selectedPart && !selectedExercise && (
                    <div className="w-full max-w-4xl mb-10">
                        <h3 className="text-2xl font-bold mb-4">Ćwiczenia na: {selectedPart}</h3>
                        <ul className="list-disc ml-5">
                            {bodyParts.find(part => part.name === selectedPart).exercises.map((exercise, index) => (
                                <li
                                    key={index}
                                    className="text-lg hover:underline cursor-pointer"
                                    onClick={() => setSelectedExercise(exercise)}
                                >
                                    {exercise}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setSelectedPart(null)}
                            className="mt-4 text-green-600 font-semibold hover:underline"
                        >
                            Wróć do listy partii ciała
                        </button>
                    </div>
                )}

                {/* Selected Exercise Details */}
                {selectedExercise && (
                    <div className="w-full max-w-4xl mb-10">
                        <h3 className="text-2xl font-bold mb-4">Szczegóły ćwiczenia: {selectedExercise}</h3>
                        <p className="text-gray-700 mb-4">{exerciseDetails[selectedExercise]}</p>
                        <button
                            onClick={() => setSelectedExercise(null)}
                            className="mt-4 text-green-600 font-semibold hover:underline"
                        >
                            Wróć do listy ćwiczeń
                        </button>
                    </div>
                )}

                {/* Selected Plan Details */}
                {selectedPlan && (
                    <div className="w-full max-w-4xl mb-10">
                        <h3 className="text-2xl font-bold mb-4">Szczegóły planu: {selectedPlan.name}</h3>
                        <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
                        <p className="text-gray-700 mb-4">Liczba dni w tygodniu: {selectedPlan.details.daysPerWeek}</p>
                        <ul className="list-disc ml-5 mb-4">
                            {selectedPlan.details.schedule.map((day, index) => (
                                <li key={index} className="text-lg">{day}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setSelectedPlan(null)}
                            className="mt-4 text-green-600 font-semibold hover:underline"
                        >
                            Wróć do listy planów treningowych
                        </button>
                    </div>
                )}

                {/* Selected Workout Details */}
                {selectedWorkout && (
                    <div className="w-full max-w-4xl mb-10">
                        <h3 className="text-2xl font-bold mb-4">Szczegóły treningu: {selectedWorkout.name}</h3>
                        <p className="text-gray-700 mb-4">{selectedWorkout.description}</p>
                        <ul className="list-disc ml-5 mb-4">
                            {selectedWorkout.details.map((exercise, index) => (
                                <li key={index} className="text-lg">{exercise}</li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setSelectedWorkout(null)}
                            className="mt-4 text-green-600 font-semibold hover:underline"
                        >
                            Wróć do listy treningów
                        </button>
                    </div>
                )}
            </div>
        </LayoutDefaultUser>
    );
}

export default Guides;
