import React from 'react';
import { Line } from 'react-chartjs-2';

const WeightChart = ({ weights }) => {
    const data = {
        labels: weights.map(w => w.date),
        datasets: [
            {
                label: 'Waga',
                data: weights.map(w => w.weight),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <Line data={data} />
        </div>
    );
};

export default WeightChart;
