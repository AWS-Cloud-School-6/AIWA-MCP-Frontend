import React, { useState, useEffect } from 'react';
import styles from './DeleteVPCModal.module.css';
import axios from 'axios';
import { AWS_API_URL, GCP_API_URL } from '../../../../index';
import { useUserContext } from '../../../../UserContext';
import { useNotification } from '../NotificationContext';
import { fetchVPCData } from '../VPC';
import { currentUser, selectedCompany, projectId } from '../../../../UserContext';

function DeleteVPCModal({ isOpen, onClose, selectedVpcs }) { // Assuming setSelectedVpcs is passed as a prop
  const { currentUser, selectedCompany, projectId } = useUserContext();
  const [vpcs, setVpcs] = useState([]);
  const [currentVPC, setCurrentVPC] = useState(null);
  const [hasSubnets, setHasSubnets] = useState(false);
  const notificationService = useNotification();

  useEffect(() => {
    if (isOpen) {
      if (selectedVpcs && selectedVpcs.length > 0) {
        // Use the provided selectedVpcs
        console.log("Selected VPCs:", selectedVpcs[0]);
        setCurrentVPC(selectedVpcs[0]);
        setHasSubnets(selectedVpcs[0].subnet && selectedVpcs[0].subnet.length > 0);
      } else {
        fetchVPCData({
          currentUser,
          selectedCompany,
          projectId 
        }); // Fetch data if none are selected
      }
    }
  }, [isOpen, selectedVpcs]);

  // const fetchVPCData = async () => {
  //   try {
  //     const response = await axios.get(`${AWS_API_URL}/vpc/describe?userId=${currentUser.id}&companyName=${selectedCompany}`);
  //     if (response.data.list && response.data.list.length > 0) {
  //       const fetchedVPCs = response.data.list.map((vpc) => ({
  //         number: vpc.vpcId || '',
  //         name: vpc.tags.Name || '-',
  //         status: vpc.status || "available",
  //         cidr: vpc.cidr || '-',
  //         routingTable: vpc.routeTables && vpc.routeTables.length > 0
  //           ? vpc.routeTables.map(rt => rt.routeTableId).join(', ')
  //           : '-',
  //         subnet: vpc.subnets
  //       }));

  //       // Find the matched VPC

  //       const matchedVPC = fetchedVPCs.find(vpc => vpc.number === currentVPC.number);

  //       if (matchedVPC) {
  //         setCurrentVPC(matchedVPC); // Also set the current VPC
  //         setHasSubnets(matchedVPC.subnet && matchedVPC.subnet.length > 0); // Update subnet check
  //       } else {
  //         console.log("No matching VPC found in fetched data.");
  //       }

  //     }
  //   } catch (error) {
  //     console.error("Error fetching VPC data:", error);
  //   }
  // };

  const subnetDelete = async (subnetId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this subnet?`);
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${AWS_API_URL}/subnet/delete?subnetName=${currentVPC.subnet[0].tags.Name}&userId=${currentUser.id}`);
        console.log("Subnet deleted successfully:", response.data);
        // Re-fetch VPC data after deletion
      } catch (error) {
        console.error('Error deleting Subnet:', error);
      }
    }
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const handleVPCDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this VPC?`);
    if (!confirmDelete) return;

    let loadingNotification;
    try {
      loadingNotification = notificationService.notify('Deleting VPC...', 'loading');
      
      await axios.delete(
        `${currentVPC.provider === 'AWS' ? AWS_API_URL : GCP_API_URL}/vpc/delete?vpcName=${currentVPC.name}&userId=${currentUser.id}`
      );
      
      if (loadingNotification) {
        loadingNotification.close();
      }

      notificationService.notify('VPC deleted successfully!', 'success', 3000);
      
      // VPC 데이터를 다시 불러오기 전에 모달을 닫음
      onClose();
      
      // 약간의 지연 후 데이터 새로고침
      setTimeout(async () => {
        await fetchVPCData({
          currentUser,
          selectedCompany,
          projectId
        });
      }, 500);
      
    } catch (error) {
      if (loadingNotification) {
        loadingNotification.close();
      }
      console.error('Error deleting VPCs:', error);
      notificationService.notify('Failed to delete VPC. Please try again.', 'error', 3000);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to delete the VPC
    onClose();
  };

  if (!isOpen || !currentVPC) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Delete VPC</h2>
        <form onSubmit={handleSubmit}>
          {currentVPC && (
            <div>
              <h3>VPC 이름: {currentVPC.name}</h3>
            </div>
          )}
          <br />
          {hasSubnets ? (
            <div>
              <h3>Please delete Subnets before deleting the VPC:</h3>
              <ul>
                {currentVPC.subnet.map((subnet) => (
                  <li key={subnet.subnetId}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4>Subnet Name:</h4>
                      <span style={{ marginLeft: '10px' }}>{subnet.tags.Name || 'Unnamed'}</span>
                      <button
                        type="button"
                          onClick={() => fetchVPCData({
                          currentUser,
                          selectedCompany,
                          projectId
                        })}
                        className={styles.filterButton} style={{ marginLeft: '100px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                          <path d="M23 4v6h-6" />
                          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default action in case of submission
                          subnetDelete(subnet.subnetId);
                        }}
                        className={styles.deleteSubnetsButton}
                      >
                        Delete Subnets
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No subnets available for {currentVPC.name || 'Unnamed'}</div>
          )}
          <div className={styles.buttonGroup}>
            <button type="submit" onClick={handleVPCDelete} disabled={hasSubnets} className={styles.deleteButton}>Delete</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteVPCModal;
