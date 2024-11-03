import React, { useState, useEffect } from 'react';

const PersonalDetails = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        birthdate: '',
        address: ''
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/customer-profile/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 404) {
                setIsEditing(true); // Aktywuj tryb edycji jeśli profil nie istnieje
            } else if (response.ok) {
                const data = await response.json();
                setProfile(data.data);
                setFormData({
                    first_name: data.data.first_name || '',
                    last_name: data.data.last_name || '',
                    phone: data.data.phone || '',
                    birthdate: data.data.birthdate || '',
                    address: data.data.address || ''
                });
            }
        } catch (error) {
            console.error('Błąd przy pobieraniu profilu:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (profile) {
            setFormData({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                phone: profile.phone || '',
                birthdate: profile.birthdate || '',
                address: profile.address || ''
            });
        }
    };

    const handleSave = async () => {
        try {
            const method = profile ? 'PUT' : 'POST';
            const endpoint = profile
                ? `http://gym-app.test/api/customer-profile/me`
                : 'http://gym-app.test/api/customer-profile/me';

            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setProfile(data.data);
                setIsEditing(false);
            } else {
                console.error('Błąd przy zapisywaniu profilu:', data);
            }
        } catch (error) {
            console.error('Błąd przy zapisywaniu profilu:', error);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Dane Osobowe</h2>
            {profile || isEditing ? (
                <div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-600">Imię</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg text-gray-800 ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-600">Nazwisko</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg text-gray-800 ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-600">Telefon</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg text-gray-800 ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-600">Data urodzenia</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg text-gray-800 ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-600">Adres</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full p-3 border rounded-lg text-gray-800 ${!isEditing ? 'bg-gray-100' : 'bg-white'}`}
                        />
                    </div>

                    {isEditing ? (
                        <div className="flex justify-between">
                            <button
                                onClick={handleSave}
                                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 mr-2"
                            >
                                Zapisz
                            </button>
                            <button
                                onClick={handleCancel}
                                className="w-full py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all duration-200 ml-2"
                            >
                                Anuluj
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <button
                                onClick={handleEdit}
                                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 mt-4"
                            >
                                Edytuj Profil
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center text-gray-600">Ładowanie profilu...</p>
            )}
        </div>
    );
};

export default PersonalDetails;
