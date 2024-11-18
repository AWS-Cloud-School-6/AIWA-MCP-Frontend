import React, { useState, useEffect } from 'react';
import styles from './CreateIGModal.module.css';
import axios from 'axios';
import { AWS_API_URL } from '../../../../../index';
import { useUserContext } from '../../../../../UserContext';
import { Menu, MenuItem, MenuButton } from "@aws-amplify/ui-react";


function CreateIGModal({ isOpen, onClose }) {
  const [igData, setIGData] = useState({
    name: '',
    // vpcId 제거: 이제 selectedVPC를 사용합니다
  });

  const [latestVPC, setLatestVPC] = useState([]); // Holds the list of VPCs 
  const [selectedVPC, setSelectedVPC] = useState("non-selected"); // Default to non-selected

  const { currentUser, selectedCompany } = useUserContext(); 

  // Handle VPC selection
  const handleVPCSelect = (vpcName) => {
    setSelectedVPC(vpcName);
  };

    // Fetch the latest VPC data
    const fetchVPCData = async () => {
        try {
            const response = await axios.get(`${AWS_API_URL}/vpc/describe?userId=${currentUser.id}&companyName=${selectedCompany}`);
            if (response.data.list && response.data.list.length > 0) {
                setLatestVPC(response.data.list); // Set the list of VPCs
            }
        } catch (error) {
            console.error("Error fetching VPC data:", error);
        }
    };
  
    useEffect(() => {
        fetchVPCData();
    }, []);    

    const addNewIG = async () => {
    const newIG = {
      igwName: igData.name,
      vpcName: selectedVPC,
    };

    try {
      const response = await axios.post(`${AWS_API_URL}/internet-gateway/create?userId=${currentUser.id}`, newIG);
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating Internet Gateway:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIGData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewIG();    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Create New Internet Gateway</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={igData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            VPC ID:
            <Menu
                trigger={
                    <MenuButton style={{ textAlign: 'left', width: '100%', justifyContent: 'flex-start' }}>
                        {selectedVPC === "non-selected" ? "VPC 선택" : `${selectedVPC}`}
                    </MenuButton>
                }
                style={{ textAlign: 'left' }}  // Ensure left alignment for the menu
            >
                {latestVPC.length > 0 ? (
                    latestVPC.map((vpc) => (
                        <MenuItem key={vpc.vpcId} onClick={() => handleVPCSelect(vpc.tags.Name)}>
                            VPC ID: {vpc.vpcId} - {vpc.tags.Name || 'Unnamed'}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem>VPC 데이터 없음</MenuItem>
                )}
            </Menu>            
          </label>
          {/* 필요한 다른 입력 필드들을 추가하세요 */}
          <div className={styles.buttonGroup}>
            <button type="submit" onClick={handleSubmit}>Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateIGModal;
