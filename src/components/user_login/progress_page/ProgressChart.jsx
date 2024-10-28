import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressChart = ({ data, label, filterOptions, filterBy }) => {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    const groupedData = filterOptions.map((option, index) => ({
        label: option,
        data: data
            .filter(entry => entry[filterBy] === option)
            .map(entry => ({ x: entry.date, y: entry.value })),
        borderColor: colors[index % colors.length],
        backgroundColor: `${colors[index % colors.length]}33`,
        tension: 0.4,
    }));

    const chartData = {
        datasets: groupedData
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { font: { size: 12 } },
            },
        },
        scales: {
            x: {
                type: 'category',
                title: { display: true, text: 'Date', font: { size: 14 } }
            },
            y: {
                title: { display: true, text: 'Value', font: { size: 14 } }
            }
        },
    };

    return (
        <div className="overflow-x-auto max-w-full">
            <div className="min-w-[300px] md:min-w-full p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-center mb-4">{label}</h3>
                <div style={{ height: '250px' }}>
                    <Line data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ProgressChart;
