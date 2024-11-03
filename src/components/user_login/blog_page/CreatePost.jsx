// import React, { useState } from 'react';
//
// const CreatePost = ({ addPost }) => {
//     const [title, setTitle] = useState('');
//     const [body, setBody] = useState('');
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (title.trim() && body.trim()) {
//             await addPost({ title, body });
//             setTitle('');
//             setBody('');
//         }
//     };
//
//     return (
//         <form onSubmit={handleSubmit} className="w-full mt-4">
//             <input
//                 type="text"
//                 placeholder="Tytuł posta"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <textarea
//                 placeholder="Treść posta"
//                 value={body}
//                 onChange={(e) => setBody(e.target.value)}
//                 className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 rows="5"
//             ></textarea>
//             <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//             >
//                 Dodaj post
//             </button>
//         </form>
//     );
// };
//
// export default CreatePost;

import React, { useState } from 'react';

const CreatePost = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() && body.trim()) {
            await addPost({ title, body });
            setTitle('');
            setBody('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full mt-4">
            <input
                type="text"
                placeholder="Tytuł posta"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
                placeholder="Treść posta"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="5"
            ></textarea>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Dodaj post
            </button>
        </form>
    );
};

export default CreatePost;
