import React from 'react';
import { Line } from 'react-chartjs-2';

const MaxLiftChart = ({ maxLifts }) => {
    const exercises = [...new Set(maxLifts.map(m => m.exercise))];

    const datasets = exercises.map((exercise, index) => ({
        label: exercise,
        data: maxLifts.filter(m => m.exercise === exercise).map(m => m.weight),
        fill: false,
        borderColor: `hsl(${index * 60 + 180}, 70%, 50%)`,
        tension: 0.1,
    }));

    const data = {
        labels: maxLifts.map(m => m.date),
        datasets: datasets
    };

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <Line data={data} />
        </div>
    );
};

export default MaxLiftChart;
