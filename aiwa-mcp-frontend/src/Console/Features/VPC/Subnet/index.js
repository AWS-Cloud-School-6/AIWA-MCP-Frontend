// /Features/Instance/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Subnet from './Subnet'; // Main EC2 Console page
import Subnet_AWS_Create from './Subnet_AWS_Create';
import Subnet_GCP_Create from './Subnet_GCP_Create';

function SubnetRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Subnet />} />
            {/* 여기에 추가해주세요*/}
        </Routes>
    );
}

export default SubnetRoutes;