import React, { useState, useEffect } from 'react';
import styles from './CreateRTModal.module.css';
import axios from 'axios';
import { AWS_API_URL } from '../../../../../index';
import { useUserContext } from '../../../../../UserContext';
import { Menu, MenuItem, MenuButton } from "@aws-amplify/ui-react";

// cognito test

function CreateRTModal({ isOpen, onClose }) {
  const [rtData, setRTData] = useState({
    name: '',
  });

  const [latestVPC, setLatestVPC] = useState([]); 
  const [selectedVPC, setSelectedVPC] = useState("non-selected");

  const { currentUser } = useUserContext(); 

  const handleVPCSelect = (vpcName) => {
    setSelectedVPC(vpcName);
  };

  const fetchVPCData = async () => {
    try {
      const response = await axios.get(`${AWS_API_URL}/vpc/describe?userId=${currentUser.id}`);
      if (response.data.list && response.data.list.length > 0) {
        setLatestVPC(response.data.list);
      }
    } catch (error) {
      console.error("Error fetching VPC data:", error);
    }
  };

  useEffect(() => {
    fetchVPCData();
  }, []);    

  const addNewRT = async () => {
    const newRT = {
      routeTableName: rtData.name,
      vpcName: selectedVPC,
      userId: currentUser.id,
    };

    try {
      const response = await axios.post(`${AWS_API_URL}/route-table/create`, newRT);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating Route Table:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRTData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewRT();    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create New Route Table</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={rtData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            VPC:
            <Menu
              trigger={
                <MenuButton style={{ textAlign: 'left', width: '100%', justifyContent: 'flex-start' }}>
                  {selectedVPC === "non-selected" ? "Select VPC" : `${selectedVPC}`}
                </MenuButton>
              }
              style={{ textAlign: 'left' }}
            >
              {latestVPC.length > 0 ? (
                latestVPC.map((vpc) => (
                  <MenuItem key={vpc.vpcId} onClick={() => handleVPCSelect(vpc.tags.Name)}>
                    <div>
                        <div>VPC ID: {vpc.vpcId}</div>
                        <div style={{ color: 'grey', fontSize: '0.8em' }}>{vpc.tags.Name || 'Unnamed'}</div>
                    </div>
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No VPC data available</MenuItem>
              )}
            </Menu>            
          </label>
          <div className={styles.buttonGroup}>
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRTModal; 