import React, { useState } from 'react';
import PostForm from "../../components/trainer/eductional_materials/PostForm.jsx";
import PostList from "../../components/trainer/eductional_materials/PostList.jsx";

const EducationalMaterials = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Jak trenować efektywnie?',
            content: 'Porady dotyczące efektywnego treningu siłowego.',
            date: '2024-10-14',
        },
        {
            id: 2,
            title: 'Dieta przedtreningowa',
            content: 'Jakie produkty spożywać przed treningiem, aby osiągnąć najlepsze wyniki?',
            date: '2024-09-25',
        },
    ]);

    const addPost = (newPost) => {
        setPosts([...posts, { ...newPost, id: posts.length + 1, date: new Date().toISOString().split('T')[0] }]);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Materiały Edukacyjne</h1>
            {/* Formularz do tworzenia postów */}
            <PostForm addPost={addPost} />
            {/* Lista postów */}
            <PostList posts={posts} />
        </div>
    );
};

export default EducationalMaterials;
