import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react'; // Use Amplify's Authenticator
import axios from 'axios';
import { MEMBER_API_URL } from './index';

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
    const [projectId, setProjectId] = useState(null);

    useEffect(() => {
        if (user) {
            // user가 있을 때만 currentUser 설정
            setCurrentUser({
                id: user.signInDetails.loginId,
            });
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

    // projectId를 가져오는 useEffect
    useEffect(() => {
        const fetchProjectId = async () => {
            if (currentUser?.id && selectedCompany) {  // optional chaining 사용
                try {
                    const response = await axios.get(`${MEMBER_API_URL}/members/${currentUser.id}/${selectedCompany}`);
                    console.log(response.data.data.aiwaKeys[0].projectId);
                    setProjectId(response.data.data.aiwaKeys[0].projectId);
                    setCurrentUser(prev => ({
                        ...prev,
                        projectId: response.data.data.aiwaKeys[0].projectId
                    }));
                } catch (error) {
                    console.error('Error fetching project ID:', error);
                }
            }
        };

        fetchProjectId();
    }, [currentUser?.id, selectedCompany]);

    return (
        <UserContext.Provider value={{ 
            currentUser, 
            setCurrentUser,
            selectedCompany,
            setSelectedCompany,
            projectId,
            setProjectId    
        }}>
            {children}
        </UserContext.Provider>
    );
};
