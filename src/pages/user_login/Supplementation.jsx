import React, { useState } from 'react';
import DaySelectionSupplement from "../../components/user_login/supplementation_page/DaySelectionSupplement.jsx";
import SupplementForm from "../../components/user_login/supplementation_page/SupplementForm.jsx";
import SupplementSummary from "../../components/user_login/supplementation_page/SupplementSummary.jsx";
import SavedSupplementPlans from "../../components/user_login/supplementation_page/SavedSupplementPlans.jsx";

const Supplementation = () => {
    const [step, setStep] = useState(1);  // Krok kreatora
    const [selectedDay, setSelectedDay] = useState('');  // Wybrany dzień
    const [supplements, setSupplements] = useState({});  // Plan suplementacyjny dla dni
    const [currentSupplement, setCurrentSupplement] = useState({ name: '', amount: '', time: '' });  // Aktualny suplement
    const [savedPlans, setSavedPlans] = useState([
        {
            name: 'Plan A',
            days: {
                'Poniedziałek': [
                    { name: 'Białko', amount: '30g', time: 'rano' },
                    { name: 'Kreatyna', amount: '5g', time: 'po treningu' },
                ],
                'Wtorek': [
                    { name: 'Omega 3', amount: '1 kapsułka', time: 'rano' },
                ],
            }
        },
        {
            name: 'Plan B',
            days: {
                'Środa': [
                    { name: 'BCAA', amount: '10g', time: 'przed treningiem' },
                ]
            }
        },
    ]);
    const [planName, setPlanName] = useState('');  // Nazwa planu
    const [isPlanNameSet, setIsPlanNameSet] = useState(false);  // Czy nazwa planu została ustawiona

    const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    const supplementOptions = ['Białko', 'Kreatyna', 'Witamina D', 'Omega 3', 'BCAA'];

    const selectDay = (day) => {
        setSelectedDay(day);
        setStep(2);  // Przejście do następnego kroku
    };

    const handleSupplementChange = (e) => {
        setCurrentSupplement({ ...currentSupplement, [e.target.name]: e.target.value });
    };

    const handlePlanNameChange = (e) => {
        setPlanName(e.target.value);
    };

    const addSupplement = () => {
        if (currentSupplement.name && currentSupplement.amount && currentSupplement.time) {
            setSupplements((prev) => ({
                ...prev,
                [selectedDay]: [...(prev[selectedDay] || []), currentSupplement],
            }));
            setCurrentSupplement({ name: '', amount: '', time: '' });
            setStep(1);  // Powrót do wyboru dnia
        }
    };

    const savePlan = () => {
        if (planName && Object.keys(supplements).length > 0) {
            setSavedPlans((prevPlans) => [
                ...prevPlans,
                { name: planName, days: supplements }
            ]);
            setSupplements({});
            setPlanName('');
            setStep(1);
            setIsPlanNameSet(false);  // Reset po zapisaniu planu
            console.log('Zapisany plan:', { planName, supplements });
        }
    };

    const handleSetPlanName = () => {
        if (planName) {
            setIsPlanNameSet(true);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-5xl font-bold mb-6 text-center text-gray-900">Kreator Planu Suplementacyjnego</h1>

            {/* Sekcja zapisanych planów */}
            <SavedSupplementPlans plans={savedPlans} />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                {/* Wybór dni */}
                <div className="col-span-1">
                    <DaySelectionSupplement
                        daysOfWeek={daysOfWeek}
                        selectedDay={selectedDay}
                        selectDay={selectDay}
                    />
                </div>

                <div className="col-span-3">
                    {/* Wyświetl pole nazwy planu tylko raz, przed dodawaniem suplementów */}
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

                    {/* Formularz dodawania suplementów */}
                    {isPlanNameSet && step === 2 && (
                        <SupplementForm
                            currentSupplement={currentSupplement}
                            handleSupplementChange={handleSupplementChange}
                            addSupplement={addSupplement}
                            setStep={setStep}
                            selectedDay={selectedDay}
                            supplementOptions={supplementOptions}
                        />
                    )}

                    {/* Podsumowanie planu */}
                    {isPlanNameSet && (
                        <>
                            <SupplementSummary daysOfWeek={daysOfWeek} supplements={supplements} />

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

export default Supplementation;
