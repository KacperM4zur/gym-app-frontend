// pages/Supplementation.jsx
import React, { useState } from 'react';
import DaySelection from "../../components/user_login/supplementation_page/DaySelection.jsx";
import SupplementForm from "../../components/user_login/supplementation_page/SupplementForm.jsx";
import Summary from "../../components/user_login/supplementation_page/Summary.jsx";
import SavedPlans from "../../components/user_login/supplementation_page/SavedPlans.jsx";
import PlanModal from "../../components/user_login/supplementation_page/PlanModal.jsx";

const Supplementation = () => {
    const [step, setStep] = useState(1);  // Krok kreatora
    const [selectedDay, setSelectedDay] = useState('');  // Wybrany dzień
    const [supplements, setSupplements] = useState({});  // Plan suplementacyjny dla dni
    const [currentSupplement, setCurrentSupplement] = useState({ name: '', amount: '', time: '' });  // Aktualny suplement
    const [selectedPlan, setSelectedPlan] = useState(null);  // Wybrany plan do podglądu

    // Przechowujemy zapisane plany w stanie
    const [savedPlans, setSavedPlans] = useState([
        {
            'Poniedziałek': [
                { name: 'Białko', amount: '30g', time: 'rano' },
                { name: 'Kreatyna', amount: '5g', time: 'po treningu' },
            ],
            'Wtorek': [
                { name: 'BCAA', amount: '10g', time: 'przed treningiem' },
            ],
            'Środa': [
                { name: 'Witamina D', amount: '2000 IU', time: 'rano' },
            ],
        },
        {
            'Czwartek': [
                { name: 'Omega 3', amount: '1 kapsułka', time: 'rano' },
                { name: 'Białko', amount: '25g', time: 'po treningu' },
            ],
            'Piątek': [
                { name: 'Kreatyna', amount: '5g', time: 'po treningu' },
                { name: 'Witamina D', amount: '2000 IU', time: 'rano' },
            ],
        },
    ]);

    const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    const supplementOptions = ['Białko', 'Kreatyna', 'Witamina D', 'Omega 3', 'BCAA'];

    const selectDay = (day) => {
        setSelectedDay(day);
        setStep(2);  // Przejście do następnego kroku
    };

    const handleSupplementChange = (e) => {
        setCurrentSupplement({ ...currentSupplement, [e.target.name]: e.target.value });
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

    // Funkcja zapisująca nowy plan do listy
    const savePlan = () => {
        if (Object.keys(supplements).length > 0) {
            setSavedPlans((prevPlans) => [...prevPlans, supplements]); // Dodaj nowy plan do zapisanych
            setSupplements({});  // Wyczyść obecny plan po zapisaniu
            setStep(1);  // Powrót do kroku 1
            console.log("Nowy plan zapisany:", supplements);  // Można go później wysłać do backendu
        }
    };

    const selectPlan = (plan) => {
        setSelectedPlan(plan);  // Zapisz wybrany plan do podglądu
    };

    const closeModal = () => {
        setSelectedPlan(null);  // Zamykanie modala
    };

    return (
        <div className="container mx-auto p-6">

            {/* Sekcja zapisywanych planów */}
            <SavedPlans plans={savedPlans} selectPlan={selectPlan} />

            {/* Modal z podglądem wybranego planu */}
            {selectedPlan && (
                <PlanModal plan={selectedPlan} closeModal={closeModal} daysOfWeek={daysOfWeek} />
            )}

            <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Kreator Planu Suplementacyjnego</h1>

            {/* Sekcja nowego planu */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-1">
                    <DaySelection
                        daysOfWeek={daysOfWeek}
                        selectedDay={selectedDay}
                        selectDay={selectDay}
                    />
                </div>

                <div className="col-span-3">
                    {step === 2 && (
                        <SupplementForm
                            currentSupplement={currentSupplement}
                            handleSupplementChange={handleSupplementChange}
                            addSupplement={addSupplement}
                            setStep={setStep}
                            selectedDay={selectedDay}
                            supplementOptions={supplementOptions}
                        />
                    )}

                    <Summary daysOfWeek={daysOfWeek} supplements={supplements} />

                    <div className="flex justify-center">
                        <button
                            onClick={savePlan}
                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                        >
                            Zapisz plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Supplementation;
