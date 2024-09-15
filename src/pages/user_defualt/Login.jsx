import LayoutDefaultUser from "../../components/user_defualt/LayoutDefaultUser.jsx";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://gym-app.test/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.status === 200) {
                // Zapisz token i role_id w localStorage
                localStorage.setItem('token', data.customer.api_token);
                localStorage.setItem('role_id', data.customer.role_id);  // Zapisz role_id

                // Przekieruj na odpowiednią stronę na podstawie roli
                if (data.customer.role_id === 4) {
                    navigate('/trainer-dashboard'); // Dla trenera
                } else {
                    navigate('/dashboard'); // Dla zwykłego użytkownika
                }
            } else {
                setError(data.message || "Nieprawidłowy email lub hasło.");
            }
        } catch (err) {
            setError("Wystąpił problem z połączeniem. Spróbuj ponownie później.");
        }
    };

    return (
        <LayoutDefaultUser>
            <div className="flex flex-col lg:flex-row min-h-full">
                {/* Left Image Section */}
                <div className="lg:w-1/2 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/src/assets/login-john-arano.jpg')" }}>
                    <div className="bg-black bg-opacity-65 p-8 m-4 rounded-lg text-center">
                        <h2 className="text-4xl text-white font-bold mb-4">Witaj ponownie!</h2>
                        <p className="text-lg text-gray-200">Zaloguj się i kontynuuj swoją podróż ku lepszej wersji siebie. Każdy trening to krok bliżej do celu!</p>
                    </div>
                </div>

                {/* Right Form Section */}
                <div className="lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12 bg-gray-100 flex-grow">
                    <h2 className="text-3xl font-bold mb-6 text-green-600">Zaloguj się</h2>
                    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
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
                        <button
                            type="submit"
                            className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Zaloguj się
                        </button>
                    </form>
                    <p className="mt-6 text-gray-600">Nie masz konta? <a href="/user_defualt/Register" className="text-green-600 font-semibold hover:underline">Zarejestruj się tutaj</a>.</p>
                </div>
            </div>
        </LayoutDefaultUser>
    );
};

export default Login;
