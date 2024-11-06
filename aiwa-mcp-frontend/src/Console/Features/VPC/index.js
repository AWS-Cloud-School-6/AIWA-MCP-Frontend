import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VPC from './VPC'; // Main VPC page
import VPC_Create from './VPC_Create';
import Subnet from './Subnet/Subnet';
import InternetGateway from './InternetGateway/InternetGateway';
import NatGateway from './NatGateway/Nat';
import RouteTable from './RouteTable/RouteTable';

import { NotificationProvider } from './NotificationContext'; // Import the Notification Provider

function VPCRoutes() {
    return (
        <NotificationProvider> {/* Place provider at the top level */}
            <Routes>
                <Route path="/" element={<VPC />} />
                <Route path="/create" element={<VPC_Create />} />
                <Route path="/subnet" element={<Subnet />} />
                <Route path="/internetgateway" element={<InternetGateway />} />
                <Route path="/natgateway" element={<NatGateway />} />
                <Route path="/routetable" element={<RouteTable />} />
            </Routes>
        </NotificationProvider>
    );
}

export default VPCRoutes;