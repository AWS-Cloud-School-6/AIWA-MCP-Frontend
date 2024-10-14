import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Auth from './Auth/Auth.js';
import reportWebVitals from './reportWebVitals';
import ConsoleRoutes from './Console';
import Main from './Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} /> {/* Instance routes */}
        <Route path="/login" element={<Auth />} /> {/* Instance routes */}
        <Route path="console/*" element={<ConsoleRoutes />} /> {/* Instance routes */}
        {/* Add other main routes here if needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
