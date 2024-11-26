import React, { useState, useEffect } from 'react';
import { useNotification } from '../../NotificationContext';
import styles from './CreateSubnetModal.module.css';
import axios from 'axios';
import { AWS_API_URL, GCP_API_URL } from '../../../../../index';
import { useUserContext } from '../../../../../UserContext';

export default function CreateSubnetModal({ isOpen, onClose, onSubmit, isLoading }) {
  const notify = useNotification();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [subnetName, setSubnetName] = useState('');
  const [cidrBlock, setCidrBlock] = useState('');
  const [selectedVPC, setSelectedVPC] = useState('non-selected');
  const [availableVPCs, setAvailableVPCs] = useState([]);
  const { currentUser, selectedCompany } = useUserContext();
  const [selectedAZ, setSelectedAZ] = useState('non-selected');

  // AWS Availability Zones
  const availabilityZones = [
    "ap-northeast-2a",
    "ap-northeast-2b",
    "ap-northeast-2c",
    "ap-northeast-2d"
  ];

  useEffect(() => {
    fetchVPCs();
  }, []);

  const getApiUrl = (provider) => {
    return provider.toLowerCase() === 'aws' ? AWS_API_URL : GCP_API_URL;
  };

  const fetchVPCs = async () => {
    try {
      const apiUrl = getApiUrl(selectedProvider);
      const response = await axios.get(`${apiUrl}/vpc/describe?userId=${currentUser.id}&companyName=${selectedCompany}`);
      if (response.data.list) {
        setAvailableVPCs(response.data.list);
      }
    } catch (error) {
      console.error("Error fetching VPCs:", error);
      notify('Error fetching VPCs', 'error');
    }
  };

  const handleRefreshVPCs = async () => {
    await fetchVPCs();
    setSelectedVPC('non-selected');
  };

  const handleSubmit = () => {
    if (!subnetName || !cidrBlock || selectedVPC === 'non-selected' || selectedAZ === 'non-selected') {
      notify('VPC, Availability Zone, Subnet 이름과 CIDR 블록을 모두 입력해주세요.', 'warning');
      return;
    }

    const newSubnet = {
      provider: selectedProvider,
      subnetName,
      cidrBlock,
      vpcName: selectedVPC,
      availabilityZone: selectedAZ
    };

    onSubmit(newSubnet);
  };

  const handleBack = () => {
    setSelectedProvider(null);
    setSubnetName('');
    setCidrBlock('');
    setSelectedVPC('non-selected');
    setSelectedAZ('non-selected');
  };

  const handleClose = () => {
    handleBack();
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleClose}>×</button>
        
        {!selectedProvider ? (
          <div className={styles.providerSelection}>
            <h2>Select Cloud Provider</h2>
            <div className={styles.providerButtons}>
              <button 
                onClick={() => setSelectedProvider('AWS')}
                className={styles.providerButton}
              >
                AWS
              </button>
              <button 
                onClick={() => setSelectedProvider('GCP')}
                className={styles.providerButton}
              >
                GCP
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.subnetForm}>
            <h2>Create {selectedProvider} Subnet</h2>
            <div className={styles.formGroup}>
              <label>Subnet Name</label>
              <input
                type="text"
                value={subnetName}
                onChange={(e) => setSubnetName(e.target.value)}
                placeholder="Enter subnet name"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label>CIDR Block</label>
              <input
                type="text"
                value={cidrBlock}
                onChange={(e) => setCidrBlock(e.target.value)}
                placeholder="e.g., 10.0.1.0/24"
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <div className={styles.vpcSelectContainer}>
                <label>VPC</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <select
                    value={selectedVPC}
                    onChange={(e) => setSelectedVPC(e.target.value)}
                    className={styles.input}
                    style={{ flex: 1 }}
                  >
                    <option value="non-selected">Select VPC</option>
                    {availableVPCs.map((vpc) => (
                      <option key={vpc.vpcId} value={vpc.tags.Name}>
                        VPC ID: {vpc.vpcId} - {vpc.tags.Name || 'Unnamed'}
                      </option>
                    ))}
                  </select>
                  <button 
                    onClick={handleRefreshVPCs}
                    className={styles.refreshButton}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: '20px', height: '20px' }}
                    >
                      <path d="M23 4v6h-6" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Availability Zone</label>
              <select
                value={selectedAZ}
                onChange={(e) => setSelectedAZ(e.target.value)}
                className={styles.input}
              >
                <option value="non-selected">Select Availability Zone</option>
                {availabilityZones.map((az) => (
                  <option key={az} value={az}>
                    {az}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.buttonGroup}>
              <button 
                onClick={handleBack}
                className={styles.backButton}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className={styles.submitButton}
                disabled={!subnetName || !cidrBlock || selectedVPC === 'non-selected' || selectedAZ === 'non-selected' || isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Subnet'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}