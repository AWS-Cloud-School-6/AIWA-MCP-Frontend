import React, { useState, useEffect } from "react";
import styles from './EC2Table.module.css';
import TableHeader from './TableHeader';
import EC2Row from './EC2Row';
import TablePagination from './TablePagination';
import { useNavigate } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import axios from 'axios';
import { useUserContext } from '../../../../UserContext';
import { AWS_API_URL } from '../../../../index';
import { GCP_API_URL } from '../../../../index';
import DeleteEC2Modal from './DeleteEC2Modal';
import CreateEC2Modal from './CreateEC2Modal';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { fetchEC2AndGCPData } from "../Instance";

function EC2Table() {
  const navigate = useNavigate();
  const [selectedEc2s, setSelectedEc2s] = useState([]);
  const [allEC2s, setAllEC2s] = useState([]);
  const [displayedEC2s, setDisplayedEC2s] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { currentUser, selectedCompany, projectId, accessKey } = useUserContext();

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const refreshData = async () => {
    try {
      const data = await fetchEC2AndGCPData(currentUser, selectedCompany, projectId, accessKey);
      setAllEC2s(data);
      setDisplayedEC2s(data);
    } catch (error) {
      console.error("Error fetching EC2 data:", error);
      NotificationManager.error("Failed to refresh instance list", "Error");
    }
  };

  useEffect(() => {
    refreshData();
  }, [currentUser, selectedCompany, projectId, accessKey]);

  const handleCheckboxChange = (selectedEc2) => {
    setSelectedEc2s((prev) =>
      prev.some((ec2) => ec2.instanceId === selectedEc2.instanceId)
        ? prev.filter((ec2) => ec2.instanceId !== selectedEc2.instanceId)
        : [...prev, selectedEc2]
    );
  };

  const handleSelectAll = () => {
    if (selectedEc2s.length === displayedEC2s.length) {
      setSelectedEc2s([]);
    } else {
      setSelectedEc2s([...displayedEC2s]);
    }
  };

  const handleEdit = () => {
    if (selectedEc2s.length !== 1) {
      alert("Please select only one EC2 to edit.");
      return;
    }
    const selectedEc2 = selectedEc2s[0];
    navigate(`/console/ec2/edit/${selectedEc2.instanceId}`);
  };

  const handleDelete = () => openDeleteModal();

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEC2s = allEC2s.filter((ec2) =>
      ec2.name.toLowerCase().includes(searchTerm)
    );
    setDisplayedEC2s(filteredEC2s);
    setSelectedEc2s([]);
  };

  return (
    <section className={styles.dataTable}>
      <header className={styles.tableHeader}>
        <div className={styles.searchContainer}>
          <button className={styles.filterButton}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5432f397b9aa45f4a1f1b54a87e9fcf132e23908e329d59ba9ba1ef19388e8fe?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            </button>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search EC2s by Name..."
              onChange={handleSearch}
            />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={refreshData} 
            className={styles.filterButton} 
            style={{
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              marginRight: '10px'
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={styles.icon} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ width: '20px', height: '20px', padding: '0', margin: '0' }}
            >
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
          <button 
            className={styles.AddVPCButton} 
            onClick={() => setIsCreateModalOpen(true)} 
            style={{ marginRight: '10px' }}
          >
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" 
              alt="" 
              className={styles.icon} 
            />
            Create EC2
          </button>
          <ActionButtons
            selectedCount={selectedEc2s.length}
            onDelete={openDeleteModal}
            isDisabled={selectedEc2s.length !== 1}
          />
        </div>
      </header>
      <div className={styles.tableWrapper}>
        <div className={styles.scrollableTable}>     
          <TableHeader
            onSelectAll={handleSelectAll}
            allSelected={selectedEc2s.length === displayedEC2s.length}
          />
          {isLoading ? (
            <div className={styles.loadingState}>
              Loading EC2 data...
            </div>
          ) : (
            displayedEC2s.map((ec2, index) => (
              <EC2Row
                key={ec2.instanceId}
                ec2={ec2}
                isEven={index % 2 === 1}
                isSelected={selectedEc2s.some((selected) => selected.instanceId === ec2.instanceId)}
                onCheckboxChange={() => handleCheckboxChange(ec2)}
              />
            ))
          )}
        </div>
      </div>
      <TablePagination />
      {isCreateModalOpen && (
        <CreateEC2Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={refreshData}
          isLoading={isLoading}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteEC2Modal
          selectedEc2s={selectedEc2s}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
        />
      )}
    </section>
  );
}

export default EC2Table;
