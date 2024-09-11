import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (token) {
        // Użytkownik jest zalogowany, przekieruj na stronę główną (np. Dashboard)
        return <Navigate to="/dashboard" />;
    }

    // Jeśli token nie istnieje, wyświetl stronę dla niezalogowanego użytkownika
    return children;
};

export default PublicRoute;
