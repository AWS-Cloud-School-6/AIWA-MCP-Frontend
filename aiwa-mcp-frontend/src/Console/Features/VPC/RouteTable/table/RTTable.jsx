import React, { useState, useEffect, useCallback } from "react";
import styles from './RTTable.module.css';
import TableHeader from './TableHeader';
import RTRow from './RTRow';
import TablePagination from './TablePagination';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../../../../UserContext';
import { AWS_API_URL } from '../../../../../index';
import CreateRTModal from './CreateRTModal';
import { Menu, MenuButton, MenuItem } from '@aws-amplify/ui-react';



const initialRTTable = [
  { id: 1, name: "Subin", status: "Attached", vpc: "vpc id display"},
];

function RTTable() {
  const location = useLocation();
  const [RTTableName, setRTTableName] = useState(""); 
  const [selectedRTTable, setSelectedRTTable] = useState([]);
  const [displayedRTTables, setDisplayedRTTables] = useState([]);
  const [allRTTables, setAllRTTables] = useState(() => {
    const savedRTTables = localStorage.getItem('allRTTables');
    return savedRTTables ? JSON.parse(savedRTTables) : initialRTTable;
  });
  // 유저 정보 가져오기
  const { currentUser } = useUserContext();

    // Fetch the latest VPC data
    const fetchVPCData = async () => {
      try {
          const response = await axios.get(`${AWS_API_URL}/vpc/describe?userId=${currentUser.id}`);
            return response.data.list || [];
      } catch (error) {
          console.error("Error fetching VPC data:", error);
          return [];
      }
  };  


  const fetchRTData = async () => {
    try {
      const [rtResponse, vpcList] = await Promise.all([
        axios.get(`${AWS_API_URL}/route-table/describe?userId=${currentUser.id}`),
        fetchVPCData() 
      ]);

      if (rtResponse.data.list && rtResponse.data.list.length > 0) {
        console.log("Route Table list 데이터: ", rtResponse.data.list);
        const latestRT = rtResponse.data.list.map((RT) => {
          const ispublic = RT.publicSubnets.length > 0 ? 'public' : 'private';
          const vpcName = vpcList.find(vpc => vpc.vpcId === RT.vpcId)?.tags.Name || '-'; // VPC 이름 찾기

          return {
            name: RT.tags.Name || '-',  
            id: RT.routeTableId || '-',
            status: ispublic,
            subnetid: ispublic === 'public' ? RT.publicSubnets.map(subnet => subnet.subnetId) : RT.privateSubnets.map(subnet => subnet.subnetId),
            subnetname: ispublic === 'public' ? RT.publicSubnets.map(subnet => subnet.tags.Name) : RT.privateSubnets.map(subnet => subnet.tags.Name),
            vpcId: RT.vpcId || '-', 
            vpcName: vpcName, // VPC 이름 포함
          };
        });
        setAllRTTables(latestRT);
        setDisplayedRTTables(latestRT);
        localStorage.setItem('allRTTables', JSON.stringify(latestRT));
        console.log("RTTable 출력: ", latestRT);
        }

    } catch (error) {
      console.error("Error fetching RTTable data:", error);
    }
  };

  useEffect(() => {
    fetchRTData();
  }, []);

  const handleCheckboxChange = (name) => {
    setSelectedRTTable(prev =>
      prev.includes(name) ? prev.filter(RTTableName => RTTableName !== name) : [...prev, name]
    );
  };

  const handleSelectAll = () => {
    if (selectedRTTable.length === displayedRTTables.length) {
      setSelectedRTTable([]);
    } else {
      setSelectedRTTable(displayedRTTables.map(RTTable => RTTable.name));
    }
  };

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  // delete 구현 안됨
  const handleDelete = async () => {
    if (selectedRTTable.length === 0) {
      alert("Please select at least one RTTable to delete.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedRTTable.length} RTTable Gateway(s)?`);
    if (confirmDelete) {
      try {
        for (const RTTableName of selectedRTTable) {
          await axios.delete(`${AWS_API_URL}/RTTable-gateway/delete?RTTableGatewayName=${RTTableName}&userId=${currentUser.id}`);
        }
        const updatedRTTables = allRTTables.filter(RTTable => !selectedRTTable.includes(RTTable.name));
        setAllRTTables(updatedRTTables);
        setDisplayedRTTables(updatedRTTables);
        localStorage.setItem('allRTTables', JSON.stringify(updatedRTTables));
        setSelectedRTTable([]);
        alert(`Successfully deleted ${selectedRTTable.length} RTTable Gateway(s).`);
      }
      catch (error) {
        console.error('Error deleting RTTable Gateways:', error);
        alert('An error occurred while deleting RTTable Gateways. Please try again.');
      }
    }
  };  

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRTTables = allRTTables.filter(RTTable =>
      RTTable.name.toLowerCase().includes(searchTerm)
    );
    setDisplayedRTTables(filteredRTTables);
  };

  const handleConnectSubnet = async () => {
    console.log("Connect Subnet");
    try {
      const response = await axios.post(`${AWS_API_URL}/route-table/associate-subnet`);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching VPC data:", error);
    }
  };


  const handleConnectIGW = () => {
    console.log("Associate IGW");
  };

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className={styles.scrollableTable}>
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
              aria-label="Search RTTables"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={fetchRTData} className={styles.filterButton} style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', padding: '0', margin: '0' }}>
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>

          <button className={styles.AddRTTableButton} style={{ marginRight: '10px' }} onClick={handleCreate}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            Create
          </button>   
          <button className={styles.AddRTTableButton} onClick={handleDelete} style={{ marginRight: '10px' }}>
            Delete
          </button>    
          <Menu
            trigger={
              <MenuButton className={styles.menuButton}>
                Actions
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </MenuButton>
            }
          >
            <MenuItem onClick={() => handleConnectSubnet()}>
              Subnet 연결
            </MenuItem>
            <MenuItem onClick={() => handleConnectIGW()}>
              Internet Gateway 연결
            </MenuItem>
          </Menu>                        
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <div className={styles.scrollableTable}>

            <TableHeader
              onSelectAll={handleSelectAll}
              allSelected={selectedRTTable.length === displayedRTTables.length && displayedRTTables.length > 0}
            />
   
              {displayedRTTables.map((RTTable, index) => (
                <RTRow
                  key={RTTable.id}
                  rt={RTTable}
                  isEven={index % 2 === 1}
                  isSelected={selectedRTTable.includes(RTTable.name)}
                  onCheckboxChange={() => handleCheckboxChange(RTTable.name)}
                />
              ))}
        </div>
      </div>
      <TablePagination />
      <CreateRTModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </section>
    </div>
  );
}

export default RTTable;
