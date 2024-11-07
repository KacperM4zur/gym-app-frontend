import React, { useState } from 'react';

const HydrationReminder = () => {
    const [glasses, setGlasses] = useState(0);

    const incrementGlasses = () => {
        if (glasses < 8) {
            setGlasses(glasses + 1);
        }
    };

    return (
        <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Przypomnienie o nawodnieniu</h2>
            <p className="text-lg mb-2">Wypiłeś już {glasses} z 8 szklanek wody dzisiaj!</p>
            <button
                onClick={incrementGlasses}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
                Dodaj szklankę
            </button>
        </div>
    );
};

export default HydrationReminder;
