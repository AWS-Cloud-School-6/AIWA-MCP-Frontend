// /Features/Instance/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VPC from './VPC'; // Main EC2 Console page
import VPC_Create from './VPC_Create';
import Subnet from './Subnet/Subnet';
import InternetGateway from './InternetGateway/InternetGateway';

function VPCRoutes() {
    return (
        <Routes>
            <Route path="/" element={<VPC />} />
            <Route path="/create" element={<VPC_Create />} />
            <Route path="/subnet" element={<Subnet />} />
            <Route path="/internetgateway" element={<InternetGateway />} />
        </Routes>
    );
}

export default VPCRoutes;