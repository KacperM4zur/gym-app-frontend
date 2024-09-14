import React, { useState } from 'react';

const OneRepMaxCalculator = ({ closeModal }) => {
    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');
    const [oneRepMax, setOneRepMax] = useState(null);

    const calculateOneRepMax = () => {
        const result = weight * (1 + reps / 30);
        setOneRepMax(result.toFixed(2));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;</button>
                <h2 className="text-2xl font-bold mb-4">Kalkulator Jednego Maksymalnego Obciążenia (One Rep Max)</h2>
                <input
                    type="number"
                    placeholder="Waga (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Ilość powtórzeń"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <button
                    onClick={calculateOneRepMax}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-2 hover:bg-blue-600 transition duration-300"
                >
                    Oblicz
                </button>
                {oneRepMax && (
                    <div className="mt-4 bg-green-100 p-4 rounded-lg">
                        <p>Twoje maksymalne obciążenie: <strong>{oneRepMax} kg</strong></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OneRepMaxCalculator;
