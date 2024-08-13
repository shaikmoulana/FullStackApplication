// // src/ProtectedRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element, ...rest }) => {
//     const isAuthenticated = localStorage.getItem('oauth2'); // Example check, adapt as needed

//     return (
//         <Route
//             {...rest}
//             element={isAuthenticated ? element : <Navigate to="/" />}
//         />
//     );
// };

// export default ProtectedRoute;

// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//     const isAuthenticated = !!localStorage.getItem('oauth2'); // Example check
//     return isAuthenticated ? children : <Navigate to="/" />;
// };
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('oauth2'); // Replace with your actual auth check logic

    if (!isAuthenticated) {
        return <Navigate to="/" />; // Redirect to login page if not authenticated
    }

    return children;
};

export default ProtectedRoute;
