import React, { useState, useEffect } from 'react';
import CreatePost from "../../components/user_login/blog_page/CreatePost.jsx";
import PostList from "../../components/user_login/blog_page/PostList.jsx";
import PostDetail from "../../components/user_login/blog_page/PostDetail.jsx";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        fetchAuthenticatedUser();
        fetchPosts();
    }, []);

    const fetchAuthenticatedUser = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/me', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            // console.log("Fetched user ID and name from /me endpoint:", data.id, data.name);
            setUserId(data.id);
            setUserName(data.name); // Assuming API returns the user's name
        } catch (error) {
            console.error('Error fetching authenticated user:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://gym-app.test/api/posts', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setPosts(data.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const addPost = async (newPost) => {
        try {
            const response = await fetch('http://gym-app.test/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                const createdPost = await response.json();

                // Adding author information directly to the new post
                const postWithAuthor = {
                    ...createdPost.data,
                    customer: {
                        id: userId,
                        name: userName,
                    },
                };

                // Update the posts list with the new post
                setPosts([postWithAuthor, ...posts]);
            } else {
                console.error("Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const deletePost = async (postId) => {
        try {
            const response = await fetch(`http://gym-app.test/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setPosts(posts.filter(post => post.id !== postId));
            } else {
                console.error("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handlePostSelect = (post) => {
        setSelectedPost(post);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <CreatePost addPost={addPost} />
            <div className="mt-8">
                <h3 className="text-3xl font-bold mb-6">Posty</h3>
                {selectedPost ? (
                    <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
                ) : (
                    <PostList posts={posts} onPostSelect={handlePostSelect} onDelete={deletePost} userId={userId} />
                )}
            </div>
        </div>
    );
};

export default Blog;
