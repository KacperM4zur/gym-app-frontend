import LayoutDefaultUser from "../components/LayoutDefaultUser.jsx";
import { useState, useEffect } from 'react';
import { ChartBarIcon, HeartIcon, StarIcon, InformationCircleIcon } from '@heroicons/react/24/outline'; // Import Hericons

const Home = () => {
    // State for slider
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            title: "Duży wybór ćwiczeń",
            description: "Znajdź idealny plan treningowy dopasowany do Twoich potrzeb i celów.",
            icon: <ChartBarIcon className="h-12 w-12 text-blue-500" /> // Ikona ćwiczeń
        },
        {
            title: "Profesjonalne porady",
            description: "Otrzymaj porady od ekspertów, aby maksymalizować efekty swoich treningów.",
            icon: <HeartIcon className="h-12 w-12 text-red-500" /> // Ikona zdrowia
        },
        {
            title: "Najlepsze wyniki",
            description: "Monitoruj swoje postępy i osiągaj lepsze wyniki z naszymi narzędziami.",
            icon: <StarIcon className="h-12 w-12 text-yellow-500" /> // Ikona wyników
        },
        {
            title: "Wsparcie społeczności",
            description: "Dołącz do naszej społeczności i korzystaj z wsparcia innych użytkowników oraz doświadczonych trenerów.",
            icon: <InformationCircleIcon className="h-12 w-12 text-purple-500" /> // Ikona społeczności
        }
    ];

    // Auto slide effect
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(slideInterval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <LayoutDefaultUser>
            {/* Banner */}
            <div className="bg-gray-700 text-white py-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Dołącz do nas!</h1>
                <p className="text-lg mb-6">Rozpocznij swoją przygodę z fitness już dziś i osiągnij swoje cele.</p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col lg:flex-row px-6 py-12 bg-gray-100">
                {/* Left Image Section */}
                <div className="lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
                    <img
                        src="/src/assets/main-page-victor-freitas.jpg"
                        alt="Main Visual"
                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Information Section */}
                <div className="lg:w-1/2 flex flex-col justify-center px-6 lg:px-12">
                    <h2 className="text-2xl font-bold mb-4">Dlaczego warto do nas dołączyć?</h2>
                    <p className="mb-4">Nasza platforma oferuje różnorodne plany treningowe, profesjonalne porady oraz narzędzia do monitorowania postępów. Z nami możesz osiągnąć swoje cele zdrowotne i fitnessowe szybciej i efektywniej.</p>
                    <p className="mb-4">Dołącz do naszej społeczności i korzystaj z wsparcia oraz motywacji innych użytkowników. Oferujemy również dostęp do ekskluzywnych treści i specjalnych ofert dla naszych subskrybentów.</p>
                    <a href="/register" className="inline-block text-center bg-green-500 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 mt-4">Zarejestruj się</a>
                </div>
            </div>

            {/* Fancy Offer Section with Alternating Images and Text */}
            <div className="px-6 py-12 bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center">Nasza oferta</h2>
                <div className="border-t border-gray-300 mb-8"></div>
                <div className="space-y-8">
                    {/* Offer Blocks */}
                    {[
                        { title: "Szeroki wybór planów treningowych", description: "Oferujemy szeroki wybór planów treningowych oraz zasobów, które pomogą Ci osiągnąć swoje cele fitnessowe. Nasze programy są dostosowane do różnych poziomów zaawansowania i preferencji." },
                        { title: "Wsparcie społeczności", description: "Nasza społeczność oferuje wsparcie i motywację. Możesz korzystać z porad od ekspertów oraz wymieniać się doświadczeniami z innymi użytkownikami, aby uzyskać najlepsze wyniki." },
                        { title: "Szeroki wybór planów treningowych", description: "Oferujemy szeroki wybór planów treningowych oraz zasobów, które pomogą Ci osiągnąć swoje cele fitnessowe. Nasze programy są dostosowane do różnych poziomów zaawansowania i preferencji." },
                        { title: "Wsparcie społeczności", description: "Nasza społeczność oferuje wsparcie i motywację. Możesz korzystać z porad od ekspertów oraz wymieniać się doświadczeniami z innymi użytkownikami, aby uzyskać najlepsze wyniki." }
                    ].map((item, index) => (
                        <div key={index} className={`flex flex-col lg:flex-row ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}>
                            <div className="lg:w-1/2 mb-4 lg:mb-0">
                                <img
                                    src="/src/assets/main-page-victor-freitas.jpg"
                                    alt={item.title}
                                    className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                />
                            </div>
                            <div className="lg:w-1/2 flex flex-col justify-center px-4 lg:px-8">
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Slider Section */}
            <div className="px-6 py-12 bg-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-center">Nasze Usługi</h2>
                <div className="relative">
                    <div className="relative flex overflow-hidden">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`flex-shrink-0 w-full transition-transform duration-500 ease-in-out ${index === currentSlide ? 'block opacity-100' : 'hidden opacity-0'}`}
                            >
                                <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105">
                                    {slide.icon}
                                    <h3 className="text-xl font-semibold mt-4 mb-2 text-center">{slide.title}</h3>
                                    <p className="text-center mb-6">{slide.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`w-4 h-4 rounded-full ${index === currentSlide ? 'bg-gray-700' : 'bg-gray-300'} transition-transform transform hover:scale-110`}
                                onClick={() => goToSlide(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutDefaultUser>
    );
}

export default Home;
