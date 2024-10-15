import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react'; // Use Amplify's Authenticator

const UserContext = createContext(); // Create a context

// Custom hook to access user context
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const { user } = useAuthenticator((context) => [context.user]);
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        if (user) {
            try {
                setCurrentUser({
                    id: user.signInDetails.loginId,
                });
            } catch (error) {
                console.error('Error setting current user:', error);
            }
        } else {
            setCurrentUser(null);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
