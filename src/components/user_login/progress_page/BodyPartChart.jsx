import React from 'react';
import { Line } from 'react-chartjs-2';

const BodyPartChart = ({ data }) => {
    const chartData = {
        labels: data.map(entry => entry.date),
        datasets: data.reduce((acc, entry) => {
            const bodyPartName = entry.body_part.name;
            const existingDataset = acc.find(dataset => dataset.label === bodyPartName);

            if (existingDataset) {
                existingDataset.data.push(entry.measurement);
            } else {
                acc.push({
                    label: bodyPartName,
                    data: [entry.measurement],
                    fill: false,
                    borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // Random color for each body part
                    tension: 0.1
                });
            }
            return acc;
        }, [])
    };

    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Pomiar (cm)', // Change this to 'Measurement (cm)' if used for body measurements
                },
                ticks: {
                    callback: (value) => `${value} cm` // Adds "cm" next to each tick
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
        <div className="mt-8">
            <h3 className="text-lg font-bold">Historia Pomiarów Ciała</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default BodyPartChart;
