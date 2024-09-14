import React, { useState } from 'react';
import PostList from "../../components/user_login/blog_page/PostList.jsx";
import PostModal from "../../components/user_login/blog_page/PostModal.jsx";
import CreatePost from "../../components/user_login/blog_page/CreatePost.jsx";

const Blog = () => {
    const currentUser = 'Użytkownik'; // Zakładamy, że to nazwa zalogowanego użytkownika

    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Trening na masę',
            summary: 'Jak skutecznie budować masę mięśniową?',
            content: 'Pełna treść artykułu o treningu na masę...',
            date: '12-09-2024',
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // URL obrazu z internetu
            comments: [
                { id: 1, author: 'Jan', content: 'Świetny artykuł! Bardzo mi pomógł.' },
                { id: 2, author: 'Anna', content: 'Dzięki za cenne wskazówki!' }
            ],
            author: 'Jan',
        },
        {
            id: 2,
            title: 'Dieta siłowa',
            summary: 'Przykładowa dieta na masę',
            content: 'Pełna treść artykułu o diecie na masę...',
            date: '11-09-2024',
            image: 'https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // URL obrazu z internetu
            comments: [],
            author: 'Użytkownik',
        },
        {
            id: 3,
            title: 'Dieta siłowa',
            summary: 'Przykładowa dieta na masę',
            content: 'Pełna treść artykułu o diecie na masę...',
            date: '11-09-2024',
            image: 'https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // URL obrazu z internetu
            comments: [],
            author: 'Użytkownik',
        },
        {
            id: 4,
            title: 'Dieta siłowa',
            summary: 'Przykładowa dieta na masę',
            content: 'Pełna treść artykułu o diecie na masę...',
            date: '11-09-2024',
            image: 'https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // URL obrazu z internetu
            comments: [],
            author: 'Użytkownik',
        },
        {
            id: 5,
            title: 'Dieta siłowa',
            summary: 'Przykładowa dieta na masę',
            content: 'Pełna treść artykułu o diecie na masę...',
            date: '11-09-2024',
            image: 'https://images.unsplash.com/photo-1434754205268-ad3b5f549b11?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // URL obrazu z internetu
            comments: [],
            author: 'Użytkownik',
        },
        {
            id: 6,
            title: 'Trening na masę',
            summary: 'Jak skutecznie budować masę mięśniową?',
            content: 'Pełna treść artykułu o treningu na masę...',
            date: '12-09-2024',
            image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // URL obrazu z internetu
            comments: [
                { id: 1, author: 'Jan', content: 'Świetny artykuł! Bardzo mi pomógł.' },
                { id: 2, author: 'Anna', content: 'Dzięki za cenne wskazówki!' }
            ],
            author: 'Jan',
        },
    ]);

    const [showCreatePost, setShowCreatePost] = useState(false); // Kontrola widoczności formularza
    const [selectedPost, setSelectedPost] = useState(null); // Dla modala

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]); // Dodawanie nowego posta do listy
        setShowCreatePost(false); // Zamknięcie formularza po dodaniu posta
    };

    const openPostModal = (post) => {
        setSelectedPost(post);
    };

    const closePostModal = () => {
        setSelectedPost(null);
    };

    return (
        <div className="bg-cover bg-center min-h-screen">
            <div className="container mx-auto p-4">
                {/* Blog Banner */}
                <div className="bg-gray-700 text-white py-6 text-center mb-6 rounded-lg shadow-lg">
                    <h1 className="text-5xl font-bold">Blog Siłowy</h1>
                    <p className="mt-2 text-lg">Twoje źródło informacji o treningu, diecie i suplementacji</p>
                </div>

                {/* Przycisk do dodania nowego posta na pełną szerokość */}
                {!showCreatePost && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowCreatePost(true)}
                            className="bg-yellow-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 transition duration-300 w-full"
                        >
                            Dodaj Nowy Post
                        </button>
                    </div>
                )}

                {/* Formularz do tworzenia nowego posta */}
                {showCreatePost && (
                    <CreatePost addPost={addPost} closeForm={() => setShowCreatePost(false)} currentUser={currentUser} />
                )}

                {/* Lista postów */}
                <PostList posts={posts} openPostModal={openPostModal} />

                {/* Modal z pełnym postem */}
                {selectedPost && (
                    <PostModal post={selectedPost} closePostModal={closePostModal} />
                )}
            </div>
        </div>
    );
};

export default Blog;
