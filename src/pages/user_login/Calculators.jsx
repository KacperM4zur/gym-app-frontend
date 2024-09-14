import React, { useState } from 'react';
import BmiCalculator from "../../components/user_login/calculators_page/BmiCalculator.jsx";
import TdeeCalculator from "../../components/user_login/calculators_page/TdeeCalculator.jsx";
import BodyFatCalculator from "../../components/user_login/calculators_page/BodyFatCalculator.jsx";
import BurndedCaloriesCalculator from "../../components/user_login/calculators_page/BurndedCaloriesCalculator.jsx";
import OneRepMaxCalculator from "../../components/user_login/calculators_page/OneRepMaxCalculator.jsx";
import { CalculatorIcon, FireIcon, LightBulbIcon } from "@heroicons/react/16/solid";
import { HeartIcon, ScaleIcon } from "@heroicons/react/24/outline";

const Calculators = () => {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modal) => setActiveModal(modal);
    const closeModal = () => setActiveModal(null);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Kalkulatory Fitness</h1>

            {/* Grid layout z wymuszoną stałą wysokością */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {/* Kafelek BMI */}
                <div
                    onClick={() => openModal('BMI')}
                    className="cursor-pointer bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition transform hover:scale-105 h-[250px]" // Stała wysokość
                >
                    <CalculatorIcon className="w-12 h-12 text-blue-500 mb-4" />
                    <h2 className="text-xl font-semibold">Kalkulator BMI</h2>
                    <p className="text-gray-500 text-center">Oblicz swoje BMI i zobacz normy.</p>
                </div>

                {/* Kafelek TDEE */}
                <div
                    onClick={() => openModal('TDEE')}
                    className="cursor-pointer bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition transform hover:scale-105 h-[250px]"
                >
                    <FireIcon className="w-12 h-12 text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold">Kalkulator TDEE</h2>
                    <p className="text-gray-500 text-center">Oblicz swoje zapotrzebowanie kaloryczne.</p>
                </div>

                {/* Kafelek One Rep Max */}
                <div
                    onClick={() => openModal('OneRepMax')}
                    className="cursor-pointer bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition transform hover:scale-105 h-[250px]"
                >
                    <HeartIcon className="w-12 h-12 text-green-500 mb-4" />
                    <h2 className="text-xl font-semibold">Jedno Maksymalne Obciążenie</h2>
                    <p className="text-gray-500 text-center">Oblicz swoje maksymalne obciążenie.</p>
                </div>

                {/* Kafelek Body Fat */}
                <div
                    onClick={() => openModal('BodyFat')}
                    className="cursor-pointer bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition transform hover:scale-105 h-[250px]"
                >
                    <ScaleIcon className="w-12 h-12 text-orange-500 mb-4" />
                    <h2 className="text-xl font-semibold">Kalkulator Indeksu Tłuszczu Ciała</h2>
                    <p className="text-gray-500 text-center">Oblicz swój indeks tłuszczu.</p>
                </div>

                {/* Kafelek Burned Calories */}
                <div
                    onClick={() => openModal('BurnedCalories')}
                    className="cursor-pointer bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition transform hover:scale-105 h-[250px]"
                >
                    <LightBulbIcon className="w-12 h-12 text-yellow-500 mb-4" />
                    <h2 className="text-xl font-semibold">Kalkulator Spalonych Kalorii</h2>
                    <p className="text-gray-500 text-center">Oblicz kalorie spalone podczas ćwiczeń.</p>
                </div>
            </div>

            {/* Modale dla kalkulatorów */}
            {activeModal === 'BMI' && <BmiCalculator closeModal={closeModal} />}
            {activeModal === 'TDEE' && <TdeeCalculator closeModal={closeModal} />}
            {activeModal === 'OneRepMax' && <OneRepMaxCalculator closeModal={closeModal} />}
            {activeModal === 'BodyFat' && <BodyFatCalculator closeModal={closeModal} />}
            {activeModal === 'BurnedCalories' && <BurndedCaloriesCalculator closeModal={closeModal} />}
        </div>
    );
};

export default Calculators;
