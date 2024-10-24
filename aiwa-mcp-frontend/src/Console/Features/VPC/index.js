import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VPC from './VPC'; // Main VPC page
import VPC_Create from './VPC_Create';
import Subnet from './Subnet/Subnet';
import InternetGateway from './InternetGateway/InternetGateway';
import { NotificationProvider } from './NotificationContext'; // Import the Notification Provider

function VPCRoutes() {
    return (
        <NotificationProvider> {/* Place provider at the top level */}
            <Routes>
                <Route path="/" element={<VPC />} />
                <Route path="/create" element={<VPC_Create />} />
                <Route path="/subnet" element={<Subnet />} />
                <Route path="/internetgateway" element={<InternetGateway />} />
            </Routes>
        </NotificationProvider>
    );
}

export default VPCRoutes;