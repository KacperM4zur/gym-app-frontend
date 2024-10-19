import React from 'react';
import { Line } from 'react-chartjs-2';
import '../../chartSetup.js';

const ProgressChart = ({ data, label }) => {
    const chartData = {
        labels: data.map(entry => entry.date),
        datasets: [
            {
                label: 'Postęp',
                data: data.map(entry => entry.value),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{label}</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ProgressChart;
