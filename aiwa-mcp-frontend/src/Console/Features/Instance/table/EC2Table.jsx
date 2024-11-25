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
import DeleteEC2Modal from './DeleteEC2Modal';

function EC2Table() {
  const navigate = useNavigate();
  const [selectedEc2s, setSelectedEc2s] = useState([]);
  const [allEC2s, setAllEC2s] = useState([]);
  const [displayedEC2s, setDisplayedEC2s] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { currentUser, selectedCompany } = useUserContext();

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const fetchEC2Data = async () => {
    try {
      const response = await axios.get(
        `${AWS_API_URL}/ec2/describe?userId=${currentUser.id}&companyName=${selectedCompany}`
      );

      if (response.data.list && response.data.list.length > 0) {
        const processedEC2s = response.data.list.map((ec2) => ({
          instanceId: ec2.instanceId || 'N/A', // EC2 인스턴스 ID
          state: ec2.state || 'Unknown', // 상태
          name: ec2.tags?.Name || '-', // 태그에서 Name 추출
          publicIpAddress: ec2.publicIpAddress || 'N/A', // 퍼블릭 IP
          privateIpAddress: ec2.privateIpAddress || 'N/A' // 프라이빗 IP
        }));

        console.log("Processed EC2 data:", processedEC2s);
        setAllEC2s(processedEC2s);
        setDisplayedEC2s(processedEC2s);
      }
    } catch (error) {
      console.error("Error fetching EC2 data:", error);
    }
  };

  useEffect(() => {
    fetchEC2Data();
  }, []);

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
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search EC2s by Name..."
              onChange={handleSearch}
            />
          </div>
        </div>
        <ActionButtons
          selectedCount={selectedEc2s.length}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDisabled={selectedEc2s.length !== 1}
        />
      </header>
      <TableHeader
        onSelectAll={handleSelectAll}
        allSelected={selectedEc2s.length === displayedEC2s.length}
      />
      {displayedEC2s.map((ec2, index) => (
        <EC2Row
          key={ec2.instanceId}
          ec2={ec2}
          isEven={index % 2 === 1}
          isSelected={selectedEc2s.some((selected) => selected.instanceId === ec2.instanceId)}
          onCheckboxChange={() => handleCheckboxChange(ec2)}
        />
      ))}
      <TablePagination />
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
