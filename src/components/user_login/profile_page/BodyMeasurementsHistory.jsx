import React from 'react';

const BodyMeasurementsHistory = ({ measurements, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Historia Pomiary Ciała</h2>
            {measurements.length === 0 ? (
                <p className="text-gray-500">Brak zapisanych pomiarów.</p>
            ) : (
                measurements.map((measurement, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4 flex justify-between items-center">
                        <div>
                            <p className="text-lg font-bold mb-2">{measurement.type}</p>
                            <p className="text-sm">Wartość: {measurement.value} cm / kg</p>
                            <p className="text-sm">Data: {measurement.date}</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit(measurement)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                            >
                                Edytuj
                            </button>
                            <button
                                onClick={() => onDelete(measurement)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                Usuń
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default BodyMeasurementsHistory;
