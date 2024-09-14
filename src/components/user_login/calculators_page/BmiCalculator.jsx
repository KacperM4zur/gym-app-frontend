import React, { useState } from 'react';

const BmiCalculator = ({ closeModal }) => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [resultText, setResultText] = useState('');

    const calculateBMI = () => {
        const heightInMeters = height / 100;
        const result = weight / (heightInMeters * heightInMeters);
        setBmi(result.toFixed(2));

        if (result < 18.5) {
            setResultText('Niedowaga');
        } else if (result >= 18.5 && result < 24.9) {
            setResultText('Waga prawidłowa');
        } else if (result >= 25 && result < 29.9) {
            setResultText('Nadwaga');
        } else {
            setResultText('Otyłość');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-lg relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">&times;</button>
                <h2 className="text-2xl font-bold mb-4">Kalkulator BMI</h2>
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
                <button
                    onClick={calculateBMI}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-2 hover:bg-blue-600 transition duration-300"
                >
                    Oblicz BMI
                </button>

                {bmi && (
                    <div className="mt-4 bg-green-100 p-4 rounded-lg">
                        <p>Twoje BMI: <strong>{bmi}</strong></p>
                        <p>Wynik: <strong>{resultText}</strong></p>
                    </div>
                )}

                <div className="mt-6">
                    <h3 className="font-semibold text-lg">Znaczenie wyników BMI:</h3>
                    <table className="w-full mt-4">
                        <thead>
                        <tr>
                            <th className="text-left p-2 border">Kategoria</th>
                            <th className="text-left p-2 border">BMI</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="p-2 border">Niedowaga</td>
                            <td className="p-2 border">Mniej niż 18.5</td>
                        </tr>
                        <tr>
                            <td className="p-2 border">Waga prawidłowa</td>
                            <td className="p-2 border">18.5 - 24.9</td>
                        </tr>
                        <tr>
                            <td className="p-2 border">Nadwaga</td>
                            <td className="p-2 border">25 - 29.9</td>
                        </tr>
                        <tr>
                            <td className="p-2 border">Otyłość</td>
                            <td className="p-2 border">30 lub więcej</td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="mt-4">
                        <p><strong>BMI</strong> to wskaźnik masy ciała obliczany na podstawie wzrostu i wagi. Jest on używany do oceny ryzyka zdrowotnego związanego z masą ciała. Osoby z wysokim BMI mogą być bardziej narażone na choroby serca, cukrzycę typu 2 i inne schorzenia.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BmiCalculator;
