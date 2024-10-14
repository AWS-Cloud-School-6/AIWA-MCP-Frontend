import React, { useState } from "react";
import { Flex, Button, TextField, View, Heading } from "@aws-amplify/ui-react";
import { SideBar, NavBarHeader2 } from "../../../ui-components";


function VPC_Create() {
  // 상태 설정 (이름과 CIDR 블록)
  const [vpcName, setVpcName] = useState("");
  const [cidrBlock, setCidrBlock] = useState("");

  // 버튼 클릭 시 동작하는 함수
  const handleCreateVPC = () => {
    console.log("VPC Name:", vpcName);
    console.log("CIDR Block:", cidrBlock);
    alert(`VPC가 생성되었습니다: \n이름: ${vpcName} \nCIDR: ${cidrBlock}`);
  };

  return (
    <div>
      <NavBarHeader2 />
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
              label="CIDR 블록"
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
