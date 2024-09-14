import React from 'react';

const DaySelectionTraining = ({ daysOfWeek, selectedDay, selectDay }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Wybierz dzień tygodnia</h2>
            <div className="space-y-4">
                {daysOfWeek.map((day) => (
                    <button
                        key={day}
                        onClick={() => selectDay(day)}
                        className={`w-full text-left bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg transition-transform transform hover:scale-105 ${
                            selectedDay === day ? 'bg-blue-500' : ''
                        }`}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DaySelectionTraining;
