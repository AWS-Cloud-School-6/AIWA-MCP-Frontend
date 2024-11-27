import React from 'react';
import { Flex, Heading } from '@aws-amplify/ui-react';
import EC2Table from "./table/EC2Table";
import SidebarEc2 from "./Sidebar/SidebarEc2";
import NavBar from '../../NavBar/NavBar';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';
import { AWS_API_URL, GCP_API_URL } from '../../../index';

export const fetchEC2AndGCPData = async (currentUser, selectedCompany, projectId, accessKey) => {
  try {
    const [ec2Response, gcpResponse] = await Promise.all([
      accessKey
        ? axios.get(
          `${AWS_API_URL}/ec2/describe?userId=${currentUser.id}&companyName=${selectedCompany}`
          )
        : Promise.resolve({data: {}}),
      projectId
        ? axios.get(
            `${GCP_API_URL}/vm/describe?projectId=${projectId}&userId=${currentUser.id}`
          )
        : Promise.resolve({ data: {} }),
    ]);

    // EC2 데이터 처리
    const processedEC2s =
      ec2Response.data.list?.map((ec2) => ({
        instanceId: ec2.instanceId || "N/A",
        state: ec2.state || "Unknown",
        name: ec2.tags?.["Name"] || "-",
        publicIpAddress: ec2.publicIpAddress || "N/A",
        privateIpAddress: ec2.privateIpAddress || "N/A",
        type: "AWS",
      })) || [];

    // GCP 데이터 처리
    const processedGCPs =
      gcpResponse.data.list?.map((vm) => ({
        name: vm.name || "N/A",
        status: vm.status || "Unknown",
        internalIp: vm.networkInterfaces
          ?.map(ni => ni.internalIp)
          .filter(Boolean)
          .join(',') || "N/A",
        externalIp: vm.networkInterfaces
          ?.map(ni => ni.externalIp)
          .filter(Boolean)
          .join(', ') || "N/A",
        type: "GCP",
      })) || [];

    // EC2와 GCP 데이터를 통합
    return [...processedEC2s, ...processedGCPs];
  } catch (error) {
    console.error("Error fetching EC2 or GCP data:", error);
    throw error;
  }
};

function Instance() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <NotificationContainer />
            <Flex direction="row"  style={{ flex: 1, overflow: 'hidden' }}>
                <SidebarEc2 />
                <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
                    <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
                        <Heading level={4}>Instance List</Heading>
                    </Flex>
                    <EC2Table />
                </Flex>
            </Flex>
        </div>
    );
}

export default Instance;
