import React, { useState } from 'react';

const BodyFatCalculator = ({ closeModal }) => {
    const [weight, setWeight] = useState('');
    const [waist, setWaist] = useState('');
    const [bodyFat, setBodyFat] = useState(null);

    const calculateBodyFat = () => {
        const result = (waist * 0.74) / weight;
        setBodyFat((result * 100).toFixed(2));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;</button>
                <h2 className="text-2xl font-bold mb-4">Kalkulator Indeksu Tłuszczu Ciała</h2>
                <input
                    type="number"
                    placeholder="Waga (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Obwód talii (cm)"
                    value={waist}
                    onChange={(e) => setWaist(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <button
                    onClick={calculateBodyFat}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-2 hover:bg-blue-600 transition duration-300"
                >
                    Oblicz
                </button>
                {bodyFat && (
                    <div className="mt-4 bg-green-100 p-4 rounded-lg">
                        <p>Twój indeks tłuszczu ciała: <strong>{bodyFat} %</strong></p>
                    </div>
                )}

                <div className="mt-6">
                    <h3 className="font-semibold text-lg">Znaczenie poziomu tłuszczu w organizmie:</h3>
                    <p><strong>Poziom tłuszczu</strong> w organizmie jest ważnym wskaźnikiem zdrowia. Oto przykładowe przedziały procentowe:</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li><strong>Kobiety:</strong></li>
                        <ul className="list-disc pl-6">
                            <li>Atletyczne: 14-20%</li>
                            <li>Fitness: 21-24%</li>
                            <li>Waga prawidłowa: 25-31%</li>
                            <li>Otyłość: 32% lub więcej</li>
                        </ul>
                        <li><strong>Mężczyźni:</strong></li>
                        <ul className="list-disc pl-6">
                            <li>Atletyczne: 6-13%</li>
                            <li>Fitness: 14-17%</li>
                            <li>Waga prawidłowa: 18-24%</li>
                            <li>Otyłość: 25% lub więcej</li>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BodyFatCalculator;
