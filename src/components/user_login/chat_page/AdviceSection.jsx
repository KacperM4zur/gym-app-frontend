import React from 'react';

const AdviceSection = ({ advices }) => {
    return (
        <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4">Porady Trenerów</h3>
            {advices.length > 0 ? (
                advices.map(advice => (
                    <div key={advice.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-bold">{advice.title}</h4>
                        <p>{advice.content}</p>
                        <p className="text-sm text-gray-500">Trener: {advice.author}</p>
                    </div>
                ))
            ) : (
                <p>Brak porad.</p>
            )}
        </div>
    );
};

export default AdviceSection;
