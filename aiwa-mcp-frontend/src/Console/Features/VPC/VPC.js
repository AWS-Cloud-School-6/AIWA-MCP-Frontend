import React, { useState, useEffect } from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import { SideBar, NavBarHeader2 } from "../../../ui-components";
import VPCTable from "./table/VPCTable";
import NavBar from "../../NavBar/NavBar";
import SidebarVpc from "./Sidebar/SidebarVpc";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'; // Import notification styles
import { useNotification } from './NotificationContext';

import axios from 'axios';
import { AWS_API_URL, GCP_API_URL } from "../../../index";

export const fetchVPCData = async ({
  currentUser,
  selectedCompany,
  projectId
}) => {
  try {
    const awsUrl = `${AWS_API_URL}/vpc/describe?userId=${currentUser.id}&companyName=${selectedCompany}`;
    const awsPromise = axios.get(awsUrl);
    
    let gcpPromise = Promise.resolve({ data: { list: [] } });
    if (projectId && projectId !== 'undefined' && projectId !== 'null') {
      const gcpUrl = `${GCP_API_URL}/vpc/describe?projectId=${projectId}&userId=${currentUser.id}&companyName=${selectedCompany}`;
      gcpPromise = axios.get(gcpUrl);
    }

    const [awsResponse, gcpResponse] = await Promise.all([awsPromise, gcpPromise]);

    const awsVPCs = awsResponse.data.list
      ? awsResponse.data.list.map((vpc) => ({
          provider: "AWS",
          number: vpc.vpcId || '',
          name: vpc.tags?.Name || '-',
          status: vpc.status || "available",
          cidr: vpc.cidr || '-',
          routeTables: vpc.routeTables?.map(rt => rt.routeTableId).join(', ') || '-',
        }))
      : [];

    const gcpVPCs = gcpResponse.data.list
      ? gcpResponse.data.list.map((vpc) => ({
          provider: "GCP",
          number: vpc.vpcId || '-',
          name: vpc.vpcName || '-',
          status: "available",
          cidr: vpc.cidr || '-',
          routeTables: vpc.routingTables?.join(', ') || '-',
        }))
      : [];

    return [...awsVPCs, ...gcpVPCs];
  } catch (error) {
    console.error("Error in fetchVPCData:", error);
    throw error;
  }
};

function VPC({ VPCCreating }) {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Flex direction="row" style={{ flex: 1, overflow: 'hidden' }}>
        <SidebarVpc />
        <Flex direction="column" style={{ width: '100%', padding: '20px', overflow: 'auto' }}>
          <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
            <Heading level={4}>VPC List</Heading>
          </Flex>
          <VPCTable />
        </Flex>
      </Flex>
      <NotificationContainer />
    </div>
  );
}

export default VPC;
