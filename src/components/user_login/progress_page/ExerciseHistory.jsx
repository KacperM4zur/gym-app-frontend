import React from 'react';

const exerciseHistory = [
    { id: 1, date: '2024-09-20', exercise: 'Przysiady', reps: '3x12', weight: '60 kg' },
    { id: 2, date: '2024-09-22', exercise: 'Wyciskanie na ławce', reps: '4x8', weight: '80 kg' },
    { id: 3, date: '2024-09-25', exercise: 'Martwy ciąg', reps: '3x10', weight: '100 kg' },
    { id: 4, date: '2024-09-27', exercise: 'Pompki', reps: '3x20', weight: 'Ciało' },
];

const ExerciseHistory = () => {
    return (
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Historia Ćwiczeń</h2>
            <ul>
                {exerciseHistory.map(item => (
                    <li key={item.id} className="mb-4 p-4 bg-white rounded shadow">
                        <p className="font-bold">{item.date}</p>
                        <p>Ćwiczenie: {item.exercise}</p>
                        <p>Powtórzenia: {item.reps}</p>
                        <p>Ciężar: {item.weight}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExerciseHistory;
