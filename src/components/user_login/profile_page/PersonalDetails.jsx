import React, { useState } from 'react';

const PersonalDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [personalData, setPersonalData] = useState({
        name: 'Jan Kowalski',
        email: 'jan.kowalski@example.com',
        age: 30,
        height: 180,
        weight: 75,
        profileImage: 'https://via.placeholder.com/150'
    });
    const [newImage, setNewImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(URL.createObjectURL(file));
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const saveData = () => {
        toggleEdit();
        if (newImage) {
            setPersonalData((prevData) => ({
                ...prevData,
                profileImage: newImage
            }));
        }
        console.log('Zapisano dane:', personalData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md relative">
            {/* Przycisk Edytuj w prawym górnym rogu */}
            {!isEditing && (
                <button
                    onClick={toggleEdit}
                    className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    Edytuj
                </button>
            )}

            <div className="flex items-center mb-6">
                <img
                    src={newImage || personalData.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mr-4"
                />
                <div>
                    <h2 className="text-2xl font-bold">{personalData.name}</h2>
                    <p className="text-gray-600">{personalData.email}</p>
                </div>
            </div>

            {isEditing ? (
                <div>
                    <div className="mb-4">
                        <label className="block font-semibold">Imię</label>
                        <input
                            type="text"
                            name="name"
                            value={personalData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={personalData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Wiek</label>
                        <input
                            type="number"
                            name="age"
                            value={personalData.age}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Wzrost (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={personalData.height}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Waga (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={personalData.weight}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold">Zdjęcie profilowe</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <button onClick={saveData} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Zapisz</button>
                </div>
            ) : (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Podstawowe dane</h3>
                    <ul className="list-disc list-inside">
                        <li>Wiek: {personalData.age} lat</li>
                        <li>Wzrost: {personalData.height} cm</li>
                        <li>Waga: {personalData.weight} kg</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PersonalDetails;
