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
    <div>
      <NavBar />
      <Flex direction="row">
        <SidebarVpc />
        <Flex direction="column" style={{ width: '100%', padding: '20px' }}>
          <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
            <Heading level={4}>VPC List</Heading>
          </Flex>
          <VPCTable />
        </Flex>
      </Flex>
      <NotificationContainer /> {/* Render Notification Container */}
    </div>
  );
}

export default VPC;
