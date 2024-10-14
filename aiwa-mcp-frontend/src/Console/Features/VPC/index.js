// /Features/Instance/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import VPC from './VPC'; // Main EC2 Console page

function VPCRoutes() {
    return (
        <Routes>
            <Route path="/" element={<VPC />} />
            {/* 여기에 추가해주세요*/}
        </Routes>
    );
}

export default VPCRoutes;