import React, { useState, useEffect } from "react";
import styles from './ENITable.module.css';
import TableHeader from './TableHeader';
import ENIRow from './ENIRow';
import TablePagination from './TablePagination';
import axios from 'axios';
import { useUserContext } from '../../../../../UserContext';
import { AWS_API_URL } from '../../../../../index';
import CreateENIModal from './CreateENIModal';
import { Menu, MenuButton, MenuItem } from '@aws-amplify/ui-react';

function ENITable() {
  const { currentUser, selectedCompany } = useUserContext(); // 최상위 레벨에서 호출
  const [selectedENITable, setSelectedENITable] = useState([]);
  const [displayedENITables, setDisplayedENITables] = useState([]);
  const [allENITables, setAllENITables] = useState(() => {
    const savedENITables = localStorage.getItem('allENITables');
    return savedENITables ? JSON.parse(savedENITables) : [];
  });

  // Fetch the latest ENI data
  const fetchENIData = async () => {
    try {
      const eniResponse = await axios.get(`${AWS_API_URL}/network-interface/describe?userId=${currentUser.id}&companyName=${selectedCompany}`);

      if (eniResponse.data.list && eniResponse.data.list.length > 0) {
        const latestENI = eniResponse.data.list.map((ENI) => ({
          Network_interface_ID: ENI.networkInterfaceId,
          Subnet_ID: ENI.subnetId,
          VPC_ID: ENI.vpcId,
          Status: ENI.status,
          Description: ENI.description,
          PrivateIpAddresses: ENI.privateIpAddresses,
          PublicIpAddresses: ENI.publicIpAddresses,
        }));

        setAllENITables(latestENI);
        setDisplayedENITables(latestENI);
        localStorage.setItem('allENITables', JSON.stringify(latestENI));
      }
    } catch (error) {
      console.error("Error fetching ENITable data:", error);
    }
  };

  useEffect(() => {
    fetchENIData();
  }, [currentUser, selectedCompany]);

  const handleCheckboxChange = (id) => {
    setSelectedENITable(prev =>
      prev.includes(id) ? prev.filter(eniId => eniId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedENITable.length === displayedENITables.length) {
      setSelectedENITable([]);
    } else {
      setSelectedENITable(displayedENITables.map(eni => eni.Network_interface_ID));
    }
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  // Delete functionality
  const handleDelete = async () => {
    if (selectedENITable.length === 0) {
      alert("Please select at least one ENI to delete.");
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedENITable.length} ENIs?`);

    if (confirmDelete) {
      try {
        for (const eniId of selectedENITable) {
          await axios.delete(`${AWS_API_URL}/network-interface/delete?networkInterfaceId=${eniId}&userId=${currentUser.id}`);
        }

        const updatedENITables = allENITables.filter(eni => !selectedENITable.includes(eni.Network_interface_ID));
        setAllENITables(updatedENITables);
        setDisplayedENITables(updatedENITables);
        localStorage.setItem('allENITables', JSON.stringify(updatedENITables));
        setSelectedENITable([]);
        alert(`Successfully deleted ${selectedENITable.length} ENIs.`);
      } catch (error) {
        console.error('Error deleting ENIs:', error);
        alert('An error occurred while deleting ENIs. Please try again.');
      }
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredENITables = allENITables.filter(eni =>
      eni.Network_interface_ID.toLowerCase().includes(searchTerm)
    );

    setDisplayedENITables(filteredENITables);
  };

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className={styles.scrollableTable}>
      <section className={styles.dataTable}>
        <header className={styles.tableHeader}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              aria-label="Search ENIs"
              onChange={handleSearch}
            />
            <button onClick={fetchENIData} className={styles.refreshButton}>
              Refresh
            </button>
            <button className={styles.createButton} onClick={handleCreate}>
              Create
            </button>
            <button className={styles.deleteButton} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </header>

        <div className={styles.tableWrapper}>
          <div className={styles.scrollableTable}>
          <TableHeader
            onSelectAll={handleSelectAll}
            allSelected={selectedENITable.length === displayedENITables.length && displayedENITables.length > 0}
          />

          {displayedENITables.map((eni, index) => (
            <ENIRow
              key={eni.Network_interface_ID}
              ENI={eni}
              isEven={index % 2 === 1}
              isSelected={selectedENITable.includes(eni.Network_interface_ID)}
              onCheckboxChange={() => handleCheckboxChange(eni.Network_interface_ID)}
            />
          ))}
          </div>
        </div>

        <TablePagination />

        <CreateENIModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      </section>
    </div>
  );
}

export default ENITable;