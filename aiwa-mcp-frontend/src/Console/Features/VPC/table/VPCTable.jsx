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
  { id: 1, name: "Subin", number: "12345678", description: "VPC 사용 가능 상태", status: "available", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
  { id: 2, name: "Ahmad Rosser", number: "5684236527", description: "VPC 생성 중...", status: "pending", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
  { id: 3, name: "Zain Calzoni", number: "5684236528", description: "VPC 삭제 중...", status: "deleting", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
  { id: 4, name: "Leo Stanton", number: "5684236529", description: "VPC 성공적으로 삭제 됨", status: "deleted", cidr: "10.0.0.0/16", cidrv6: "2001:db8::/64", routingTable: "none" },
];

function VPCTable() {
  const navigate = useNavigate();
  const [selectedVpcs, setSelectedVpcs] = useState([]);
  const [allVPCs, setAllVPCs] = useState([]);
  const [displayedVPCs, setDisplayedVPCs] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { currentUser, selectedCompany } = useUserContext();

  const fetchVPCData = async () => {
    try {
      const awsUrl = `${AWS_API_URL}/vpc/describe?userId=${currentUser.id}&companyName=${selectedCompany}`;
      const gcpUrl = `${GCP_API_URL}/vpc/describe?projectId=eighth-service-439605-r6&userId=${currentUser.id}`;

      const [awsResponse, gcpResponse] = await Promise.allSettled([
        axios.get(awsUrl),
        axios.get(gcpUrl),
      ]);

      const awsVPCs = awsResponse.status === "fulfilled" && awsResponse.value.data.list
        ? awsResponse.value.data.list.map((vpc) => ({
          provider: "AWS",
          number: vpc.vpcId || '',
          name: vpc.tags?.Name || '-',
          status: vpc.status || "available",
          cidr: vpc.cidr || '-',
          routingTable: vpc.routeTables?.map(rt => rt.routeTableId).join(', ') || '-',
        }))
        : [];

      const gcpVPCs = gcpResponse.status === "fulfilled" && gcpResponse.value.data.list
        ? gcpResponse.value.data.list.map((vpc) => ({
          provider: "GCP",
          number: vpc.vpcId || '-', // VPC ID
          name: vpc.tags.length > 0 ? vpc.tags[0] : '-', // 태그가 존재하면 첫 번째 값 사용
          status: "available", // 상태가 명시되지 않았으므로 기본값 설정
          cidr: vpc.cidr || '-', // CIDR 블록
          routingTable: vpc.routingTables.join(', ') || '-', // 라우팅 테이블 목록을 문자열로 변환
        }))
        : [];


      const combinedVPCs = [...awsVPCs, ...gcpVPCs];

      if (combinedVPCs.length > 0) {
        setAllVPCs(combinedVPCs);
        setDisplayedVPCs(combinedVPCs);
      } else {
        setAllVPCs(initialCustomers);
        setDisplayedVPCs(initialCustomers);
      }

      localStorage.setItem('allVPCs', JSON.stringify(combinedVPCs));
    } catch (error) {
      console.error("Error fetching VPC data:", error);
      setAllVPCs(initialCustomers);
      setDisplayedVPCs(initialCustomers);
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
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          onChange={handleSearch}
        />
        <ActionButtons
          selectedCount={selectedVpcs.length}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <button onClick={() => setIsCreateModalOpen(true)}>Create VPC</button>
      </header>
      <TableHeader
        allSelected={selectedVpcs.length === displayedVPCs.length}
        onSelectAll={handleSelectAll}
      />
      {displayedVPCs.map((vpc, index) => (
        <VPCRow
          key={vpc.number}
          customer={vpc}
          isEven={index % 2 === 1}
          isSelected={selectedVpcs.some((selected) => selected.number === vpc.number)}
          onCheckboxChange={() => handleCheckboxChange(vpc)}
        />
      ))}
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
