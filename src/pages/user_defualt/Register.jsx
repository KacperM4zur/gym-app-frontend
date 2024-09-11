import LayoutDefaultUser from "../../components/user_defualt/LayoutDefaultUser.jsx";
import { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Hasła się nie zgadzają.");
            return;
        }

        try {
            const response = await fetch('http://gym-app.test/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    setError("Rejestracja nie powiodła się. Użytkownik o podanym emailu lub nazwie użytkownika już istnieje.");
                } else {
                    setError("Wystąpił problem podczas rejestracji. Spróbuj ponownie później.");
                }
                return;
            }

            setSuccess("Rejestracja zakończona sukcesem! Możesz teraz się zalogować.");
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError("Wystąpił problem z połączeniem. Spróbuj ponownie później.");
        }
    };

    return (
        <LayoutDefaultUser>
            <div className="flex flex-col lg:flex-row min-h-full">
                {/* Left Image Section */}
                <div className="lg:w-1/2 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/register-edgar-chaparro.jpg')" }}>
                    <div className="bg-black bg-opacity-65 p-8 m-4 rounded-lg text-center">
                        <h2 className="text-4xl text-white font-bold mb-4">Rozpocznij swoją podróż</h2>
                        <p className="text-lg text-gray-200">Zarejestruj się już dziś i zbuduj najlepszą wersję siebie. Każdy dzień to nowa szansa na sukces!</p>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 bg-gray-100 flex-grow">
                    <h2 className="text-3xl font-bold mb-6 text-green-600">Zarejestruj się</h2>
                    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        {success && <p className="text-green-600 mb-4">{success}</p>}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">Nazwa użytkownika</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Hasło</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">Potwierdź hasło</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Zarejestruj się
                        </button>
                    </form>
                    <p className="mt-6 text-gray-600">Masz już konto? <a href="/user_defualt/Login" className="text-green-600 font-semibold hover:underline">Zaloguj się tutaj</a>.</p>
                </div>
            </div>
        </LayoutDefaultUser>
    );
};

export default Register;
