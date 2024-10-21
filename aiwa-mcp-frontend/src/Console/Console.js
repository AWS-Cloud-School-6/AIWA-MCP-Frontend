import { useState } from "react";
import { Flex, View, Text, Icon, TextField, Button } from '@aws-amplify/ui-react';
import { ListboxComponent } from '../ui-components';
import React from 'react';
import axios from 'axios'; 
import { useUserContext } from '../UserContext';
import NavBar from './NavBar/NavBar';
import { API_URL } from '../index';
import SidebarConsole from './SideBar/SidebarConsole';



function MyPage({ provider }) {
  const [accessKey, setaccess_key] = useState('');
  const [secretKey, setsecret_key] = useState('');

  const { currentUser } = useUserContext();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(API_URL + '/members/update-credentials', {
        email: currentUser?.id, // Use the current user's email from context
        accessKey,
        secretKey
      });    
      console.log('API 응답:', response.data.msg);
      alert('키 성공적으로 제출');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('서버 내부 오류:', error.response.data);
        alert('서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.code === 'ERR_BAD_RESPONSE') {
        console.error('잘못된 응답:', error.message);
        alert('서버로부터 잘못된 응답을 받았습니다. 관리자에게 문의해주세요.');
      } else {
        console.error('API 요청 실패:', error);
        alert('키 제출 실패: ' + error.message);
      }
    }
  };

  return (
    <Flex direction="column" padding="2rem">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">마이페이지 - {provider}</Text>

      <TextField
        label="Access Key"
        placeholder="Access Key를 입력하세요"
        value={accessKey}
        onChange={(e) => setaccess_key(e.target.value)}
        marginBottom="1rem"
      />
      <TextField
        label="Secret Key"
        placeholder="Secret Key를 입력하세요"
        type="password"
        value={secretKey}
        onChange={(e) => setsecret_key(e.target.value)}
        marginBottom="1rem"
      />
      <Button onClick={handleSubmit}>제출</Button>
    </Flex>
  );
}

function Console({overrides}) {
    const [selectedProvider, setSelectedProvider] = useState(null);

    const handleProviderSelect = (provider) => {
        setSelectedProvider(provider);
    };

    return (
        <div>
            <NavBar />
            <Flex direction="row">
                <SidebarConsole onSelectProvider={handleProviderSelect} />
                {selectedProvider && <MyPage provider={selectedProvider} />}
            </Flex>
        </div>
    );
}

export default Console;
