import LayoutDefaultUser from "../../components/user_defualt/LayoutDefaultUser.jsx";
import { useState } from 'react';
import ModalGuides from "../../components/user_defualt/guides_page/ModalGuides.jsx";

const Guides = () => {
    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [filter, setFilter] = useState('Wszystkie');
    const [showModal, setShowModal] = useState(false);

    const bodyParts = ["Klatka piersiowa", "Plecy", "Nogi", "Ramiona", "Barki", "Brzuch"];
    const exercises = [
        { name: "Wyciskanie sztangi", part: "Klatka piersiowa", description: "Wyciskanie sztangi to podstawowe ćwiczenie na klatkę piersiową, idealne do budowania siły." },
        { name: "Rozpiętki", part: "Klatka piersiowa", description: "Rozpiętki to świetne ćwiczenie izolacyjne na rozwój klatki piersiowej." },
        { name: "Pompki", part: "Klatka piersiowa", description: "Pompki wzmacniają klatkę, triceps i barki." },
        { name: "Martwy ciąg", part: "Plecy", description: "Martwy ciąg to kompleksowe ćwiczenie na plecy i nogi." },
        { name: "Wiosłowanie sztangą", part: "Plecy", description: "Wiosłowanie wzmacnia mięśnie pleców i ramion." },
        { name: "Przysiady", part: "Nogi", description: "Przysiady rozwijają siłę nóg i ogólną wytrzymałość." },
        // Dodaj więcej ćwiczeń tutaj
    ];

    const plans = [
        {
            name: "Plan dla początkujących",
            target: "Osoby początkujące",
            description: "Prosty plan na 3 dni, idealny na start.",
            volume: "3 serie, 10 powtórzeń na każde ćwiczenie",
            days: {
                "Poniedziałek": [
                    { exercise: "Wyciskanie sztangi", sets: 3, reps: 10 },
                    { exercise: "Pompki", sets: 3, reps: 12 },
                    { exercise: "Przysiady", sets: 4, reps: 10 }
                ],
                "Środa": [
                    { exercise: "Martwy ciąg", sets: 3, reps: 8 },
                    { exercise: "Wiosłowanie sztangą", sets: 4, reps: 10 }
                ],
                "Piątek": [
                    { exercise: "Rozpiętki", sets: 3, reps: 12 },
                    { exercise: "Przysiady", sets: 4, reps: 10 }
                ]
            }
        },
        {
            name: "Plan siłowy",
            target: "Zaawansowani",
            description: "Plan 4-dniowy skupiony na sile.",
            volume: "4 serie, 6 powtórzeń na każde ćwiczenie",
            days: {
                "Poniedziałek": [
                    { exercise: "Wyciskanie sztangi", sets: 4, reps: 6 },
                    { exercise: "Przysiady", sets: 4, reps: 6 }
                ],
                "Wtorek": [
                    { exercise: "Martwy ciąg", sets: 3, reps: 5 },
                    { exercise: "Wiosłowanie sztangą", sets: 4, reps: 6 }
                ],
                "Czwartek": [
                    { exercise: "Pompki", sets: 4, reps: 12 },
                    { exercise: "Rozpiętki", sets: 3, reps: 10 }
                ],
                "Piątek": [
                    { exercise: "Przysiady", sets: 4, reps: 6 },
                    { exercise: "Martwy ciąg", sets: 3, reps: 5 }
                ]
            }
        },
    ];

    const filteredExercises = filter === 'Wszystkie' ? exercises : exercises.filter(exercise => exercise.part === filter);

    const handleFilterChange = (part) => {
        setFilter(part);
    };

    const openPlanModal = (plan) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    const openExerciseModal = (exercise) => {
        setSelectedExercise(exercise);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedExercise(null);
        setSelectedPlan(null);
    };

    return (
        <LayoutDefaultUser>
            <div className="p-6 bg-gray-100 flex flex-col items-center">
                <h1 className="text-5xl font-bold mb-6 text-green-600">Poradniki</h1>

                {/* Sekcja filtrów i ćwiczeń */}
                <div className="w-full max-w-4xl mb-10">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Ćwiczenia</h2>

                    {/* Filtr ćwiczeń */}
                    <div className="mb-6 flex space-x-4">
                        <button onClick={() => handleFilterChange('Wszystkie')} className={`px-4 py-2 rounded-lg ${filter === 'Wszystkie' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Wszystkie</button>
                        {bodyParts.map((part, index) => (
                            <button
                                key={index}
                                onClick={() => handleFilterChange(part)}
                                className={`px-4 py-2 rounded-lg ${filter === part ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                            >
                                {part}
                            </button>
                        ))}
                    </div>

                    {/* Lista ćwiczeń */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredExercises.map((exercise, index) => (
                            <div
                                key={index}
                                onClick={() => openExerciseModal(exercise)}
                                className="bg-white p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer transition-all duration-300"
                            >
                                <h3 className="text-2xl font-semibold text-gray-800">{exercise.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sekcja planów */}
                <div className="w-full max-w-4xl mb-10">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Przykładowe plany treningowe</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                onClick={() => openPlanModal(plan)}
                                className="bg-white p-6 rounded-lg shadow-lg hover:bg-green-200 cursor-pointer transition-all duration-300"
                            >
                                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                                <p className="text-gray-700">{plan.description}</p>
                                <p className="text-gray-500">Objętość: {plan.volume}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal z planem treningowym */}
                {showModal && selectedPlan && (
                    <ModalGuides closeModal={closeModal}>
                        <h2 className="text-3xl font-bold mb-4">{selectedPlan.name}</h2>
                        <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
                        <p className="text-gray-700 mb-4">Dla kogo: {selectedPlan.target}</p>
                        <p className="text-gray-500 mb-4">Objętość: {selectedPlan.volume}</p>
                        <div className="mb-4">
                            {Object.keys(selectedPlan.days).map((day, index) => (
                                <div key={index} className="mb-4">
                                    <h4 className="text-xl font-bold">{day}</h4>
                                    <ul className="list-disc ml-5">
                                        {selectedPlan.days[day].map((exercise, idx) => (
                                            <li key={idx} className="text-lg">{exercise.exercise} - {exercise.sets} serie, {exercise.reps} powtórzenia</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </ModalGuides>
                )}

                {/* Modal z ćwiczeniem */}
                {showModal && selectedExercise && (
                    <ModalGuides closeModal={closeModal}>
                        <h2 className="text-3xl font-bold mb-4">{selectedExercise.name}</h2>
                        <p className="text-gray-700 mb-4">{selectedExercise.description}</p>
                    </ModalGuides>
                )}
            </div>
        </LayoutDefaultUser>
    );
};

export default Guides;
