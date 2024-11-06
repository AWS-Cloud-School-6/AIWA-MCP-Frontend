import React, { useState, useEffect, useCallback } from "react";
import styles from './NatTable.module.css';
import TableHeader from './TableHeader';
import NatRow from './NatRow';
import TablePagination from './TablePagination';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../../../../UserContext';
import { AWS_API_URL } from '../../../../../index';
import CreateNatModal from "./CreateNatModal";


const initialNAT = [
  { id: 1, name: "Subin", status: "Attached", vpc: "vpc id display"},
];

function NatTable() {
  const location = useLocation();
  const [natName, setNatName] = useState(""); 
  const [selectedNAT, setSelectedNAT] = useState([]);
  const [displayedNATs, setDisplayedNATs] = useState([]);
  const [allNATs, setAllNATs] = useState(() => {
    const savedNATs = localStorage.getItem('allNATs');
    return savedNATs ? JSON.parse(savedNATs) : initialNAT;
  });
  // 유저 정보 가져오기
  const { currentUser } = useUserContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const fetchNATData = async () => {
    try {
      const response = await axios.get(`${AWS_API_URL}/nat-gateway/describe?userId=${currentUser.id}`);
      if (response.data.list && response.data.list.length > 0) {
        console.log("NAT list 데이터: ", response.data.list);
        const latestNats = response.data.list.map((nat) => ({
          id: nat.natGatewayId || '-',
          name: nat.tags.Name || '-',  
          status: nat.state || "pending",
          vpcId: nat.vpcId || '-', 
          privateip: nat.eniList[0]?.privateIpAddresses[0] || '-',
          publicip: nat.eniList[0]?.publicIpAddresses[0] || '-',
          type: nat.eniList[0]?.publicIpAddresses[0] ? 'public' : 'private',
          netid: nat.eniList[0]?.networkInterfaceId || '-',
          subnetid: nat.eniList[0]?.subnetId || '-',
   
        }));
        setAllNATs(latestNats);
        setDisplayedNATs(latestNats);
        localStorage.setItem('allNATs', JSON.stringify(latestNats));
        console.log("NAT 출력: ", latestNats);
      }
    } catch (error) {
      console.error("Error fetching nat data:", error);
    }
  };

  useEffect(() => {
    fetchNATData();
  }, []);

  const handleCheckboxChange = (name) => {
    setSelectedNAT(prev =>
      prev.includes(name) ? prev.filter(natName => natName !== name) : [...prev, name]
    );
  };

  const handleSelectAll = () => {
    if (selectedNAT.length === displayedNATs.length) {
      setSelectedNAT([]);
    } else {
      setSelectedNAT(displayedNATs.map(nat => nat.name));
    }
  };

  const handleDelete = async () => {
    if (selectedNAT.length === 0) {
      alert("Please select at least one NAT to delete.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedNAT.length} NAT Gateway(s)?`);
    if (confirmDelete) {
      try {
        for (const natName of selectedNAT) {
          await axios.delete(`${AWS_API_URL}/nat-gateway/delete?natGatewayName=${natName}&userId=${currentUser.id}`);
        }
        const updatedNats = allNATs.filter(nat => !selectedNAT.includes(nat.name));
        setAllNATs(updatedNats);
        setDisplayedNATs(updatedNats);
        localStorage.setItem('allNATs', JSON.stringify(updatedNats));
        setSelectedNAT([]);
        alert(`Successfully deleted ${selectedNAT.length} NAT Gateway(s).`);
      }
      catch (error) {
        console.error('Error deleting NAT Gateways:', error);
        alert('An error occurred while deleting NAT Gateways. Please try again.');
      }
    }
  };  

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredNats = allNATs.filter(nat =>
      nat.name.toLowerCase().includes(searchTerm)
    );
    setDisplayedNATs(filteredNats);
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
              aria-label="Search NATs"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={fetchNATData} className={styles.filterButton} style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', padding: '0', margin: '0' }}>
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>

          <button className={styles.AddNATButton} onClick={openCreateModal} style={{ marginRight: '10px' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            Create
          </button>   

          <button className={styles.AddNATButton} onClick={handleDelete} style={{ marginRight: '10px' }}>
            Delete
          </button>                  
        </div>
      </header>
      <div className={styles.tableWrapper}>
        <div className={styles.scrollableTable}>
          <table>
            <TableHeader
              onSelectAll={handleSelectAll}
              allSelected={selectedNAT.length === displayedNATs.length && displayedNATs.length > 0}
            />
            <tbody>
              {displayedNATs.map((nat, index) => (
                <NatRow
                  key={nat.id}
                  nat={nat}
                  isEven={index % 2 === 1}
                  isSelected={selectedNAT.includes(nat.name)}
                  onCheckboxChange={() => handleCheckboxChange(nat.name)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TablePagination />
      {isCreateModalOpen && (
        <CreateNatModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
        />
      )}
    </section>
  );
}

export default NatTable;
