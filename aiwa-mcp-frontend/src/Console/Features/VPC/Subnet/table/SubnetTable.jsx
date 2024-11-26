import React, { useState, useEffect, useCallback } from "react";
import styles from './SubnetTable.module.css';
import TableHeader from './TableHeader';
import SubnetRow from './SubnetRow';
import TablePagination from './TablePagination';
import { useNavigate, useLocation } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import axios from 'axios';
import { useUserContext } from '../../../../../UserContext';
import { AWS_API_URL, GCP_API_URL } from '../../../../../index';
import CreateSubnetModal from './CreateSubnetModal';
import { NotificationManager } from 'react-notifications';



const initialCustomers = [
  { id: 1, name: "Subin", number: "12345678", status: "available", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", availableip: "4012", az: "ap-northeast-2a" },
];

function SubnetTable({ customer, onEdit, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSubnets, setSelectedSubnets] = useState([]);
  // const [allSubnets, setAllSubnets] = useState([]);
  const [displayedSubnets, setDisplayedSubnets] = useState([]);
  const [allSubnets, setAllSubnets] = useState(() => {
    const savedSubnets = localStorage.getItem('allSubnets');
    return savedSubnets ? JSON.parse(savedSubnets) : initialCustomers;
  });
  // 유저 정보 가져오기
  const { currentUser, selectedCompany, projectId, accessKey } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  // 리렌더링될 때마다 새로운 함수가 생성되지 않도록 구현
  const addNewSubnet = useCallback((newSubnet) => {
    setAllSubnets(prevSubnets => {
      const existingSubnet = prevSubnets.find(subnet => subnet.name === newSubnet.name);
      if (existingSubnet) {
        console.log("Subnet with this name already exists");
        return prevSubnets;
      }
      const updatedSubnets = [...prevSubnets, newSubnet];
      localStorage.setItem('allSubnets', JSON.stringify(updatedSubnets));
      return updatedSubnets;
    });
  }, []);
  const fetchSubnetData = async () => {
    try {
      const [awsResponse, gcpResponse] = await Promise.all([
        accessKey
          ? axios.get(
              `${AWS_API_URL}/subnet/describe?userId=${currentUser.id}&companyName=${selectedCompany}`
            )
          : Promise.resolve({ data: {} }),
        projectId
          ? axios.get(
              `${GCP_API_URL}/subnet/describe?projectId=${projectId}&userId=${currentUser.id}`
            )
          : Promise.resolve({ data: {} }),
      ]);
  
      // AWS Subnet 데이터 처리
      const processedAWSSubnets =
        awsResponse.data.list?.map((subnet) => ({
          type: "AWS", // GCP 데이터임을 구분하기 위해 추가
          number: subnet.subnetId || "N/A",
          name: subnet.tags?.Name || "-",
          status: subnet.status || "available",
          cidr: subnet.cidr || "-",
          vpcId: subnet.vpcId || "-",
          az: "ap-northeast-2",
          availableip: calculateAvailableIPs(subnet.cidr),
        })) || [];
  
      // GCP Subnet 데이터 처리
      const processedGCPSubnets =
        gcpResponse.data.list?.map((subnet) => ({
          type: "GCP", // GCP 데이터임을 구분하기 위해 추가
          number: subnet.subnetId || "N/A",
          name: subnet.name || "-",
          status: subnet.status || "available",
          cidr: subnet.cidr || "-",
          vpcId: subnet.vpcId || "-",
          availableip: calculateAvailableIPs(subnet.cidr),
          az: "asia-northeast3",
        })) || [];
  
      // AWS와 GCP Subnet 데이터를 통합
      const allSubnets = [...processedAWSSubnets, ...processedGCPSubnets];
      console.log("Subnet 데이터: ", allSubnets);
  
      setAllSubnets(allSubnets);
      setDisplayedSubnets(allSubnets);
      localStorage.setItem("allSubnets", JSON.stringify(allSubnets));
    } catch (error) {
      console.error("Subnet 데이터를 가져오는 중 오류 발생:", error);
    }
  };
  
  useEffect(() => {
    fetchSubnetData();
  }, []);
  
  //Calculate Available IPs
  function calculateAvailableIPs(cidr) {
    // Split the input into base IP and suffix (e.g., "192.168.1.0/24")
    const [baseIP, prefixLength] = cidr.split('/');

    // Convert the prefix length to an integer (e.g., "/24" becomes 24)
    const maskBits = parseInt(prefixLength, 10);

    // Calculate the total number of IP addresses in the block (2^(32 - maskBits))
    const totalIPs = Math.pow(2, 32 - maskBits);

    // Subtract 2 for the network and broadcast addresses
    const availableIPs = totalIPs - 2;

    // Return the result
    return availableIPs;
  }
  // useEffect(() => {
  //   setDisplayedSubnets(allSubnets);
  // }, [allSubnets]);

  const handleCheckboxChange = (name) => {
    setSelectedSubnets(prev =>
      prev.includes(name) ? prev.filter(subnetname => subnetname !== name) : [...prev, name]
    );
  };

  const handleSelectAll = () => {
    if (selectedSubnets.length === displayedSubnets.length) {
      setSelectedSubnets([]);
    } else {
      setSelectedSubnets(displayedSubnets.map(subnet => subnet.name));
    }
  };

  const handleEdit = () => {
    if (selectedSubnets.length !== 1) {
      alert("Please select only one subnet to edit.");
      return;
    }
    const selectedSubnets = displayedSubnets.find(subnet => subnet.tags.Name === selectedSubnets[0]);
    if (selectedSubnets) {
      navigate(`/console/subnet/edit/${selectedSubnets.name}`);
    } else {
      console.error("Selected Subnet not found");
    }
  };

  const handleDelete = () => {
    if (selectedSubnets.length === 0) {
      alert("Please select at least one Subnet to delete.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedSubnets.length} Subnet(s)?`);
    if (confirmDelete) {
      try {
        console.log("selected subnet: ", selectedSubnets[0]);
        const response = axios.delete(`${AWS_API_URL}/subnet/delete?subnetName=${selectedSubnets[0]}&userId=${currentUser.id}`);
      }
      catch (error) {
        console.error('Error deleting Subnets:', error);
      }
      const updatedSubnets = allSubnets.filter(subnet => !selectedSubnets.includes(subnet.number));
      setAllSubnets(updatedSubnets);
      localStorage.setItem('allSubnets', JSON.stringify(updatedSubnets));
      setSelectedSubnets([]);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredSubnets = allSubnets.filter(subnet =>
      subnet.name.toLowerCase().includes(searchTerm)
    );
    setDisplayedSubnets(filteredSubnets);
    setSelectedSubnets([]);
  };

  const handleCreateSubnet = async (subnetData) => {
    setIsLoading(true);
    const apiUrl = subnetData.provider.toLowerCase() === 'aws' ? AWS_API_URL : GCP_API_URL;

    const notificationId = NotificationManager.info('Creating Subnet...', 'Info', 0, null, true);

    try {
      const response = await axios.post(
        `${apiUrl}/subnet/create?userId=${currentUser.id}`,
        {
          subnetName: subnetData.subnetName,
          cidrBlock: subnetData.cidrBlock,
          vpcId: subnetData.vpcId,
        }
      );
      
      NotificationManager.remove({id: notificationId});
      NotificationManager.success('Subnet created successfully!', 'Success', 5000, null, true);
      
      fetchSubnetData();
    } catch (error) {
      console.error(error);
      NotificationManager.remove({id: notificationId});
      NotificationManager.error('Error creating Subnet.', 'Error', 5000, null, true);
    } finally {
      setIsLoading(false);
      setIsCreateModalOpen(false);
    }
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
              aria-label="Search Subnets"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={fetchSubnetData} className={styles.filterButton} style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', padding: '0', margin: '0' }}>
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
          <button className={styles.AddSubnetButton} onClick={() => setIsCreateModalOpen(true)} style={{ marginRight: '10px' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            Create Subnet
          </button>
          {/* {isDropdownOpen && (
            <div className={styles.dropdown}>
              <button onClick={() => navigate('/console/subnet/aws/create')} style={{ marginRight: '5px' }} disabled={isLoading}>AWS</button>
              <button onClick={() => navigate('/console/subnet/gcp/create')} style={{ marginRight: '10px' }} disabled={isLoading}>GCP</button>
            </div>
          )} */}
          <ActionButtons
            selectedCount={selectedSubnets.length}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDisabled={selectedSubnets.length !== 1}
          />
        </div>
      </header>
      <div className={styles.scrollableTable}>
        <TableHeader
          onSelectAll={handleSelectAll}
          allSelected={selectedSubnets.length === displayedSubnets.length && displayedSubnets.length > 0}
        />
        {displayedSubnets.map((subnet, index) => (
          <SubnetRow
            key={subnet.number}
            customer={subnet}
            isEven={index % 2 === 1}
            isSelected={selectedSubnets.includes(subnet.name)}
            onCheckboxChange={() => handleCheckboxChange(subnet.name)}
          />
        ))}
      </div>
      <TablePagination />
      <CreateSubnetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubnet}
        isLoading={isLoading}
      />
    </section>
  );
}

export default SubnetTable;
