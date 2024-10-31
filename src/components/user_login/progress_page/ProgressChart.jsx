import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ProgressChart = ({ data, label }) => {
    const chartData = {
        labels: data.map(entry => entry.date),
        datasets: [
            {
                label: label,
                data: data.map(entry => entry.weight),
                fill: false,
                borderColor: 'blue',
                backgroundColor: 'blue',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Waga (kg)', // Change this to 'Measurement (cm)' if used for body measurements
                },
                ticks: {
                    callback: (value) => `${value} kg` // Adds "cm" next to each tick
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Data'
                }
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-bold">Historia wagi</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ProgressChart;
