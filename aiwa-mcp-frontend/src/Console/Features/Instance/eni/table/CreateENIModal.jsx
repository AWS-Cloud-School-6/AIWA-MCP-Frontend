import React, { useState, useEffect } from 'react';
import styles from './CreateENIModal.module.css';
import axios from 'axios';
import { AWS_API_URL } from '../../../../../index';
import { useUserContext } from '../../../../../UserContext';
import { Menu, MenuItem, MenuButton } from "@aws-amplify/ui-react";

// cognito test

function CreateENIModal({ isOpen, onClose }) {
  const [eniData, setENIData] = useState({
    eniName: '',
  });

  const [latestENI, setLatestENI] = useState([]);
  const [selectedENI, setSelectedENI] = useState("non-selected");

  const { currentUser, selectedCompany } = useUserContext();

  const handleENISelect = (eniName) => {
    setSelectedENI(eniName);
  };

  const fetchENIData = async () => {
    try {
      const response = await axios.get(`${AWS_API_URL}/network-interface/describe?userId=${currentUser.id}`);
      if (response.data.list && response.data.list.length > 0) {
        setLatestENI(response.data.list);
      }
    } catch (error) {
      console.error("Error fetching ENI data:", error);
    }
  };

  useEffect(() => {
    fetchENIData();
  }, []);

  const addNewENI = async () => {
    const newENI = {
      Network_interface_ID: eniData.networkInterfaceId,
      Subnet_ID: eniData.subnetId,
      VPC_ID: eniData.vpcId,
      Status: eniData.status,
      Description: eniData.description,
      privateIpAddresses: eniData.privateIpAddresses,
      publicIpAddresses: eniData.publicIpAddresses,
    };

    // try {
    //   const response = await axios.post(`${AWS_API_URL}/route-table/create`, newENI);
    //   console.log(response.data);
    //   onClose();
    // } catch (error) {
    //   console.error("Error creating Route Table:", error);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setENIData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewENI();
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
              value={eniData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            ENI:
            <Menu
              trigger={
                <MenuButton style={{ textAlign: 'left', width: '100%', justifyContent: 'flex-start' }}>
                  {selectedENI === "non-selected" ? "Select ENI" : `${selectedENI}`}
                </MenuButton>
              }
              style={{ textAlign: 'left' }}
            >
              {latestENI.length > 0 ? (
                latestENI.map((eni) => (
                  <MenuItem key={eni.vpcId} onClick={() => handleENISelect(eni.tags.Name)}>
                    <div>
                      <div>ENI ID: {eni.vpcId}</div>
                      <div style={{ color: 'grey', fontSize: '0.8em' }}>{eni.tags.Name || 'Unnamed'}</div>
                    </div>
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No ENI data available</MenuItem>
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

export default CreateENIModal; 