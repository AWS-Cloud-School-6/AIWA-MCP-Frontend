import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VPC from './VPC'; // Main VPC page
import VPC_AWS_Create from './VPC_AWS_Create';
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
                <Route path="/aws/create" element={<VPC_AWS_Create />} />
                <Route path="/gcp/create" element={<VPC_AWS_Create />} />
                <Route path="/subnet" element={<Subnet />} />
                <Route path="/internetgateway" element={<InternetGateway />} />
                <Route path="/natgateway" element={<NatGateway />} />
                <Route path="/routetable" element={<RouteTable />} />
            </Routes>
        </NotificationProvider>
    );
}

export default VPCRoutes;