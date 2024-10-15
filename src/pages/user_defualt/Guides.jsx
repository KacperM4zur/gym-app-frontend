import React, { useState } from 'react';
import CategoryCard from "../../components/user_defualt/guides_page/CategoryCard.jsx";
import ItemList from "../../components/user_defualt/guides_page/ItemList.jsx";
import ItemsDetailsModal from "../../components/user_defualt/guides_page/ItemsDetailsModal.jsx";
import LayoutDefaultUser from "../../components/user_defualt/LayoutDefaultUser.jsx";

const Guides = () => {
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
    const [selectedSection, setSelectedSection] = useState('Ćwiczenia');
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const exerciseCategories = ['Wszystkie', 'Klatka piersiowa', 'Plecy', 'Nogi', 'Ramiona', 'Barki', 'Brzuch'];
    const supplementCategories = ['Wszystkie', 'Białka', 'Witaminy', 'Kreatyna', 'Aminokwasy', 'Mineraly'];

    const exercises = [
        {
            name: 'Wyciskanie sztangi',
            part: 'Klatka piersiowa',
            description: 'Wyciskanie sztangi to podstawowe ćwiczenie na klatkę piersiową.',
            technique: 'Połóż się na ławce, sztanga powinna znajdować się nad twoimi oczami. Powoli opuszczaj ją na klatkę piersiową, a następnie wypychaj w górę.',
            advantages: 'Zwiększa siłę klatki piersiowej, tricepsów i barków.',
            disadvantages: 'Może powodować kontuzje ramion, jeśli nie wykonane poprawnie.',
        },
        {
            name: 'Martwy ciąg',
            part: 'Plecy',
            description: 'Martwy ciąg to jedno z najskuteczniejszych ćwiczeń na mięśnie pleców i nóg.',
            technique: 'Stój z nogami na szerokości barków, trzymając sztangę. Utrzymuj proste plecy, pochyl się i podnieś sztangę, wyprostowując nogi.',
            advantages: 'Wzmacnia plecy, nogi, pośladki oraz poprawia stabilność.',
            disadvantages: 'Nieprawidłowa technika może prowadzić do kontuzji pleców.',
        },
        // Inne ćwiczenia...
    ];

    const supplements = [
        {
            name: 'Białko serwatkowe',
            category: 'Białka',
            description: 'Białko serwatkowe wspomaga regenerację mięśni.',
            benefits: 'Przyspiesza regenerację mięśni po treningu, dostarcza wysokiej jakości białko.',
            disadvantages: 'Nieodpowiednie dla osób nietolerujących laktozy.',
        },
        {
            name: 'Witamina D',
            category: 'Witaminy',
            description: 'Witamina D wspomaga układ odpornościowy i zdrowie kości.',
            benefits: 'Wzmacnia układ odpornościowy, poprawia zdrowie kości.',
            disadvantages: 'Może prowadzić do nadmiernego poziomu wapnia we krwi przy zbyt dużych dawkach.',
        },
        // Inne suplementy...
    ];

    const filteredItems = selectedCategory === 'Wszystkie'
        ? (selectedSection === 'Ćwiczenia' ? exercises : supplements)
        : (selectedSection === 'Ćwiczenia'
            ? exercises.filter(ex => ex.part === selectedCategory)
            : supplements.filter(sup => sup.category === selectedCategory));

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSectionChange = (section) => {
        setSelectedCategory('Wszystkie');
        setSelectedSection(section);
    };

    const openItemDetails = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    return (
        <LayoutDefaultUser>
            <div className="bg-gray-700 text-white py-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Poradniki</h1>
                <p className="text-lg mb-6">Rozpocznij swoją przygodę z fitness już dziś i osiągnij swoje cele.</p>
            </div>
            <div className="container mx-auto p-6">
                {/*<h1 className="text-5xl font-bold mb-10 text-center">Poradniki</h1>*/}

                {/* Przełącznik między Ćwiczeniami a Suplementacją */}
                <div className="flex justify-center mb-10">
                    <button
                        onClick={() => handleSectionChange('Ćwiczenia')}
                        className={`transition-transform transform hover:scale-110 px-8 py-3 mx-4 rounded-full shadow-md text-xl font-semibold ${selectedSection === 'Ćwiczenia' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Ćwiczenia
                    </button>
                    <button
                        onClick={() => handleSectionChange('Suplementacja')}
                        className={`transition-transform transform hover:scale-110 px-8 py-3 mx-4 rounded-full shadow-md text-xl font-semibold ${selectedSection === 'Suplementacja' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Suplementacja
                    </button>
                </div>

                {/* Kategorie */}
                <div className="flex justify-center flex-wrap gap-6 mb-10">
                    {(selectedSection === 'Ćwiczenia' ? exerciseCategories : supplementCategories).map((category, index) => (
                        <CategoryCard
                            key={index}
                            category={category}
                            isSelected={selectedCategory === category}
                            onClick={handleCategoryClick}
                        />
                    ))}
                </div>

                {/* Lista elementów */}
                <ItemList items={filteredItems} onItemSelect={openItemDetails} />

                {/* Modal z detalami */}
                {showModal && selectedItem && (
                    <ItemsDetailsModal item={selectedItem} closeModal={closeModal} />
                )}
            </div>
        </LayoutDefaultUser>
    );
};

export default Guides;
