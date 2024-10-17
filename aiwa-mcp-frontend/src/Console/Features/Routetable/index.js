// /Features/Instance/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Routetable from './Routetable'; // Main EC2 Console page

function Routetable() {
    return (
        <Routes>
            <Route path="/" element={<Routetable />} />
            {/* 여기에 추가해주세요*/}
        </Routes>
    );
}

export default Routetable;