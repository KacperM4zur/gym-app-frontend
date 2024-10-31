import React from 'react';
import { Line } from 'react-chartjs-2';

const MaxLiftChart = ({ data }) => {
    const chartData = {
        labels: data.map(entry => entry.date),
        datasets: data.reduce((acc, entry) => {
            const exerciseName = entry.exercise.name;
            const existingDataset = acc.find(dataset => dataset.label === exerciseName);

            if (existingDataset) {
                existingDataset.data.push(entry.weight);
            } else {
                acc.push({
                    label: exerciseName,
                    data: [entry.weight],
                    fill: false,
                    borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), // losowy kolor
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
                    text: 'Ciężar (kg)', // Change this to 'Measurement (cm)' if used for body measurements
                },
                ticks: {
                    callback: (value) => `${value} kg` // Adds "cm" next to each tick
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Data'
                },
            }
        }
    };

    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold">Historia Maksymalnych Obciążeń</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default MaxLiftChart;
