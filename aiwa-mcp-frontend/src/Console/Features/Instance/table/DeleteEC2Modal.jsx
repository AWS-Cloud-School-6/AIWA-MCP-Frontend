import React, { useState, useEffect } from 'react';
import styles from './DeleteEC2Modal.module.css';
import axios from 'axios';
import { AWS_API_URL } from '../../../../index';
import { useUserContext } from '../../../../UserContext';

function DeleteEC2Modal({ isOpen, onClose, selectedEc2s, setSelectedEc2s }) { // Assuming setSelectedEc2s is passed as a prop
  const { currentUser, selectedCompany } = useUserContext();
  const [ec2s, setEc2s] = useState([]);
  const [currentEC2, setCurrentEC2] = useState(null);
  const [hasSubnets, setHasSubnets] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (selectedEc2s && selectedEc2s.length > 0) {
        // Use the provided selectedEc2s
        console.log("Selected EC2s:", selectedEc2s[0]);
        setCurrentEC2(selectedEc2s[0]);
        setHasSubnets(selectedEc2s[0].subnet && selectedEc2s[0].subnet.length > 0);
        console.log("Hello1234", hasSubnets)
      } else {
        fetchEC2Data(); // Fetch data if none are selected
      }
    }
  }, [isOpen, selectedEc2s]);

  const fetchEC2Data = async () => {
    try {
      const response = await axios.get(`${AWS_API_URL}/ec2/describe?userId=${currentUser.id}&companyName=${selectedCompany}`);
      if (response.data.list && response.data.list.length > 0) {
        const fetchedEC2s = response.data.list.map((ec2) => ({
          number: ec2.ec2Id || '',
          name: ec2.tags.Name || '-',
          status: ec2.status || "available",
          cidr: ec2.cidr || '-',
          routingTable: ec2.routeTables && ec2.routeTables.length > 0
            ? ec2.routeTables.map(rt => rt.routeTableId).join(', ')
            : '-',
          subnet: ec2.subnets
        }));

        // Find the matched EC2

        const matchedEC2 = fetchedEC2s.find(ec2 => ec2.number === currentEC2.number);

        if (matchedEC2) {
          setCurrentEC2(matchedEC2); // Also set the current EC2
          setHasSubnets(matchedEC2.subnet && matchedEC2.subnet.length > 0); // Update subnet check
        } else {
          console.log("No matching EC2 found in fetched data.");
        }

      }
    } catch (error) {
      console.error("Error fetching EC2 data:", error);
    }
  };

  const subnetDelete = async (subnetId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this subnet?`);
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${AWS_API_URL}/subnet/delete?subnetName=${currentEC2.subnet[0].tags.Name}&userId=${currentUser.id}`);
        console.log("Subnet deleted successfully:", response.data);
        // Re-fetch EC2 data after deletion
        await fetchEC2Data(); // This will also check for matching EC2s
      } catch (error) {
        console.error('Error deleting Subnet:', error);
      }
    }
  };
  const refreshPage = () => {
    window.location.reload();
  };
  const handleEC2Delete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this EC2?`);
    if (confirmDelete) {
      try {
        // Make a POST request to delete EC2s
        console.log("selected ec2: ", currentEC2);
        const response = axios.delete(`${AWS_API_URL}/ec2/delete?ec2Name=${currentEC2.name}&userId=${currentUser.id}`);

        // Optionally handle the response here
        // console.log("Delete Ec2", response.data.msg);

        // Filter out the deleted EC2s from the local state
        refreshPage();
      } catch (error) {
        console.error('Error deleting EC2s:', error);
        // Handle the error appropriately (e.g., show an error message)
      }

    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to delete the EC2
    onClose();
  };

  if (!isOpen || !currentEC2) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Delete EC2</h2>
        <form onSubmit={handleSubmit}>
          {currentEC2 && (
            <div>
              <h3>EC2 이름: {currentEC2.name}</h3>
            </div>
          )}
          <br />
          {hasSubnets ? (
            <div>
              <h3>Please delete Subnets before deleting the EC2:</h3>
              <ul>
                {currentEC2.subnet.map((subnet) => (
                  <li key={subnet.subnetId}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4>Subnet Name:</h4>
                      <span style={{ marginLeft: '10px' }}>{subnet.tags.Name || 'Unnamed'}</span>
                      <button
                        type="button"
                        onClick={fetchEC2Data}
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
            <div>No subnets available for {currentEC2.name || 'Unnamed'}</div>
          )}
          <div className={styles.buttonGroup}>
            <button type="submit" onClick={handleEC2Delete} disabled={hasSubnets} className={styles.deleteButton}>Delete</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteEC2Modal;
