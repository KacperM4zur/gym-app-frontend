import LayoutDefaultUser from "../../components/user_defualt/LayoutDefaultUser.jsx";
import {
    BoltIcon,
    ChartBarIcon,
    ClipboardDocumentListIcon,
    HeartIcon,
    LockClosedIcon, QuestionMarkCircleIcon,
    ShieldCheckIcon,
    UsersIcon
} from "@heroicons/react/16/solid/index.js";
import React from "react";


const About = () => {
    const cards = [
        {
            title: "Bezpieczeństwo",
            description: "Nasza aplikacja zapewnia najwyższy poziom bezpieczeństwa dla Twoich danych, dzięki zaawansowanym technologiom szyfrowania.",
            icon: <ShieldCheckIcon className="h-12 w-12 text-blue-500" /> // Ikona bezpieczeństwa
        },
        {
            title: "Prywatność",
            description: "Twoja prywatność jest dla nas priorytetem. Zawsze możesz zarządzać swoimi danymi i kontrolować, co jest udostępniane.",
            icon: <LockClosedIcon className="h-12 w-12 text-yellow-500" /> // Ikona prywatności
        },
        {
            title: "Różnorodne ćwiczenia",
            description: "Oferujemy szeroki wybór planów treningowych dostosowanych do różnych celów i poziomów zaawansowania.",
            icon: <ChartBarIcon className="h-12 w-12 text-green-500" /> // Ikona treningu
        },
        {
            title: "Wsparcie społeczności",
            description: "Dołącz do naszej społeczności i skorzystaj z wsparcia innych użytkowników oraz doświadczonych trenerów.",
            icon: <UsersIcon className="h-12 w-12 text-purple-500" /> // Ikona społeczności
        },
        {
            title: "Zdrowie i Odżywianie",
            description: "Otrzymaj porady dotyczące zdrowego stylu życia, zbilansowanej diety oraz suplementacji wspierającej Twoje cele treningowe.",
            icon: <HeartIcon className="h-12 w-12 text-red-500" /> // Ikona zdrowia
        },
        {
            title: "Monitorowanie Progresu",
            description: "Śledź swoje postępy dzięki narzędziom do monitorowania wyników i osiągnięć, które pomogą Ci osiągnąć zamierzone cele.",
            icon: <ClipboardDocumentListIcon className="h-12 w-12 text-orange-500" /> // Ikona monitorowania
        },
        {
            title: "Treningi Wysokiej Intensywności",
            description: "Sprawdź naszą sekcję treningów HIIT, które pozwolą Ci spalić kalorie i poprawić kondycję w krótkim czasie.",
            icon: <BoltIcon className="h-12 w-12 text-yellow-500" /> // Ikona treningów HIIT
        },
        {
            title: "FAQ",
            description: "Odpowiedzi na najczęściej zadawane pytania dotyczące naszej aplikacji. Sprawdź, aby uzyskać więcej informacji na temat naszych usług.",
            icon: <QuestionMarkCircleIcon className="h-12 w-12 text-gray-500" /> // Ikona FAQ
        }
    ];

    return (
        <LayoutDefaultUser>
            <div>
                <div className="bg-gray-700 text-white py-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">Informacje o aplikacji</h1>
                    <p className="text-lg mb-6">Nasza aplikacja jest zaprojektowana, aby pomóc Ci w osiągnięciu Twoich celów treningowych i zdrowotnych.
                        Poniżej znajdziesz kluczowe informacje na temat naszej platformy.</p>
                </div>
                <div className="flex-grow min-h-full bg-gradient-to-r from-gray-50 to-gray-100 p-6">

                    {/* Sekcja z kartami */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {cards.map((card, index) => (
                            <div key={index} className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center mb-4">
                                    {card.icon}
                                    <h2 className="text-3xl font-bold text-gray-800 ml-4">{card.title}</h2>
                                </div>
                                <p className="text-gray-700">{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </LayoutDefaultUser>
    );
};

export default About;
