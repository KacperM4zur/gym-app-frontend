import { useState } from 'react';
import LayoutDefaultUser from "../components/LayoutDefaultUser.jsx";

const faqData = [
    {
        question: "Jak mogę zarejestrować konto?",
        answer: "Aby zarejestrować konto, kliknij na przycisk 'Rejestracja' w menu i wypełnij formularz z danymi użytkownika."
    },
    {
        question: "Jak mogę zmienić swoje hasło?",
        answer: "Po zalogowaniu się, przejdź do ustawień konta, gdzie znajdziesz opcję zmiany hasła."
    },
    {
        question: "Czy mogę usunąć swoje konto?",
        answer: "Tak, możesz usunąć swoje konto, kontaktując się z obsługą klienta. Proces ten może zająć do 7 dni roboczych."
    },
    {
        question: "Jak mogę skontaktować się z pomocą techniczną?",
        answer: "Możesz skontaktować się z nami poprzez formularz kontaktowy dostępny w zakładce 'Kontakt' w menu."
    },
    {
        question: "Czy moje dane są bezpieczne?",
        answer: "Tak, dbamy o bezpieczeństwo Twoich danych. Są one przechowywane zgodnie z najnowszymi standardami bezpieczeństwa."
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <LayoutDefaultUser>
            <div className="flex-grow min-h-full min-w-full bg-gray-50">
                <div className="bg-gray-700 mb-2 flex items-center justify-center">
                    <img
                        src="/src/assets/faq.png"
                        alt="faq-image"
                        className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/6"
                    />
                    {/* png image from pngtree.com */}
                </div>

                <ul className="max-w-screen mx-auto space-y-4 p-6">
                    {faqData.map((item, index) => (
                        <li key={index} className="border-b border-gray-300 pb-4">
                            <button
                                className="w-full text-left text-xl font-semibold flex justify-between items-center"
                                onClick={() => toggleAnswer(index)}
                            >
                                <span>{item.question}</span>
                                <span>{openIndex === index ? '-' : '+'}</span>
                            </button>
                            {openIndex === index && (
                                <p className="mt-2 text-lg text-gray-700">{item.answer}</p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </LayoutDefaultUser>
    );
};

export default Faq;
