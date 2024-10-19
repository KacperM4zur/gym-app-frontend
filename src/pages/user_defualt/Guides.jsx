import React, { useState, useEffect } from 'react';
import CategoryCard from "../../components/user_defualt/guides_page/CategoryCard.jsx";
import ItemList from "../../components/user_defualt/guides_page/ItemList.jsx";
import ItemsDetailsModal from "../../components/user_defualt/guides_page/ItemsDetailsModal.jsx";
import LayoutDefaultUser from "../../components/user_defualt/LayoutDefaultUser.jsx";

const Guides = () => {
    const [selectedSection, setSelectedSection] = useState('Ćwiczenia');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [supplements, setSupplements] = useState([]);
    const [exerciseCategories, setExerciseCategories] = useState([]);
    const [supplementCategories, setSupplementCategories] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [categoryDescription, setCategoryDescription] = useState('');

    // Fetch data from API when the component loads
    useEffect(() => {
        if (selectedSection === 'Ćwiczenia') {
            fetch('http://gym-app.test/api/exercises')
                .then(response => response.json())
                .then(data => {
                    setExercises(data);
                });

            fetch('http://gym-app.test/api/exercises-group')
                .then(response => response.json())
                .then(data => {
                    setExerciseCategories(data);
                });
        } else if (selectedSection === 'Suplementacja') {
            fetch('http://gym-app.test/api/supplements')
                .then(response => response.json())
                .then(data => {
                    setSupplements(data);
                });

            fetch('http://gym-app.test/api/supplements-group')
                .then(response => response.json())
                .then(data => {
                    setSupplementCategories(data);
                });
        }
    }, [selectedSection]);

    const handleSectionChange = (section) => {
        setSelectedSection(section);
        setSelectedCategory(null);
        setFilteredItems([]);
        setCategoryDescription('');
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        if (selectedSection === 'Ćwiczenia') {
            fetch(`http://gym-app.test/api/exercises-group`)
                .then(response => response.json())
                .then(data => {
                    const foundCategory = data.find((cat) => cat.id === category.id);
                    if (foundCategory) {
                        setCategoryDescription(foundCategory.description);
                    }
                    setFilteredItems(exercises.filter(item => item.exercises_group_id === category.id));
                });
        } else if (selectedSection === 'Suplementacja') {
            fetch(`http://gym-app.test/api/supplements-group`)
                .then(response => response.json())
                .then(data => {
                    const foundCategory = data.find((cat) => cat.id === category.id);
                    if (foundCategory) {
                        setCategoryDescription(foundCategory.description);
                    }
                    setFilteredItems(supplements.filter(item => item.supplements_group_id === category.id));
                });
        }
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
            <div className="bg-gray-700 text-white py-16 text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Poradniki</h1>
                <p className="text-xl">Rozpocznij swoją przygodę z fitness już dziś i osiągnij swoje cele.</p>
            </div>

            <div className="flex justify-center mb-12 space-x-6">
                <button
                    onClick={() => handleSectionChange('Ćwiczenia')}
                    className={`transition-transform transform hover:scale-105 px-10 py-3 rounded-full shadow-lg text-xl font-semibold ${selectedSection === 'Ćwiczenia' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Ćwiczenia
                </button>
                <button
                    onClick={() => handleSectionChange('Suplementacja')}
                    className={`transition-transform transform hover:scale-105 px-10 py-3 rounded-full shadow-lg text-xl font-semibold ${selectedSection === 'Suplementacja' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Suplementacja
                </button>
            </div>

            <div className="flex justify-center flex-wrap gap-6 mb-10">
                {(selectedSection === 'Ćwiczenia' ? exerciseCategories : supplementCategories).map((category, index) => (
                    <CategoryCard
                        key={index}
                        category={category.name}
                        isSelected={selectedCategory?.id === category.id}
                        onClick={() => handleCategoryClick(category)}
                    />
                ))}
            </div>

            {categoryDescription && (
                <div className="mb-12 text-center text-xl text-gray-600 max-w-3xl mx-auto">
                    {categoryDescription}
                </div>
            )}

            <div className="max-w-5xl mx-auto mb-6 px-4">
                <ItemList items={filteredItems} onItemSelect={openItemDetails} />
            </div>

            {showModal && selectedItem && (
                <ItemsDetailsModal item={selectedItem} closeModal={closeModal} />
            )}
        </LayoutDefaultUser>
    );
};

export default Guides;


