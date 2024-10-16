import React, { useState, useEffect, useCallback } from "react";
import styles from './VPCTable.module.css';
import TableHeader from './TableHeader';
import VPCRow from './VPCRow';
import TablePagination from './TablePagination';
import { useNavigate, useLocation } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import axios from 'axios';
import { useUserContext } from '../../../../UserContext';

const API_URL = 'http://13.125.198.144:8080';

const initialCustomers = [
  { id: 1, name: "Subin", number: "12345678", description: "VPC 사용 가능 상태", status: "available", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
  { id: 2, name: "Ahmad Rosser", number: "5684236527", description: "VPC 생성 중...", status: "pending", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
  { id: 3, name: "Zain Calzoni", number: "5684236528", description: "VPC 삭제 중...", status: "deleting", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
  { id: 4, name: "Leo Stanton", number: "5684236529", description: "VPC 성공적으로 삭제 됨", status: "deleted", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
];

function VPCTable({ customer, onEdit, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedVpcs, setSelectedVpcs] = useState([]);
  const [allVPCs, setAllVPCs] = useState(() => {
    const savedVPCs = localStorage.getItem('allVPCs');
    return savedVPCs ? JSON.parse(savedVPCs) : initialCustomers;
  });
  const [displayedVPCs, setDisplayedVPCs] = useState(allVPCs);

  // 유저 정보 가져오기
  const { currentUser } = useUserContext();

  // 리렌더링될 때마다 새로운 함수가 생성되지 않도록 구현
  const addNewVPC = useCallback((newVPC) => {
    setAllVPCs(prevVPCs => {
      const existingVPC = prevVPCs.find(vpc => vpc.name === newVPC.name);
      if (existingVPC) {
        console.log("VPC with this name already exists");
        return prevVPCs;
      }
      const updatedVPCs = [...prevVPCs, newVPC];
      localStorage.setItem('allVPCs', JSON.stringify(updatedVPCs));
      return updatedVPCs;
    });
  }, []);

  useEffect(() => {
    const fetchVPCData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/aws/resources/${currentUser.id}`);
        if (response.vpcs && response.vpcs.length > 0) {
          const latestVPC = response.vpcs[response.data.length - 1]; // 가장 최근에 생성된 VPC
          const newVPC = {
            group: latestVPC.id,
            name: latestVPC.name,
            number: latestVPC.number,
            // description: latestVPC.description,
            status: latestVPC.status,
            cidr: latestVPC.cidr,
            routingTable: latestVPC.routingTable
          };
          addNewVPC(newVPC);
        }
      } catch (error) {
        console.error("Error fetching VPC data:", error);
      }
    };

    fetchVPCData();
    navigate(location.pathname, { replace: true, state: {} });
  }, [location, navigate, addNewVPC, currentUser.id]);

  useEffect(() => {
    setDisplayedVPCs(allVPCs);
  }, [allVPCs]);

  const handleCheckboxChange = (id) => {
    setSelectedVpcs(prev =>
      prev.includes(id) ? prev.filter(vpcId => vpcId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedVpcs.length === displayedVPCs.length) {
      setSelectedVpcs([]);
    } else {
      setSelectedVpcs(displayedVPCs.map(vpc => vpc.id));
    }
  };

  const handleEdit = () => {
    if (selectedVpcs.length !== 1) {
      alert("Please select only one VPC to edit.");
      return;
    }
    const selectedVpc = displayedVPCs.find(vpc => vpc.id === selectedVpcs[0]);
    if (selectedVpc) {
      navigate(`/console/vpc/edit/${selectedVpc.name}`);
    } else {
      console.error("Selected VPC not found");
    }
  };

  const handleDelete = () => {
    if (selectedVpcs.length === 0) {
      alert("Please select at least one VPC to delete.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedVpcs.length} VPC(s)?`);
    if (confirmDelete) {
      const updatedVPCs = allVPCs.filter(vpc => !selectedVpcs.includes(vpc.id));
      setAllVPCs(updatedVPCs);
      localStorage.setItem('allVPCs', JSON.stringify(updatedVPCs));
      setSelectedVpcs([]);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVPCs = allVPCs.filter(vpc =>
      vpc.name.toLowerCase().includes(searchTerm)
    );
    setDisplayedVPCs(filteredVPCs);
    setSelectedVpcs([]);
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
              aria-label="Search VPCs"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className={styles.AddVPCButton} onClick={() => navigate('/console/vpc/create')} style={{ marginRight: '10px' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            Create VPC
          </button>

          <ActionButtons
            selectedCount={selectedVpcs.length}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </header>
      <TableHeader
        onSelectAll={handleSelectAll}
        allSelected={selectedVpcs.length === displayedVPCs.length}
      />
      {displayedVPCs.map((vpc, index) => (
        <VPCRow
          key={vpc.id}
          customer={vpc}
          isEven={index % 2 === 1}
          isSelected={selectedVpcs.includes(vpc.id)}
          onCheckboxChange={() => handleCheckboxChange(vpc.id)}
        />
      ))}
      <TablePagination />
    </section>
  );
}

export default VPCTable;
