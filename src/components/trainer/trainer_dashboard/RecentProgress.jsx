import React from 'react';

const RecentProgress = ({ progressData }) => {
    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Ostatnie Postępy Klientów</h2>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <ul>
                    {progressData.map((progress, index) => (
                        <li key={index} className="flex justify-between py-2">
                            <span>{progress.client}</span>
                            <span>Waga: {progress.weight}kg, Wzrost: {progress.height}cm</span>
                            <span>Ostatnia aktualizacja: {progress.date}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecentProgress;
