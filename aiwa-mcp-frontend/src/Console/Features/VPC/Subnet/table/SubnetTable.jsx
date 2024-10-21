import React, { useState, useEffect, useCallback } from "react";
import styles from './SubnetTable.module.css';
import TableHeader from './TableHeader';
import SubnetRow from './SubnetRow';
import TablePagination from './TablePagination';
import { useNavigate, useLocation } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import axios from 'axios';
import { useUserContext } from '../../../../../UserContext';
import { API_URL } from '../../../../../index';



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
  const { currentUser } = useUserContext();

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
      const response = await axios.get(`${API_URL}/subnet/describe?userId=${currentUser.id}`);
      if (response.data.list && response.data.list > 0) {
        const latestSubnets = response.data.list.map((subnet) => ({ // 가장 최근에 생성된 subnet
          number: subnet.subnetId,
          name: subnet.tags.Name || '-',
          status: subnet.status || "available",
          cidr: subnet.cidr || '-',
          vpcId: subnet.vpcId,
          availableip: calculateAvailableIPs(subnet.cidr),
          routingTable: subnet.routingTable || "Active",
        }));
        console.log("subnet 출력: ", latestSubnets);
        setAllSubnets(latestSubnets);
        setDisplayedSubnets(latestSubnets);
        localStorage.setItem('allSubnets', JSON.stringify(latestSubnets));
      }
    } catch (error) {
      console.error("Error fetching Subnet data:", error);
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

  const handleCheckboxChange = (number) => {
    setSelectedSubnets(prev =>
      prev.includes(number) ? prev.filter(subnetNumber => subnetNumber !== number) : [...prev, number]
    );
  };

  const handleSelectAll = () => {
    if (selectedSubnets.length === displayedSubnets.length) {
      setSelectedSubnets([]);
    } else {
      setSelectedSubnets(displayedSubnets.map(subnet => subnet.number));
    }
  };

  const handleEdit = () => {
    if (selectedSubnets.length !== 1) {
      alert("Please select only one subnet to edit.");
      return;
    }
    const selectedSubnets = displayedSubnets.find(subnet => subnet.number === selectedSubnets[0]);
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
          <button className={styles.AddSubnetButton} onClick={() => navigate('/console/Subnet/create')} style={{ marginRight: '10px' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            Create Subnet
          </button>

          <ActionButtons
            selectedCount={selectedSubnets.length}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
            isSelected={selectedSubnets.includes(subnet.number)}
            onCheckboxChange={() => handleCheckboxChange(subnet.number)}
          />
        ))}
      </div>
      <TablePagination />
    </section>
  );
}

export default SubnetTable;
