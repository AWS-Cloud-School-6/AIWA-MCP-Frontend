import React, { useState, useEffect, useCallback } from "react";
import styles from './SecuritygroupTable.module.css';
import TableHeader from './TableHeader';
import SecuritygroupRow from './SecuritygroupRow';
import TablePagination from './TablePagination';
import { useNavigate } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import axios from 'axios';
import { useUserContext } from '../../../../../UserContext';
import { AWS_API_URL } from '../../../../../index';

function SecuritygroupTable() {
  const navigate = useNavigate();
  const [selectedSecuritygroups, setSelectedSecuritygroups] = useState([]);
  const [allSecuritygroups, setAllSecuritygroups] = useState([]);
  const [displayedSecuritygroups, setDisplayedSecuritygroups] = useState([]);
  const { currentUser, selectedCompany } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Security Group 데이터 가져오기
  const fetchSecuritygroupData = async () => {
    try {
      const response = await axios.get(`${AWS_API_URL}/security-group/describe?userId=${currentUser.id}&companyName=${selectedCompany}`);
      if (response.data.list && response.data.list.length > 0) {
        const latestSecuritygroups = response.data.list.map((securitygroup) => ({
          groupId: securitygroup.groupId || 'N/A',
          groupName: securitygroup.groupName || 'N/A',
          tagName: securitygroup.tags?.Name || '-',
          vpcId: securitygroup.vpcId || 'N/A'
        }));
        console.log("Fetched Security Groups: ", latestSecuritygroups);
        setAllSecuritygroups(latestSecuritygroups);
        setDisplayedSecuritygroups(latestSecuritygroups);
      }
    } catch (error) {
      console.error("Error fetching Security Group data:", error);
    }
  };

  useEffect(() => {
    fetchSecuritygroupData();
  }, []);

  const handleCheckboxChange = (groupId) => {
    setSelectedSecuritygroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSecuritygroups.length === displayedSecuritygroups.length) {
      setSelectedSecuritygroups([]);
    } else {
      setSelectedSecuritygroups(displayedSecuritygroups.map((securitygroup) => securitygroup.groupId));
    }
  };

  const handleEdit = () => {
    if (selectedSecuritygroups.length !== 1) {
      alert("Please select only one security group to edit.");
      return;
    }
    const selectedGroup = displayedSecuritygroups.find((securitygroup) => securitygroup.groupId === selectedSecuritygroups[0]);
    if (selectedGroup) {
      navigate(`/console/securitygroup/edit/${selectedGroup.groupId}`);
    } else {
      console.error("Selected Security Group not found");
    }
  };

  const handleDelete = () => {
    if (selectedSecuritygroups.length === 0) {
      alert("Please select at least one security group to delete.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedSecuritygroups.length} Security Group(s)?`);
    if (confirmDelete) {
      try {
        const updatedSecuritygroups = allSecuritygroups.filter(
          (securitygroup) => !selectedSecuritygroups.includes(securitygroup.groupId)
        );
        setAllSecuritygroups(updatedSecuritygroups);
        setDisplayedSecuritygroups(updatedSecuritygroups);
        setSelectedSecuritygroups([]);
      } catch (error) {
        console.error("Error deleting Security Groups:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredSecuritygroups = allSecuritygroups.filter((securitygroup) =>
      securitygroup.groupName.toLowerCase().includes(searchTerm) ||
      securitygroup.tagName.toLowerCase().includes(searchTerm) ||
      securitygroup.vpcId.toLowerCase().includes(searchTerm)
    );
    setDisplayedSecuritygroups(filteredSecuritygroups);
    setSelectedSecuritygroups([]);
  };

  return (
    <section className={styles.dataTable}>
      <header className={styles.tableHeader}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search Security Groups..."
            onChange={handleSearch}
          />
        </div>
        <ActionButtons
          selectedCount={selectedSecuritygroups.length}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDisabled={selectedSecuritygroups.length !== 1}
        />
      </header>
      <div className={styles.scrollableTable}>
        <TableHeader
          onSelectAll={handleSelectAll}
          allSelected={selectedSecuritygroups.length === displayedSecuritygroups.length && displayedSecuritygroups.length > 0}
        />
        {displayedSecuritygroups.map((securitygroup, index) => (
          <SecuritygroupRow
            key={securitygroup.groupId}
            securitygroup={securitygroup}
            isEven={index % 2 === 1}
            isSelected={selectedSecuritygroups.includes(securitygroup.groupId)}
            onCheckboxChange={() => handleCheckboxChange(securitygroup.groupId)}
          />
        ))}
      </div>
      <TablePagination />
    </section>
  );
}

export default SecuritygroupTable;
