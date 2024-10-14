// /Features/Instance/index.js
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import InstanceRoutes from './Features/Instance';
import VPCRoutes from './Features/VPC';
import SubnetRoutes from './Features/Subnet';
import Console from './Console';
import Profile from './Profile/Profile';
import { NavBarHeader2 } from '../ui-components';

function ConsoleRoutes() {
    return (                     
    <Routes>
        <Route path="/" element={<Console />} />
        <Route path="/mypage" element={<Profile />} />
        <Route path="instances/*" element={<InstanceRoutes />} /> {/* Instance routes */}
        <Route path="vpc/*" element={<VPCRoutes />} /> {/* Instance routes */}
        <Route path="subnet/*" element={<SubnetRoutes />} /> {/* Instance routes */}
    </Routes>      
    );
}

export default ConsoleRoutes;