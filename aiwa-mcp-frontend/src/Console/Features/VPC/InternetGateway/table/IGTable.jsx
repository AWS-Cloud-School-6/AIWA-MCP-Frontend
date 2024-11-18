import React, { useState, useEffect, useCallback } from "react";
import styles from './IGTable.module.css';
import TableHeader from './TableHeader';
import IGRow from './IGRow';
import TablePagination from './TablePagination';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../../../../../UserContext';
import { AWS_API_URL } from '../../../../../index';
import CreateIGModal from './CreateIGModal'; // 새로 만들어야 할 컴포넌트


const initialIG = [
  { id: 1, name: "Subin", status: "Attached", vpc: "vpc id display"},
];

function IGTable() {
  const location = useLocation();
  const [igwName, setigwName] = useState(""); 
  const [selectedIG, setselectedIG] = useState([]);
  // const [allIGs, setallIGs] = useState([]);
  const [displayedIGs, setdisplayedIGs] = useState([]);
  const [allIGs, setallIGs] = useState(() => {
    const savedIGs = localStorage.getItem('allIGs');
    return savedIGs ? JSON.parse(savedIGs) : initialIG;
  });
  // 유저 정보 가져오기
  const { currentUser, selectedCompany } = useUserContext();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };


  // const addNewIG = useCallback((newIG) => {
  //   setallIGs(prevIGs => {
  //     const existingIG = prevIGs.find(ig => ig.name === newIG.name);
  //     if (existingIG) {
  //       console.log("Internet Gateway with this name already exists");
  //       return prevIGs;
  //     }
  //     const updatedIGs = [...prevIGs, newIG];
  //     localStorage.setItem('allIGs', JSON.stringify(updatedIGs));
  //     return updatedIGs;
  //   });
  // }, []);


  

  const fetchIGData = async () => {
    try {
      const response = await axios.get(`${AWS_API_URL}/internet-gateway/describe?userId=${currentUser.id}&companyName=${selectedCompany}`);
      if (response.data.list && response.data.list.length > 0) {
        const latestigs = response.data.list.map((ig) => ({
          id: ig.internetGatewayId || '-',
          name : ig.tags.Name || '-',  
          status: ig.attachments[0]?.state || "detached",
          vpcId: ig.attachments[0]?.vpcId || '-',       
        }));
        setallIGs(latestigs);
        setdisplayedIGs(latestigs);
        localStorage.setItem('allIGs', JSON.stringify(latestigs));
        console.log("ig 출력: ", latestigs);
      }
    } catch (error) {
      console.error("Error fetching ig data:", error);
    }
  };
  useEffect(() => {
    fetchIGData();
  }, []);


  const handleCheckboxChange = (name) => {
    setselectedIG(prev =>
      prev.includes(name) ? prev.filter(igname => igname !== name) : [...prev, name]
    );
  };

  const handleSelectAll = () => {
    if (selectedIG.length === displayedIGs.length) {
      setselectedIG([]);
    } else {
      setselectedIG(displayedIGs.map(ig => ig.name));
    }
  };


  const handleDelete = async () => {
    if (selectedIG.length === 0) {
      alert("Please select at least one IG to delete.");
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedIG.length} Internet Gateway(s)?`);
    if (confirmDelete) {
      try {
        for (const igName of selectedIG) {
          await axios.delete(`${AWS_API_URL}/internet-gateway/delete?igwName=${igName}&userId=${currentUser.id}`);
        }
        const updatedigs = allIGs.filter(ig => !selectedIG.includes(ig.name));
        setallIGs(updatedigs);
        setdisplayedIGs(updatedigs);
        localStorage.setItem('allIGs', JSON.stringify(updatedigs));
        setselectedIG([]);
        alert(`Successfully deleted ${selectedIG.length} Internet Gateway(s).`);
      }
      catch (error) {
        console.error('Error deleting Internet Gateways:', error);
        alert('An error occurred while deleting Internet Gateways. Please try again.');
      }
    }
  };  

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredigs = allIGs.filter(ig =>
      ig.name.toLowerCase().includes(searchTerm)
    );
    setdisplayedIGs(filteredigs);
    setselectedIG([]);
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
              aria-label="Search igs"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick={fetchIGData} className={styles.filterButton} style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', padding: '0', margin: '0' }}>
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>

          <button className={styles.AddIGButton} onClick={openCreateModal} style={{ marginRight: '10px' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            Create
          </button>   

          <button className={styles.AddIGButton} onClick={handleDelete} style={{ marginRight: '10px' }}>
            Delete
          </button>                  

   


        </div>
      </header>
      <div className={styles.scrollableTable}>
        <TableHeader
          onSelectAll={handleSelectAll}
          allSelected={selectedIG.length === displayedIGs.length && displayedIGs.length > 0}
        />
        {displayedIGs.map((ig, index) => (
          <IGRow
            key={ig.id}
            ig={ig}
            isEven={index % 2 === 1}
            isSelected={selectedIG.includes(ig.name)}
            onCheckboxChange={() => handleCheckboxChange(ig.name)}
          />
        ))}
      </div>
      <TablePagination />
      {isCreateModalOpen && (
        <CreateIGModal
          isOpen={isCreateModalOpen}
          onClose={closeCreateModal}
        />
      )}
    </section>
  );
}

export default IGTable;
