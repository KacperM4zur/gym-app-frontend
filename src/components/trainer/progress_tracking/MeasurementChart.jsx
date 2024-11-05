import React from 'react';
import { Line } from 'react-chartjs-2';

const MeasurementChart = ({ measurements }) => {
    const bodyParts = [...new Set(measurements.map(m => m.body_part))];

    const datasets = bodyParts.map((part, index) => ({
        label: part,
        data: measurements.filter(m => m.body_part === part).map(m => m.measurement),
        fill: false,
        borderColor: `hsl(${index * 60}, 70%, 50%)`,
        tension: 0.1,
    }));

    const data = {
        labels: measurements.map(m => m.date),
        datasets: datasets
    };

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <Line data={data} />
        </div>
    );
};

export default MeasurementChart;
