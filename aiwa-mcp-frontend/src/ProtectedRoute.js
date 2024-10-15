// /Features/Instance/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react'; // Import correctly

function ProtectedRoute({ children }) {
    const { authStatus } = useAuthenticator(context => [context.authStatus]);

    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        if (authStatus === 'authenticated' || authStatus === 'unauthenticated') {
            setLoading(false);
        }
    }, [authStatus]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return authStatus === 'authenticated' ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
