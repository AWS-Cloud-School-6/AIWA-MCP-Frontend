import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Flex, Button, TextField, Heading, Menu, MenuItem, MenuButton, Text } from "@aws-amplify/ui-react";
import axios from 'axios';
import { useUserContext } from '../../../../UserContext';
import NavBar from '../../../NavBar/NavBar';
import { AWS_API_URL } from '../../../../index';
import SidebarVpc from "../Sidebar/SidebarVpc";

function Securitygroup_Create() {
    // 상태 설정 (이름과 CIDR 블록)
    const [securitygroupName, setSecuritygroupName] = useState("");
    const [cidrBlock, setCidrBlock] = useState("");
    const [latestVPC, setLatestVPC] = useState([]); // Holds the list of VPCs
    const [selectedVPC, setSelectedVPC] = useState("non-selected"); // Default to non-selected
    const [selectedAZ, setSelectedAZ] = useState("non-selected"); // Default to non-selected for Availability Zone
    const navigate = useNavigate();
    const { currentUser, selectedCompany } = useUserContext();

    // Fetch the latest VPC data
    const fetchVPCData = async () => {
        try {
            const response = await axios.get(`${AWS_API_URL}/vpc/describe?userId=${currentUser.id}&companyName=${selectedCompany}`);
            if (response.data.list && response.data.list.length > 0) {
                setLatestVPC(response.data.list); // Set the list of VPCs
            }
        } catch (error) {
            console.error("Error fetching VPC data:", error);
        }
    };

    useEffect(() => {
        fetchVPCData();
    }, []);

    // Handle Securitygroup creation
    const handleCreateSecuritygroup = async () => {
        if (!securitygroupName || !cidrBlock || selectedVPC === "non-selected" || selectedAZ === "non-selected") {
            alert("VPC, Availability Zone, Securitygroup 이름과 CIDR 블록을 모두 입력해주세요.");
            return;
        }

        const newSecuritygroup = {
            securitygroupName,
            cidrBlock,
            vpcName: selectedVPC, // Include selected VPC ID
            availabilityZone: selectedAZ, // Include selected Availability Zone
        };

        try {
            const response = await axios.post(`${AWS_API_URL}/securitygroup/create?userId=${currentUser.id}`, newSecuritygroup);
            console.log(response.data);
            navigate('/console/vpc/securitygroup');
        } catch (error) {
            console.error("Error creating securitygroup:", error);
        }
    };

    // Handle VPC selection
    const handleVPCSelect = (vpcName) => {
        setSelectedVPC(vpcName);
    };

    // Handle Availability Zone selection
    const handleAZSelect = (az) => {
        setSelectedAZ(az);
    };

    // Refresh VPC Data and reset selection
    const handleRefreshVPCs = async () => {
        await fetchVPCData(); // Fetch latest VPC data
        setSelectedVPC("non-selected"); // Reset VPC selection to non-selected
    };

    return (
        <div>
            <NavBar />
            <Flex direction="row" height="100vh">
                {/* 왼쪽: SideBar */}
                <SidebarVpc />

                {/* 오른쪽: VPC Create Form */}
                <Flex
                    direction="column"
                    justifyContent="right"
                    width="30%"
                    padding="20px"
                    gap="20px"
                >
                    <Heading level={2}>AWS Securitygroup 생성</Heading>

                    <TextField
                        fontWeight="bold"
                        label="Securitygroup 이름"
                        placeholder="Securitygroup 이름을 입력하세요"
                        value={securitygroupName}
                        onChange={(e) => setSecuritygroupName(e.target.value)}
                    />

                    <TextField
                        fontWeight="bold"
                        label="IPv4 CIDR 블록"
                        placeholder="예: 10.0.0.0/16"
                        value={cidrBlock}
                        onChange={(e) => setCidrBlock(e.target.value)}
                    />

                    <Text fontWeight="bold" marginBottom='-10px'>VPC 선택</Text>

                    <Flex direction="row" alignItems="center">
                        {/* Show VPC details in a menu */}
                        <Menu
                            trigger={
                                <MenuButton style={{ textAlign: 'left', width: '100%', justifyContent: 'flex-start' }}>
                                    {selectedVPC === "non-selected" ? "VPC 선택" : `${selectedVPC}`}
                                </MenuButton>
                            }
                            style={{ textAlign: 'left' }}  // Ensure left alignment for the menu
                        >
                            {latestVPC.length > 0 ? (
                                latestVPC.map((vpc) => (
                                    <MenuItem key={vpc.vpcId} onClick={() => handleVPCSelect(vpc.tags.Name)}>
                                        VPC ID: {vpc.vpcId} - {vpc.tags.Name || 'Unnamed'}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem>VPC 데이터 없음</MenuItem>
                            )}
                        </Menu>

                        {/* Button to refresh VPC data */}
                        <Button
                            onClick={handleRefreshVPCs}
                            className="filterButton"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '10px' // Adjusted margin for spacing
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ width: '20px', height: '20px', padding: '0', margin: '0' }}
                            >
                                <path d="M23 4v6h-6" />
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                            </svg>
                        </Button>
                    </Flex>

                    {/* Availability Zone selection */}
                    <Text fontWeight="bold" marginBottom='-10px'>Availability Zone 선택</Text>

                    <Menu
                        trigger={
                            <MenuButton style={{ textAlign: 'left', width: '100%', justifyContent: 'flex-start' }}>
                                {selectedAZ === "non-selected" ? "AZ 선택" : ` ${selectedAZ}`}
                            </MenuButton>
                        }
                        style={{ textAlign: 'left' }}  // Ensure left alignment for the menu
                    >
                        {/* AZ Options */}
                        <MenuItem onClick={() => handleAZSelect("ap-northeast-2a")}>ap-northeast-2a</MenuItem>
                        <MenuItem onClick={() => handleAZSelect("ap-northeast-2b")}>ap-northeast-2b</MenuItem>
                        <MenuItem onClick={() => handleAZSelect("ap-northeast-2c")}>ap-northeast-2c</MenuItem>
                        <MenuItem onClick={() => handleAZSelect("ap-northeast-2d")}>ap-northeast-2d</MenuItem>
                    </Menu>

                    <Button
                        variation="primary"
                        onClick={handleCreateSecuritygroup}
                        isDisabled={!securitygroupName || !cidrBlock || selectedVPC === "non-selected" || selectedAZ === "non-selected"} // Disable if no VPC or AZ selected
                    >
                        Create Securitygroup
                    </Button>
                </Flex>
            </Flex>
        </div >
    );
}

export default Securitygroup_Create;
