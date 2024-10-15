import React, { useState, useEffect } from 'react';

const BodyMeasurementsForm = ({ onAddMeasurement, measurementToEdit }) => {
    const [formData, setFormData] = useState({ type: '', value: '', date: '' });

    useEffect(() => {
        if (measurementToEdit) {
            setFormData(measurementToEdit);
        }
    }, [measurementToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMeasurement(formData);
        setFormData({ type: '', value: '', date: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Dodaj Pomiary Ciała</h2>
            <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-semibold">Rodzaj Pomiaru</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                >
                    <option value="">Wybierz rodzaj pomiaru</option>
                    <option value="Waga">Waga</option>
                    <option value="Wzrost">Wzrost</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Talia">Talia</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="value" className="block text-gray-700 font-semibold">Wartość (cm lub kg)</label>
                <input
                    type="number"
                    id="value"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-semibold">Data</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    {measurementToEdit ? 'Zaktualizuj Pomiary' : 'Dodaj Pomiary'}
                </button>
            </div>
        </form>
    );
};

export default BodyMeasurementsForm;
