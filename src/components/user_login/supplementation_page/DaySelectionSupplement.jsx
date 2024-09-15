import React from 'react';

const DaySelectionSupplement = ({ daysOfWeek, selectedDay, selectDay }) => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-4">Wybierz dzień</h2>
            <div className="flex flex-col gap-4 items-center">
                {daysOfWeek.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => selectDay(day)}
                        className={`${
                            selectedDay === day ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'
                        } w-full py-3 px-4 rounded-md font-semibold text-lg transition-all transform hover:scale-105`}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DaySelectionSupplement;
