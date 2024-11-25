import { useState } from "react";
import { Flex, View, Text, Icon, TextField, Button } from '@aws-amplify/ui-react';
import { ListboxComponent } from '../ui-components';
import React from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import NavBar from './NavBar/NavBar';
import { AWS_API_URL, MEMBER_API_URL } from '../index';
import SidebarConsole from './SideBar/SidebarConsole';



function MyPage({ provider }) {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectId, setprojectId] = useState('');
  const [gcpKeyFile, setgcpKeyFile] = useState('');

  const { currentUser } = useUserContext();
  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmit = async () => {
    try {
      let checkCompanyResponse;
      try {
        checkCompanyResponse = await axios.get(`${MEMBER_API_URL}/members/${currentUser?.id}/${companyName}`);
        if (checkCompanyResponse.data.success === true) {
          alert('이미 존재하는 회사 이름입니다. 다른 이름을 사용해주세요.');
          return;
        }
      } catch (checkError) {
      }

      let url = `${MEMBER_API_URL}/members/add-aws-gcp-key?email=${encodeURIComponent(currentUser?.id)}&companyName=${encodeURIComponent(companyName)}&accessKey=${encodeURIComponent(accessKey || null)}&secretKey=${encodeURIComponent(secretKey || null)}&projectId=${encodeURIComponent(projectId || null)}&gcpKeyFile=${encodeURIComponent(gcpKeyFile || null)}`;

      if (provider === 'AWS') {
        url = `${MEMBER_API_URL}/members/add-aws-gcp-key?email=${encodeURIComponent(currentUser?.id)}&companyName=${encodeURIComponent(companyName)}&accessKey=${encodeURIComponent(accessKey)}&secretKey=${encodeURIComponent(secretKey)}&projectId=${encodeURIComponent(null)}&gcpKeyFile=${encodeURIComponent(null)}`;
      } else if (provider === 'GCP') {
        url = `${MEMBER_API_URL}/members/add-aws-gcp-key?email=${encodeURIComponent(currentUser?.id)}&companyName=${encodeURIComponent(companyName)}&accessKey=${encodeURIComponent(null)}&secretKey=${encodeURIComponent(null)}&projectId=${encodeURIComponent(projectId)}&gcpKeyFile=${encodeURIComponent(gcpKeyFile)}`;
      }

      const response = await axios.post(url);
      console.log('API 응답:', response.data.msg);
      alert('키 성공적으로 제출');
      // refreshPage();
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

    // refreshPage();
  };

  return (

    <Flex direction="column" padding="2rem">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">마이페이지 - {provider}</Text>

      <TextField
        label="Company Name"
        placeholder="Company Name을 입력"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        marginBottom="1rem"
      />

      {provider === 'AWS' && (
        <>
          <TextField
            label="Access Key"
            placeholder="Access Key를 입력"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            marginBottom="1rem"
          />
          <TextField
            label="Secret Key"
            placeholder="Secret Key를 입력"
            type="password"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            marginBottom="1rem"
          />
        </>
      )}

      {provider === 'GCP' && (
        <TextField
          label="서비스 계정 키"
          placeholder="서비스 계정 키 입력"
          value={gcpKeyFile}
          onChange={(e) => setgcpKeyFile(e.target.value)}
          marginBottom="1rem"
        />
      )}

      <Button onClick={handleSubmit}>제출</Button>
    </Flex>
  );
}

function Console({ overrides }) {
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
