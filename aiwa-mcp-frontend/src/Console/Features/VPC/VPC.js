import React, { useState, useEffect } from "react";
import { Flex, Button, View, Heading } from "@aws-amplify/ui-react";
import { SideBar, NavBarHeader2 } from "../../../ui-components";
import VPCTable from "./table/VPCTable";
import NavBar from "../../NavBar/NavBar";
import SidebarVpc from "./Sidebar/SidebarVpc";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'; // Import notification styles
import { useNotification } from './NotificationContext';


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
