// /Features/Instance/index.js
import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import InstanceRoutes from './Features/Instance';
import VPCRoutes from './Features/VPC';
import SubnetRoutes from './Features/VPC/Subnet';
import Console from './Console.js';
import Auth from '../Auth/Auth.js';
import Migration from './Migration/Migration';


function ConsoleRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Console />} />
            <Route path="/login" element={<Auth />} />
            <Route path="instances/*" element={<InstanceRoutes />} />
            <Route path="vpc/*" element={<VPCRoutes />} /> {/* Instance routes */}
            <Route path="subnet/*" element={<SubnetRoutes />} /> {/* Instance routes */}
            <Route path="/migration" element={<Migration />} /> {/* Instance routes */}
        </Routes>
    );
}

export default ConsoleRoutes;