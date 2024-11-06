import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Flex, Button, TextField, Heading } from "@aws-amplify/ui-react";
import { SideBar } from "../../../ui-components";
import axios from 'axios';
import { useUserContext } from '../../../UserContext';
import NavBar from '../../NavBar/NavBar';
import { AWS_API_URL } from '../../../index';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'; // Import notification styles
import { useNotification } from './NotificationContext';

function VPC_Create() {
  const [vpcName, setVpcName] = useState("");
  const [cidrBlock, setCidrBlock] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { currentUser } = useUserContext();

  const notify = useNotification();

  // Cleanup notification when component unmounts
  useEffect(() => {
    // Cleanup function
    return () => {
      // Remove all lingering "Creating VPC..." notifications
      NotificationManager.listNotify = NotificationManager.listNotify.filter(n => n.title !== 'Info');
    };
  }, []);

  // Function to handle VPC creation
  // 버튼 클릭 시 동작하는 함수

  const handleCreateVPC = async () => {
    if (!vpcName || !cidrBlock) {
      alert("VPC 이름과 CIDR 블록을 모두 입력해주세요.");
      return;
    }

    // Create a new VPC object
    const newVPC = {
      "vpcName": vpcName,
      "cidrBlock": cidrBlock,
    };

    setIsLoading(true); // Set loading state to true

    // Show "Creating VPC..." notification ONLY when the "Create" button is pressed
    NotificationManager.info('Creating VPC...', 'Info', 0); // Keep notification until manually removed
    navigate('/console/vpc', { state: { newVPC } });

    axios.post(`${AWS_API_URL}/vpc/create?userId=${currentUser.id}`, newVPC)
      .then((response) => {
        console.log(response);

        // Remove the "Creating VPC..." notification manually
        NotificationManager.listNotify = NotificationManager.listNotify.filter(n => n.title !== 'Info');
        // Notify success
        notify('VPC created successfully!', 'success');

      })
      .catch((error) => {
        console.log(error); // Error

        // Remove the "Creating VPC..." notification manually
        NotificationManager.listNotify = NotificationManager.listNotify.filter(n => n.title !== 'Info');
        // Notify error
        notify('Error creating VPC.', 'error');
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state in finally block
      });
  }; // Navigate to VPC page

  return (
    <div>
      <NavBar />
      <Flex direction="row" height="100vh">
        {/* Left: SideBar */}
        <SideBar />

        {/* Right: VPC Create Form */}
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
            isDisabled={!vpcName || !cidrBlock || isLoading} // Disable button while loading
          >
            {isLoading ? 'Creating...' : 'Create'} {/* Change button text based on loading state */}
          </Button>
        </Flex>
      </Flex>
      <NotificationContainer /> {/* Render Notification Container */}
    </div>
  );
}

export default VPC_Create;
