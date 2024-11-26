import { useState, useCallback } from "react";
import { Flex, View, Text, Icon, TextField, Button } from '@aws-amplify/ui-react';
import React from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import NavBar from './NavBar/NavBar';
import { AWS_API_URL, MEMBER_API_URL } from '../index';
import SidebarConsole from './SideBar/SidebarConsole';
import { useNavigate } from "react-router-dom";
import './Console.css';

function MyPage({ provider }) {
  const [accessKey, setAccessKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [projectId, setprojectId] = useState('');
  const [gcpKeyFile, setgcpKeyFile] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const { currentUser } = useUserContext();
  const refreshPage = () => {
    window.location.reload();
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setgcpKeyFile(content);
        
        // Parse JSON and extract project_id
        try {
          const jsonContent = JSON.parse(content);
          if (jsonContent.project_id) {
            setprojectId(jsonContent.project_id);
          }
        } catch (error) {
          console.error('JSON 파싱 에러:', error);
        }
      };
      reader.readAsText(file);
    } else {
      alert("JSON 파일만 업로드 가능합니다.");
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setgcpKeyFile(content);
        
        // Parse JSON and extract project_id
        try {
          const jsonContent = JSON.parse(content);
          if (jsonContent.project_id) {
            setprojectId(jsonContent.project_id);
          }
        } catch (error) {
          console.error('JSON 파싱 에러:', error);
        }
      };
      reader.readAsText(file);
    } else {
      alert("JSON 파일만 업로드 가능합니다.");
    }
  }, []);

  const handleSubmit = async () => {
    let response = null;
    try {
      // 기존 회사 정보 확인
      let existingKeys = null;
      try {
        const checkCompanyResponse = await axios.get(`${MEMBER_API_URL}/members/${currentUser?.id}/${companyName}`);
        existingKeys = checkCompanyResponse.data.data.aiwaKeys[0];
      } catch (checkError) { }

      // URL 파라미터 설정
      let finalAccessKey = null;
      let finalSecretKey = null;
      let finalProjectId = null;
      let finalGcpKeyFile = null;

      // 기존 키 정보 유지
      if (existingKeys) {
        finalAccessKey = existingKeys.accessKey || null;
        finalSecretKey = existingKeys.secretKey || null;
        finalProjectId = existingKeys.projectId || null;
        finalGcpKeyFile = existingKeys.gcpKeyFile || null;
      }

      // 새로운 키 정보로 업데이트 - GCP인 경우 먼저 projectId 설정
      if (provider === 'GCP') {
        finalProjectId = projectId;
      }

      const url = `${MEMBER_API_URL}/members/add-aws-gcp-key?email=${encodeURIComponent(currentUser?.id)}&companyName=${encodeURIComponent(companyName)}&accessKey=${encodeURIComponent(finalAccessKey)}&secretKey=${encodeURIComponent(finalSecretKey)}&projectId=${encodeURIComponent(finalProjectId)}`;

      if (provider === 'AWS') {
        finalAccessKey = accessKey;
        finalSecretKey = secretKey;
        response = await axios.post(url);
      } else if (provider === 'GCP') {
        // FormData 객체 생성
        const formData = new FormData();
        
        // JSON 문자열을 Blob으로 변환하여 파일로 추가
        const jsonBlob = new Blob([gcpKeyFile], { type: 'application/json' });
        formData.append('gcpKeyFile', jsonBlob, 'gcpKey.json');

        // FormData와 함께 POST 요청 전송
        response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      console.log('API 응답:', response.data.msg);
      alert('키 성공적으로 제출');
      window.location.href = '/console'; // Redirect to console page first
      window.location.reload(); // Then refresh after redirect
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
    <Flex direction="column" padding="2rem" width="400px">
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
        <View
          backgroundColor={isDragging ? "rgba(0, 0, 0, 0.1)" : "transparent"}
          padding="1rem"
          border="2px dashed #ccc"
          borderRadius="4px"
          marginBottom="1rem"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="application/json"
            onChange={handleFileSelect}
            style={{ marginBottom: '1rem' }}
          />
          <Text>또는 JSON 파일을 여기로 드래그하세요</Text>
          {gcpKeyFile && (
            <Text color="green" marginTop="0.5rem">
              ✓ JSON 파일이 업로드되었습니다
            </Text>
          )}
        </View>
      )}

      <Button onClick={handleSubmit}>제출</Button>
    </Flex>
  );
}

function Console({ overrides }) {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const navigate = useNavigate();

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const services = [
    { path: "/console/vpc", label: "VPC" },
    { path: "/console/vpc/subnet", label: "Subnet" },
    { path: "/console/vpc/internetgateway", label: "Internet Gateway" },
    { path: "/console/vpc/routetable", label: "Route Table" },
    { path: "/console/instances/securitygroup", label: "Security Group" },
    { path: "/console/vpc/natgateway", label: "NAT Gateway" },
    { path: "/console/instances", label: "EC2" },
  ];

  return (
    <div className="console-container">
      <NavBar />
      <Flex direction="row" className="console-content">
        <SidebarConsole onSelectProvider={handleProviderSelect} />
        {selectedProvider && <MyPage provider={selectedProvider} />}

        <div className="services-grid">
          {services.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className="aws-console-button"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </Flex>
    </div>

  );
}

export default Console;