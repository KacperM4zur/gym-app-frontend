import React, { useState, useEffect } from 'react';
import DaySelectionSupplement from "../../components/user_login/supplementation_page/DaySelectionSupplement.jsx";
import SupplementForm from "../../components/user_login/supplementation_page/SupplementForm.jsx";
import SupplementSummary from "../../components/user_login/supplementation_page/SupplementSummary.jsx";
import SavedSupplementPlans from "../../components/user_login/supplementation_page/SavedSupplementPlans.jsx";

const Supplementation = () => {
    const [step, setStep] = useState(1);
    const [selectedDay, setSelectedDay] = useState('');
    const [supplements, setSupplements] = useState({});
    const [currentSupplement, setCurrentSupplement] = useState({ supplement_id: '', amount: '', unit: '' });
    const [savedPlans, setSavedPlans] = useState([]);
    const [planName, setPlanName] = useState('');
    const [isPlanNameSet, setIsPlanNameSet] = useState(false);
    const [daysOfWeek, setDaysOfWeek] = useState([]);
    const [supplementOptions, setSupplementOptions] = useState([]);

    // Helper function to fetch data with Authorization header
    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem('token');
        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            };
        }
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        return response.json();
    };

    // Fetch days, supplements, and saved plans when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Pobieranie dni tygodnia
                const daysData = await fetchWithAuth("http://gym-app.test/api/days");
                setDaysOfWeek(daysData.data.map(day => day.name));

                // Pobieranie suplementów
                const supplementsData = await fetchWithAuth("http://gym-app.test/api/supplements");
                setSupplementOptions(supplementsData.map(supplement => ({
                    id: supplement.id,
                    name: supplement.name
                })));

                // Pobranie zapisanych planów suplementacyjnych dla użytkownika
                const savedPlansData = await fetchWithAuth("http://gym-app.test/api/user-supplement-plans");
                setSavedPlans(savedPlansData.data || []); // Ustawienie domyślnej wartości jeśli brak danych
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);



    const selectDay = (day) => {
        setSelectedDay(day);
        setStep(2);
    };

    const handleSupplementChange = (e) => {
        const { name, value } = e.target;
        setCurrentSupplement({ ...currentSupplement, [name]: value });
    };

    const handlePlanNameChange = (e) => {
        setPlanName(e.target.value);
    };

    const addSupplement = () => {
        if (currentSupplement.supplement_id && currentSupplement.amount && currentSupplement.unit) {
            setSupplements((prev) => ({
                ...prev,
                [selectedDay]: [...(prev[selectedDay] || []), currentSupplement],
            }));
            setCurrentSupplement({ supplement_id: '', amount: '', unit: '' });
            setStep(1);
        } else {
            console.log("All fields must be filled");
        }
    };

    const savePlan = async () => {
        if (planName && Object.keys(supplements).length > 0) {
            try {
                const supplementPlanData = {
                    plan_name: planName,
                    plan: Object.entries(supplements).map(([day, supplements]) => ({
                        day_of_week: daysOfWeek.indexOf(day) + 1,
                        supplements: supplements.map(supplement => ({
                            supplement_id: parseInt(supplement.supplement_id, 10),
                            amount: parseFloat(supplement.amount),
                            unit: supplement.unit
                        }))
                    }))
                };

                const response = await fetchWithAuth("http://gym-app.test/api/create-supplement-plan", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ supplementPlan: supplementPlanData }),
                });

                if (response.status === 200) {
                    console.log("Plan saved successfully:", response);

                    // Pobranie zaktualizowanej listy planów po zapisaniu nowego planu
                    const updatedPlans = await fetchWithAuth("http://gym-app.test/api/user-supplement-plans");
                    setSavedPlans(updatedPlans.data || []); // Aktualizacja stanu `savedPlans`

                    setSupplements({});
                    setPlanName('');
                    setStep(1);
                    setIsPlanNameSet(false);
                } else {
                    console.error("Failed to save plan:", response);
                }
            } catch (error) {
                console.error("Error saving plan:", error);
            }
        } else {
            console.log("Plan name and supplements are required");
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

            {supplementOptions.length > 0 && (
                <SavedSupplementPlans plans={savedPlans} supplementOptions={supplementOptions} />
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                <div className="col-span-1">
                    <DaySelectionSupplement
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
                        <SupplementForm
                            currentSupplement={currentSupplement}
                            handleSupplementChange={handleSupplementChange}
                            addSupplement={addSupplement}
                            setStep={setStep}
                            selectedDay={selectedDay}
                            supplementOptions={supplementOptions}
                        />
                    )}

                    {isPlanNameSet && (
                        <>
                            <SupplementSummary daysOfWeek={daysOfWeek} supplements={supplements} supplementOptions={supplementOptions} />

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

export default Supplementation;
