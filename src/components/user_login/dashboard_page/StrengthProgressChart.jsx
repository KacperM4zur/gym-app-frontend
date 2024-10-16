import React from 'react';
import { Line } from 'react-chartjs-2';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

const StrengthProgressChart = ({ isStrengthDetailsVisible, strengthData, toggleDetails }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Postęp siłowy</h2>
                <button onClick={toggleDetails}>
                    {isStrengthDetailsVisible ? (
                        <ChevronUpIcon className="w-6 h-6 text-gray-500" />
                    ) : (
                        <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                    )}
                </button>
            </div>
            {isStrengthDetailsVisible && <Line data={strengthData} />}
        </div>
    );
};

export default StrengthProgressChart;
