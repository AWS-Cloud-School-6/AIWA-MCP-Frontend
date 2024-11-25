// /Features/Instance/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Securitygroup from './Securitygroup'; // Main EC2 Console page
import Securitygroup_AWS_Create from './Securitygroup_AWS_Create';
import Securitygroup_GCP_Create from './Securitygroup_GCP_Create';

function SecuritygroupRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Securitygroup />} />
            <Route path="/aws/create" element={<Securitygroup_AWS_Create />} />
            <Route path="/gcp/create" element={<Securitygroup_GCP_Create />} />
            {/* 여기에 추가해주세요*/}
        </Routes>
    );
}

export default SecuritygroupRoutes;