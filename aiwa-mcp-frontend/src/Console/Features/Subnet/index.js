// /Features/Instance/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Subnet from './Subnet'; // Main EC2 Console page
import Subnet_Create from './Subnet_Create';
function SubnetRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Subnet />} />
            <Route path="/create" element={<Subnet_Create />} />
            {/* 여기에 추가해주세요*/}
        </Routes>
    );
}

export default SubnetRoutes;