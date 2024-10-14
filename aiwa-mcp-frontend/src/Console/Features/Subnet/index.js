// /Features/Instance/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Subnet from './Subnet'; // Main EC2 Console page

function SubnetRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Subnet />} />
            {/* 여기에 추가해주세요*/}
        </Routes>
    );
}

export default SubnetRoutes;