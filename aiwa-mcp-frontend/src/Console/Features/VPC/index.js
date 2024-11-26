import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VPC from './VPC'; // Main VPC page
import Subnet from './Subnet/Subnet';
import InternetGateway from './InternetGateway/InternetGateway';
import NatGateway from './NatGateway/Nat';
import RouteTable from './RouteTable/RouteTable';

import { NotificationProvider } from './NotificationContext'; // Import the Notification Provider
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function VPCRoutes() {
    return (
        <NotificationProvider> {/* Place provider at the top level */}
            <NotificationContainer />
            <Routes>
                <Route path="/" element={<VPC />} />
                <Route path="/subnet" element={<Subnet />} />
                <Route path="/internetgateway" element={<InternetGateway />} />
                <Route path="/natgateway" element={<NatGateway />} />
                <Route path="/routetable" element={<RouteTable />} />
            </Routes>
        </NotificationProvider>
    );
}

export default VPCRoutes;