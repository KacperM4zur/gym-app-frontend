import React, { useState } from 'react';

const Profile = () => {
    const [selectedTrainingPlan, setSelectedTrainingPlan] = useState('');
    const [selectedSupplementPlan, setSelectedSupplementPlan] = useState('');
    const [weight, setWeight] = useState('');
    const [measurements, setMeasurements] = useState({
        chest: '',
        waist: '',
        hips: '',
        arms: '',
    });
    const [avatar, setAvatar] = useState(null);
    const [fitnessGoal, setFitnessGoal] = useState('');
    const [trainingHistory, setTrainingHistory] = useState([
        { date: '12-09-2023', workout: 'Trening siłowy A' },
        { date: '13-09-2023', workout: 'Trening funkcjonalny' },
    ]);
    const [strengthRecords, setStrengthRecords] = useState({
        squat: '',
        deadlift: '',
        benchPress: '',
    });
    const [diet, setDiet] = useState('');

    const trainingPlans = ['Trening siłowy A', 'Trening funkcjonalny', 'Trening cardio'];
    const supplementPlans = ['Plan suplementacyjny A', 'Plan suplementacyjny B', 'Plan dla regeneracji'];

    const handleTrainingPlanChange = (e) => {
        setSelectedTrainingPlan(e.target.value);
    };

    const handleSupplementPlanChange = (e) => {
        setSelectedSupplementPlan(e.target.value);
    };

    const handleMeasurementsChange = (e) => {
        setMeasurements({ ...measurements, [e.target.name]: e.target.value });
    };

    const handleAvatarChange = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };

    const handleStrengthRecordChange = (e) => {
        setStrengthRecords({ ...strengthRecords, [e.target.name]: e.target.value });
    };

    const handleDietChange = (e) => {
        setDiet(e.target.value);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-5xl font-bold mb-6 text-center">Twój Profil</h1>

            {/* Sekcja avatara */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Avatar</h2>
                {avatar ? (
                    <img src={avatar} alt="Avatar" className="mx-auto w-32 h-32 rounded-full mb-4" />
                ) : (
                    <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                        <span className="text-gray-500">Brak zdjęcia</span>
                    </div>
                )}
                <input type="file" onChange={handleAvatarChange} className="block mx-auto" />
            </div>

            {/* Wybór planu treningowego */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Wybierz aktualny plan treningowy</h2>
                <select
                    value={selectedTrainingPlan}
                    onChange={handleTrainingPlanChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Wybierz plan treningowy</option>
                    {trainingPlans.map((plan, index) => (
                        <option key={index} value={plan}>
                            {plan}
                        </option>
                    ))}
                </select>
            </div>

            {/* Wybór planu suplementacyjnego */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Wybierz aktualny plan suplementacyjny</h2>
                <select
                    value={selectedSupplementPlan}
                    onChange={handleSupplementPlanChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Wybierz plan suplementacyjny</option>
                    {supplementPlans.map((plan, index) => (
                        <option key={index} value={plan}>
                            {plan}
                        </option>
                    ))}
                </select>
            </div>

            {/* Waga i pomiary ciała */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Waga i Pomiary</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Waga (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Wprowadź wagę"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Klatka (cm)</label>
                        <input
                            type="number"
                            name="chest"
                            value={measurements.chest}
                            onChange={handleMeasurementsChange}
                            placeholder="Wprowadź obwód klatki"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Talia (cm)</label>
                        <input
                            type="number"
                            name="waist"
                            value={measurements.waist}
                            onChange={handleMeasurementsChange}
                            placeholder="Wprowadź obwód talii"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Biodra (cm)</label>
                        <input
                            type="number"
                            name="hips"
                            value={measurements.hips}
                            onChange={handleMeasurementsChange}
                            placeholder="Wprowadź obwód bioder"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Ramiona (cm)</label>
                        <input
                            type="number"
                            name="arms"
                            value={measurements.arms}
                            onChange={handleMeasurementsChange}
                            placeholder="Wprowadź obwód ramion"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Cele fitness */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Cele fitness</h2>
                <textarea
                    value={fitnessGoal}
                    onChange={(e) => setFitnessGoal(e.target.value)}
                    placeholder="Wprowadź swoje cele (np. utrata tkanki tłuszczowej, zwiększenie masy mięśniowej)"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Rekordy siłowe */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Rekordy siłowe</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Przysiad (kg)</label>
                        <input
                            type="number"
                            name="squat"
                            value={strengthRecords.squat}
                            onChange={handleStrengthRecordChange}
                            placeholder="Wprowadź rekord"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Martwy ciąg (kg)</label>
                        <input
                            type="number"
                            name="deadlift"
                            value={strengthRecords.deadlift}
                            onChange={handleStrengthRecordChange}
                            placeholder="Wprowadź rekord"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Wyciskanie na ławce (kg)</label>
                        <input
                            type="number"
                            name="benchPress"
                            value={strengthRecords.benchPress}
                            onChange={handleStrengthRecordChange}
                            placeholder="Wprowadź rekord"
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Dziennik diety */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Dieta</h2>
                <textarea
                    value={diet}
                    onChange={handleDietChange}
                    placeholder="Opisz swoją dietę lub preferowane makroskładniki"
                    className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Historia treningów */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Historia treningów</h2>
                <ul className="list-disc list-inside">
                    {trainingHistory.map((session, index) => (
                        <li key={index} className="mb-2">
                            {session.date} - {session.workout}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Przycisk zapisu */}
            <div className="flex justify-center">
                <button
                    onClick={() => console.log('Zapisano profil:', { selectedTrainingPlan, selectedSupplementPlan, weight, measurements, fitnessGoal, strengthRecords, diet })}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                    Zapisz zmiany
                </button>
            </div>
        </div>
    );
};

export default Profile;
