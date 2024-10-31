import React, { useEffect, useState } from 'react';

const AdviceSection = () => {
    const [advices, setAdvices] = useState([]);

    useEffect(() => {
        const fetchAdvices = async () => {
            try {
                const response = await fetch('http://gym-app.test/api/advices', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (data.status === 200) {
                    setAdvices(data.data);
                } else {
                    console.error("Błąd pobierania porad:", data.message);
                }
            } catch (error) {
                console.error("Błąd pobierania porad:", error);
            }
        };

        fetchAdvices();
    }, []);

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Twoje Porady</h2>
            {advices.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                    {advices.map((advice) => (
                        <li key={advice.id} className="text-gray-700">
                            {advice.content}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Brak porad do wyświetlenia.</p>
            )}
        </div>
    );
};

export default AdviceSection;
