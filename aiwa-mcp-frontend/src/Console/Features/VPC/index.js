// /Features/Instance/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VPC from './VPC'; // Main EC2 Console page
import VPC_Create from './VPC_Create';
import Subnet from './Subnet/Subnet';

function VPCRoutes() {
    return (
        <Routes>
            <Route path="/" element={<VPC />} />
            <Route path="/create" element={<VPC_Create />} />
            <Route path="/subnet" element={<Subnet />} />
            {/* 여기에 추가해주세요*/}
        </Routes>
    );
}

export default VPCRoutes;