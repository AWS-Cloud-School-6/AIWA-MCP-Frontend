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

function EC2Table() {
  const navigate = useNavigate();
  const [selectedEc2s, setSelectedEc2s] = useState([]);
  const [allEC2s, setAllEC2s] = useState([]);
  const [displayedEC2s, setDisplayedEC2s] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { currentUser, selectedCompany, projectId, accessKey } = useUserContext();

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const fetchEC2AndGCPData = async () => {
    try {
      const [ec2Response, gcpResponse] = await Promise.all([
        accessKey
          ? axios.get(
            `${AWS_API_URL}/ec2/describe?userId=${currentUser.id}&companyName=${selectedCompany}`
            )
          : Promise.resolve({data: {}}),
        projectId
          ? axios.get(
              `${GCP_API_URL}/vm/describe?projectId=${projectId}&userId=${currentUser.id}`
            )
          : Promise.resolve({ data: {} }), // projectId가 없으면 빈 객체를 담은 resolved Promise 반환
      ]);
      console.log(projectId);
  
      // EC2 데이터 처리
      const processedEC2s =
        ec2Response.data.list?.map((ec2) => ({
          instanceId: ec2.instanceId || "N/A",
          state: ec2.state || "Unknown",
          name: ec2.tags?.["Name"] || "-",
          publicIpAddress: ec2.publicIpAddress || "N/A",
          privateIpAddress: ec2.privateIpAddress || "N/A",
          type: "AWS", // AWS 데이터임을 구분하기 위해 추가
        })) || [];
  
      // GCP 데이터 처리
      const processedGCPs =
        gcpResponse.data.list?.map((vm) => ({
          name: vm.name || "N/A",
          status: vm.status || "Unknown",
          internalIp: vm.networkInterfaces[0]?.internalIp || "N/A",
          externalIp: vm.networkInterfaces[0]?.externalIp || "N/A",
          type: "GCP", // GCP 데이터임을 구분하기 위해 추가
        })) || [];
  
      // EC2와 GCP 데이터를 통합
      const allVMs = [...processedEC2s, ...processedGCPs];
      setAllEC2s(allVMs);
      setDisplayedEC2s(allVMs);
    } catch (error) {
      console.error("Error fetching EC2 or GCP data:", error);
    }
  };
  
  useEffect(() => {
    fetchEC2AndGCPData();
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
