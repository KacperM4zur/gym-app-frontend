import React, { useState } from 'react';

const TdeeCalculator = ({ closeModal }) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [activityLevel, setActivityLevel] = useState('1.2');
    const [gender, setGender] = useState('male');
    const [tdee, setTdee] = useState(null);

    const calculateTDEE = () => {
        let bmr;
        if (gender === 'male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
        const result = bmr * parseFloat(activityLevel);
        setTdee(result.toFixed(2));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;</button>
                <h2 className="text-2xl font-bold mb-4">Kalkulator Dziennego Zapotrzebowania Kalorycznego (TDEE)</h2>
                <input
                    type="number"
                    placeholder="Waga (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Wzrost (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Wiek"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                >
                    <option value="1.2">Siedzący tryb życia</option>
                    <option value="1.375">Lekka aktywność</option>
                    <option value="1.55">Umiarkowana aktywność</option>
                    <option value="1.725">Duża aktywność</option>
                    <option value="1.9">Bardzo duża aktywność</option>
                </select>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                >
                    <option value="male">Mężczyzna</option>
                    <option value="female">Kobieta</option>
                </select>
                <button
                    onClick={calculateTDEE}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-2 hover:bg-blue-600 transition duration-300"
                >
                    Oblicz TDEE
                </button>

                {tdee && (
                    <div className="mt-4 bg-green-100 p-4 rounded-lg">
                        <p>Twoje TDEE: <strong>{tdee}</strong> kcal</p>
                    </div>
                )}

                <div className="mt-6">
                    <h3 className="font-semibold text-lg">Znaczenie TDEE:</h3>
                    <p><strong>TDEE</strong> (Total Daily Energy Expenditure) to całkowite dzienne zapotrzebowanie kaloryczne. Jest to ilość kalorii, jaką organizm spala w ciągu dnia, uwzględniając metabolizm podstawowy (BMR) i aktywność fizyczną. Oto kilka wskaźników:</p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Jeśli chcesz schudnąć, powinieneś spożywać mniej kalorii niż twoje TDEE.</li>
                        <li>Jeśli chcesz przybrać na wadze, spożywaj więcej kalorii niż twoje TDEE.</li>
                        <li>Utrzymanie wagi wymaga spożywania kalorii równych TDEE.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TdeeCalculator;
