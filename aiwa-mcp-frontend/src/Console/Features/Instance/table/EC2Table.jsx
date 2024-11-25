import React, { useState, useEffect, useCallback } from "react";
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
import 'react-notifications/lib/notifications.css'; // Import notification styles

const initialCustomers = [
  { id: 1, name: "Subin", number: "12345678", description: "EC2 사용 가능 상태", status: "available", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
  { id: 2, name: "Ahmad Rosser", number: "5684236527", description: "EC2 생성 중...", status: "pending", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
  { id: 3, name: "Zain Calzoni", number: "5684236528", description: "EC2 삭제 중...", status: "deleting", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
  { id: 4, name: "Leo Stanton", number: "5684236529", description: "EC2 성공적으로 삭제 됨", status: "deleted", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
];


function EC2Table() {
  const navigate = useNavigate();
  const [selectedEc2s, setSelectedEc2s] = useState([]);
  const [allEC2s, setAllEC2s] = useState([]);
  const [displayedEC2s, setDisplayedEC2s] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // 유저 정보 가져오기
  const { currentUser, selectedCompany } = useUserContext();

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fetchEC2Data = async () => {
    try {
      const response = await axios.get(`${AWS_API_URL}/ec2/describe?userId=${currentUser.id}&companyName=${selectedCompany}`);
      if (response.data.list && response.data.list.length > 0) {
        const latestEC2 = response.data.list.map((ec2) => ({
          number: ec2.ec2Id || '',
          name: ec2.tags.Name || '-',
          status: ec2.status || "available",
          cidr: ec2.cidr || '-',
          routingTable: ec2.routeTables && ec2.routeTables.length > 0
            ? ec2.routeTables.map(rt => rt.routeTableId).join(', ')
            : '-',
          subnet: ec2.subnets
        }));
        console.log("Processed EC2 data:", latestEC2);
        setAllEC2s(latestEC2);
        setDisplayedEC2s(latestEC2);
        localStorage.setItem('allEC2s', JSON.stringify(latestEC2));
      }
    } catch (error) {
      console.error("Error fetching EC2 data:", error);
    }
  };
  useEffect(() => {
    fetchEC2Data();
  }, []);

  const handleCheckboxChange = (selectedEc2) => {
    setSelectedEc2s(prev =>
      prev.some(ec2 => ec2.name === selectedEc2.name) // Check if the full EC2 object is already selected
        ? prev.filter(ec2 => ec2.name !== selectedEc2.name) // Remove the selected EC2 if it was already selected
        : [...prev, selectedEc2] // Add the full selected EC2 object
    );
    console.log("Selected EC2: ", selectedEc2);
  };



  const handleSelectAll = () => {
    if (selectedEc2s.length === displayedEC2s.length) {
      setSelectedEc2s([]);
    } else {
      setSelectedEc2s(displayedEC2s.map(ec2 => ec2.name));
    }
  };

  const handleEdit = () => {
    if (selectedEc2s.length !== 1) {
      alert("Please select only one EC2 to edit.");
      return;
    }
    const selectedEc2 = displayedEC2s.find(ec2 => ec2.tags.Name === selectedEc2s[0]);
    if (selectedEc2) {
      navigate(`/console/ec2/edit/${selectedEc2.name}`);
    } else {
      console.error("Selected EC2 not found");
    }
  };

  const handleDelete = () => {
    openDeleteModal();
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEC2s = allEC2s.filter(ec2 =>
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
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d322eb2c900627c1c0432bf23dfda65d4720f3b4b6381543703e324a72370a2e?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              aria-label="Search EC2s"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={fetchEC2Data} className={styles.filterButton} style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', padding: '0', margin: '0' }}>
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
          <button className={styles.AddEC2Button} onClick={() => setIsDropdownOpen((prev) => !prev)} style={{ marginRight: '10px' }}>
            {/* navigate('/console/ec2/create')} style={{ marginRight: '10px' }}> */}
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            Create EC2
          </button>
          {isDropdownOpen && (
            <div className={styles.dropdown}>
              <button onClick={() => navigate('/console/ec2/aws/create')} style={{ marginRight: '5px' }} disabled={isLoading}>AWS</button>
              <button onClick={() => navigate('/console/ec2/gcp/create')} style={{ marginRight: '10px' }} disabled={isLoading}>GCP</button>
            </div>
          )}
          <ActionButtons
            selectedCount={selectedEc2s.length}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDisabled={selectedEc2s.length !== 1}
          />
        </div>
      </header>
      <TableHeader
        onSelectAll={handleSelectAll}
        allSelected={selectedEc2s.length === displayedEC2s.length}
      />
      {displayedEC2s.map((ec2, index) => {
        console.log("Rendering EC2:", ec2);
        return (
          <EC2Row
            key={ec2.number}
            customer={ec2}
            isEven={index % 2 === 1}
            isSelected={selectedEc2s.some(selectedEc2 => selectedEc2.name === ec2.name)} // Check if the full EC2 object is selected
            onCheckboxChange={() => handleCheckboxChange(ec2)}
          />
        );
      })}
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
