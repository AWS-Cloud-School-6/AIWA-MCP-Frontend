// /Features/Instance/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Instance from './Instance'; // Main EC2 Console page
import AWS_instance_launch from './AWS_instance_launch'; // AWS subpage
import GCP_instance_launch from './GCP_instance_launch'; // GCP subpage
import ENI from './eni/eni';
import Securitygroup from './securityGroup/Securitygroup';

function InstanceRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Instance />} /> {/* Main EC2 Console */}
            <Route path="aws" element={<AWS_instance_launch />} /> {/* AWS Subpage */}
            <Route path="gcp" element={<GCP_instance_launch />} /> {/* GCP Subpage */}
            <Route path="/eni" element={<ENI />} /> {/* Main EC2 Console */}
            <Route path="/securitygroup" element={<Securitygroup/>} />  {}
        </Routes>
    );
}

export default InstanceRoutes;