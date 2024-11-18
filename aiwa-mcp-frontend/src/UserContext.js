import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react'; // Use Amplify's Authenticator

const UserContext = createContext(); // Create a context

// Custom hook to access user context
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const { user } = useAuthenticator((context) => [context.user]);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(() => {
        try {
            // localStorage에서 저장된 회사 정보 불러오기
            const savedCompany = localStorage.getItem('selectedCompany');
            return savedCompany ? JSON.parse(savedCompany) : null;
        } catch (error) {
            console.error('Error parsing selectedCompany from localStorage:', error);
            localStorage.removeItem('selectedCompany'); // 잘못된 데이터 삭제
            return null;
        }
    });

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

    // selectedCompany가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        if (selectedCompany) {
            localStorage.setItem('selectedCompany', JSON.stringify(selectedCompany));
        } else {
            localStorage.removeItem('selectedCompany');
        }
    }, [selectedCompany]);

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
