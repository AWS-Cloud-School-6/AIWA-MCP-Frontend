import React, { useState } from 'react';
import { useNotification } from '../NotificationContext';
import styles from './CreateVPCModal.module.css';

export default function CreateVPCModal({ isOpen, onClose, onSubmit, isLoading }) {
  const notify = useNotification();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [vpcName, setVpcName] = useState('');
  const [cidrBlock, setCidrBlock] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (selectedProvider === 'AWS' && (!vpcName || !cidrBlock)) {
      notify('Please fill in VPC name and CIDR block', 'warning');
      return;
    } else if (selectedProvider === 'GCP' && !vpcName) {
      notify('Please fill in VPC name', 'warning'); 
      return;
    }
    
    const vpcData = {
      provider: selectedProvider,
      vpcName,
      cidrBlock
    };
    
    handleClose();
    notify(`Creating VPC: ${vpcName}...`, 'info', 0);
    
    try {
      await onSubmit(vpcData);
      notify(`Successfully created VPC: ${vpcName}`, 'success');
    } catch (error) {
      notify(error.message || 'Failed to create VPC', 'error');
    }
  };

  const handleBack = () => {
    setSelectedProvider(null);
    setVpcName('');
    setCidrBlock('');
  };

  const handleClose = () => {
    handleBack();
    onClose();
  };

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
          <div className={styles.vpcForm}>
            <h2>Create {selectedProvider} VPC</h2>
            <div className={styles.formGroup}>
              <label>VPC Name</label>
              <input
                type="text"
                value={vpcName}
                onChange={(e) => setVpcName(e.target.value)}
                placeholder="Enter VPC name"
                className={styles.input}
              />
            </div>
            {selectedProvider === 'AWS' && (
              <div className={styles.formGroup}>
                <label>CIDR Block</label>
                <input
                  type="text"
                  value={cidrBlock}
                  onChange={(e) => setCidrBlock(e.target.value)}
                  placeholder="e.g., 10.0.0.0/16"
                  className={styles.input}
                />
              </div>
            )}
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
                disabled={!vpcName || (selectedProvider === 'AWS' && !cidrBlock) || isLoading}
              >
                {isLoading ? 'Creating...' : 'Create VPC'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 