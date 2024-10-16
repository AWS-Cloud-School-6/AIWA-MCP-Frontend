import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Flex, Button, TextField, Heading } from "@aws-amplify/ui-react";
import { SideBar, NavBarHeader2 } from "../../../ui-components";
import axios from 'axios';
import { useUserContext } from '../../../UserContext';
import NavBar from '../../NavBar/NavBar';
import { API_URL } from '../../../index';


function VPC_Create() {
  // 상태 설정 (이름과 CIDR 블록)
  const [vpcName, setVpcName] = useState("");
  const [cidrBlock, setCidrBlock] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  // 버튼 클릭 시 동작하는 함수
  const handleCreateVPC = () => {
    if (!vpcName || !cidrBlock) {
      alert("VPC 이름과 CIDR 블록을 모두 입력해주세요.");
      return;
    }

    // 새로운 VPC 객체 생성
    const newVPC = {
      "vpcName": vpcName,
      "cidrBlock": cidrBlock,
    };
    axios.post(API_URL + '/vpc/create?userId=' + currentUser.id, newVPC)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });

    // VPCTable 컴포넌트로 새로운 VPC 정보를 전달
    navigate('/console/vpc', { state: { newVPC } });
  };

  return (
    <div>
      <NavBar />
      <Flex direction="row" height="100vh">
        {/* 왼쪽: SideBar */}
        <SideBar />

        {/* 오른쪽: VPC Create Form */}
        <Flex
          direction="column"
          justifyContent="right"
          width="30%"
          padding="20px"
          gap="20px"
        >
          <Heading level={2}>VPC 생성</Heading>

          <TextField
            label="VPC 이름"
            placeholder="VPC 이름을 입력하세요"
            value={vpcName}
            onChange={(e) => setVpcName(e.target.value)}
          />

          <TextField
            label="IPv4 CIDR 블록"
            placeholder="예: 10.0.0.0/16"
            value={cidrBlock}
            onChange={(e) => setCidrBlock(e.target.value)}
          />

          <Button
            variation="primary"
            onClick={handleCreateVPC}
            isDisabled={!vpcName || !cidrBlock} // 둘 다 입력되었을 때만 활성화
          >
            Create
          </Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default VPC_Create;
