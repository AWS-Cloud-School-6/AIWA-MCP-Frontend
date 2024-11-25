// /Features/Instance/index.js
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import InstanceRoutes from './Features/Instance';
import VPCRoutes from './Features/VPC';
import SubnetRoutes from './Features/VPC/Subnet';
import Console from './Console.js';
import Profile from './Profile/Profile';
import Auth from '../Auth/Auth.js';


function ConsoleRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Console />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/mypage" element={<Profile />} />
            <Route path="instances/*" element={<InstanceRoutes />} />
            <Route path="vpc/*" element={<VPCRoutes />} /> {/* Instance routes */}
            <Route path="subnet/*" element={<SubnetRoutes />} /> {/* Instance routes */}
        </Routes>
    );
}

export default ConsoleRoutes;