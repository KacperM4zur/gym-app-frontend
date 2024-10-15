import React from 'react';

const AdviceSection = () => {
    const adviceList = [
        { id: 1, title: 'Trening na plecy', content: 'Pamiętaj, aby podczas martwego ciągu utrzymać proste plecy.' },
        { id: 2, title: 'Dieta białkowa', content: 'Spożywaj białko po każdym treningu, aby wspomóc regenerację mięśni.' },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Porady</h3>
            {adviceList.map((advice) => (
                <div key={advice.id} className="mb-4">
                    <h4 className="text-lg font-semibold">{advice.title}</h4>
                    <p>{advice.content}</p>
                </div>
            ))}
        </div>
    );
};

export default AdviceSection;
