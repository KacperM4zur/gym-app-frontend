import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progressData = [
    { date: '2024-09-01', weight: 50 },
    { date: '2024-09-10', weight: 55 },
    { date: '2024-09-15', weight: 60 },
    { date: '2024-09-20', weight: 65 },
    { date: '2024-09-25', weight: 70 },
];

const ProgressChart = () => {
    return (
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Wykres Postępów (Przysiady)</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="weight" />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ProgressChart;
