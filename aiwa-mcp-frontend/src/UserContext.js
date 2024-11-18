import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react'; // Use Amplify's Authenticator

const UserContext = createContext(); // Create a context

// Custom hook to access user context
export const useUserContext = () => useContext(UserContext);

export const UserProvider   = ({ children }) => {
    // localStorage에서 초기값 가져오기
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [selectedCompany, setSelectedCompany] = useState(() => {
        const savedCompany = localStorage.getItem('selectedCompany');
        return savedCompany || null;
    });

    // selectedCompany가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        if (selectedCompany) {
            localStorage.setItem('selectedCompany', selectedCompany);
        }
    }, [selectedCompany]);

    // currentUser가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }, [currentUser]);

    return (
        <UserContext.Provider value={{
            currentUser,
            setCurrentUser,
            selectedCompany,
            setSelectedCompany
        }}>
            {children}
        </UserContext.Provider>
    );
};
