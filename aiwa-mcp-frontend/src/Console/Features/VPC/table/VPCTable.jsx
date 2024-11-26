import React, { useState, useEffect } from "react";
import styles from './VPCTable.module.css';
import TableHeader from './TableHeader';
import VPCRow from './VPCRow';
import TablePagination from './TablePagination';
import { useNavigate } from 'react-router-dom';
import ActionButtons from './ActionButtons';
import axios from 'axios';
import { useUserContext } from '../../../../UserContext';
import { AWS_API_URL, GCP_API_URL } from '../../../../index';
import DeleteVPCModal from './DeleteVPCModal';
import 'react-notifications/lib/notifications.css';
import CreateVPCModal from './CreateVPCModal';
import { NotificationManager } from 'react-notifications';

const initialCustomers = [
  { id: 1, name: "Subin", number: "12345678", description: "VPC 사용 가능 상태", status: "available", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routeTables: "none" },
  { id: 2, name: "Ahmad Rosser", number: "5684236527", description: "VPC 생성 중...", status: "pending", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routeTables: "none" },
  { id: 3, name: "Zain Calzoni", number: "5684236528", description: "VPC 삭제 중...", status: "deleting", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routeTables: "none" },
  { id: 4, name: "Leo Stanton", number: "5684236529", description: "VPC 성공적으로 삭제 됨", status: "deleted", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routeTables: "none" },
];

function VPCTable() {
  const navigate = useNavigate();
  const [selectedVpcs, setSelectedVpcs] = useState([]);
  const [allVPCs, setAllVPCs] = useState([]);
  const [displayedVPCs, setDisplayedVPCs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { currentUser, selectedCompany, projectId } = useUserContext();
  const [isDataLoading, setIsDataLoading] = useState(true);

  const fetchVPCData = async () => {
    setIsDataLoading(true);
    
    try {
      // AWS와 GCP 요청을 병렬로 실행
      const awsUrl = `${AWS_API_URL}/vpc/describe?userId=${currentUser.id}&companyName=${selectedCompany}`;
      const awsPromise = axios.get(awsUrl);
      
      let gcpPromise = Promise.resolve({ data: { list: [] } });
      if (projectId && projectId !== 'undefined' && projectId !== 'null') {
        const gcpUrl = `${GCP_API_URL}/vpc/describe?projectId=${projectId}&userId=${currentUser.id}&companyName=${selectedCompany}`;
        gcpPromise = axios.get(gcpUrl);
      }

      // 병렬로 데이터 가져오기
      const [awsResponse, gcpResponse] = await Promise.all([awsPromise, gcpPromise]);

      // AWS VPC 처리
      const awsVPCs = awsResponse.data.list
        ? awsResponse.data.list.map((vpc) => ({
            provider: "AWS",
            number: vpc.vpcId || '',
            name: vpc.tags?.Name || '-',
            status: vpc.status || "available",
            cidr: vpc.cidr || '-',
            routeTables: vpc.routeTables?.map(rt => rt.routeTableId).join(', ') || '-',
          }))
        : [];

      // GCP VPC 처리
      const gcpVPCs = gcpResponse.data.list
        ? gcpResponse.data.list.map((vpc) => ({
            provider: "GCP",
            number: vpc.vpcId || '-',
            name: vpc.name || '-',
            status: "available",
            cidr: vpc.cidr || '-',
            routeTables: vpc.routingTables?.join(', ') || '-',
          }))
        : [];

      const combinedVPCs = [...awsVPCs, ...gcpVPCs];
      
      // 데이터가 있으면 실제 데이터를, 없으면 초기 데이터를 사용
      const finalVPCs = combinedVPCs.length > 0 ? combinedVPCs : initialCustomers;
      
      setAllVPCs(finalVPCs);
      setDisplayedVPCs(finalVPCs);
      localStorage.setItem('allVPCs', JSON.stringify(finalVPCs));

    } catch (error) {
      console.error("Error in fetchVPCData:", error);
      setAllVPCs(initialCustomers);
      setDisplayedVPCs(initialCustomers);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchVPCData();
  }, []);

  const handleCheckboxChange = (selectedVpc) => {
    setSelectedVpcs((prev) =>
      prev.some((vpc) => vpc.number === selectedVpc.number)
        ? prev.filter((vpc) => vpc.number !== selectedVpc.number)
        : [...prev, selectedVpc]
    );
  };

  const handleSelectAll = () => {
    if (selectedVpcs.length === displayedVPCs.length) {
      setSelectedVpcs([]);
    } else {
      setSelectedVpcs([...displayedVPCs]);
    }
  };

  const handleEdit = () => {
    if (selectedVpcs.length !== 1) {
      alert("Please select only one VPC to edit.");
      return;
    }
    const selectedVpc = selectedVpcs[0];
    if (selectedVpc) {
      navigate(`/console/vpc/edit/${selectedVpc.number}`);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVPCs = allVPCs.filter((vpc) =>
      vpc.name.toLowerCase().includes(searchTerm)
    );
    setDisplayedVPCs(filteredVPCs);
    setSelectedVpcs([]);
  };

  const handleCreateVPC = async (vpcData) => {
    setIsLoading(true);
    const apiUrl = vpcData.provider === "AWS" ? AWS_API_URL : GCP_API_URL;

    try {
      await axios.post(`${apiUrl}/vpc/create?userId=${currentUser.id}`, {
        vpcName: vpcData.vpcName,
        cidrBlock: vpcData.cidrBlock,
      });
      NotificationManager.success("VPC created successfully!", "Success");
      fetchVPCData();
    } catch (error) {
      NotificationManager.error("Error creating VPC.", "Error");
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
          <button onClick={fetchVPCData} className={styles.filterButton} style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', padding: '0', margin: '0' }}>
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </button>
          <button className={styles.AddVPCButton} onClick={() => setIsCreateModalOpen(true)} style={{ marginRight: '10px' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            Create VPC
          </button>

          <ActionButtons
            selectedCount={selectedVpcs.length}
            onDelete={handleDelete}
            isDisabled={selectedVpcs.length !== 1}
          />
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <div className={styles.scrollableTable}>

          <TableHeader
            allSelected={selectedVpcs.length === displayedVPCs.length}
            onSelectAll={handleSelectAll}
          />

          {isDataLoading ? (
            <div className={styles.loadingState}>
              Loading VPC data...
            </div>
          ) : (
            displayedVPCs.map((vpc, index) => (
              <VPCRow
                key={vpc.number}
                customer={vpc}
                isEven={index % 2 === 1}
                isSelected={selectedVpcs.some((selected) => selected.number === vpc.number)}
                onCheckboxChange={() => handleCheckboxChange(vpc)}
              />
            ))
          )}
      </div>
      </div>
      <TablePagination />
      {isDeleteModalOpen && (
        <DeleteVPCModal
          selectedVpcs={selectedVpcs}
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      <CreateVPCModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateVPC}
        isLoading={isLoading}
      />
    </section>
  );
}

export default VPCTable;
