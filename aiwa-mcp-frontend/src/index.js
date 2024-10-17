// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';

import { UserProvider } from './UserContext'; // Import UserProvider
import reportWebVitals from './reportWebVitals';
import ConsoleRoutes from './Console';
import Auth from './Auth/Auth.js';
import Main from './Main/Main';
import ProtectedRoute from './ProtectedRoute';

export const API_URL = 'http://k8s-default-terrafor-b27d0c3141-1770509579.ap-northeast-2.elb.amazonaws.com:80/api';

function App() {
  return (
    <Authenticator.Provider>
      <UserProvider> {/* Wrap the entire app with UserProvider */}
        <Routes>
          <Route path="/" element={<Main />} /> {/* Public route */}
          <Route path="/login" element={<Auth />} /> {/* Login route */}
          <Route
            path="console/*"
            element={
              <ProtectedRoute>
                <ConsoleRoutes />
              </ProtectedRoute>
            }
          /> {/* Protected route */}
        </Routes>
      </UserProvider>
    </Authenticator.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Optional performance metrics
reportWebVitals();
