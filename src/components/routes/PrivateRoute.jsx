import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roleRequired }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role_id'); // Zakładam, że role_id jest zapisane w localStorage

    if (!token) {
        // Użytkownik nie jest zalogowany, przekieruj do strony logowania
        return <Navigate to="/login" />;
    }

    // Sprawdzenie, czy użytkownik jest trenerem, ale próbuje wejść na stronę dla zwykłego użytkownika
    if (parseInt(userRole) === 4 && !roleRequired) {
        return <Navigate to="/trainer-dashboard" />;
    }

    // Sprawdzenie, czy zwykły użytkownik próbuje uzyskać dostęp do stron dla trenerów
    if (parseInt(userRole) !== 4 && roleRequired === 4) {
        return <Navigate to="/dashboard" />;
    }

    // Jeśli token istnieje i rola użytkownika pasuje do wymaganej roli (lub nie ma wymaganej roli)
    return children;
};

export default PrivateRoute;
