import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Użytkownik nie jest zalogowany, przekieruj do strony logowania
        return <Navigate to="/login" />;
    }

    // Jeśli token istnieje, zwróć podstronę
    return children;
};

export default PrivateRoute;
