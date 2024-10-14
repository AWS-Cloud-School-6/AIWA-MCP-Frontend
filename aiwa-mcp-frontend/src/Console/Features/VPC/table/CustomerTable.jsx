import React, { useState } from "react";
import styles from './CustomerTable.module.css';
import TableHeader from './TableHeader';
import CustomerRow from './CustomerRow';
import TablePagination from './TablePagination';
import { useNavigate } from 'react-router-dom'; 
import ActionButtons from './ActionButtons';

const customers = [
  { id: 1, name: "Subin", number: "12345678", description: "VPC 사용 가능 상태", status: "available", rate: 70, balance: -270, deposit: 500 },
  { id: 2, name: "Ahmad Rosser", number: "5684236527", description: "VPC 생성 중...", status: "pending", rate: 70, balance: 270, deposit: 500 },
  { id: 3, name: "Zain Calzoni", number: "5684236528", description: "VPC 삭제 중...", status: "deleting", rate: 70, balance: -20, deposit: 500 },
  { id: 4, name: "Leo Stanton", number: "5684236529", description: "VPC 성공적으로 삭제 됨", status: "deleted", rate: 70, balance: 600, deposit: 500 },
//   { id: 5, name: "Kaiya Vetrovs", number: "5684236530", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Open", rate: 70, balance: -350, deposit: 500 },
//   { id: 6, name: "Ryan Westervelt", number: "5684236531", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Paid", rate: 70, balance: -270, deposit: 500 },
//   { id: 7, name: "Corey Stanton", number: "5684236532", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Due", rate: 70, balance: 30, deposit: 500 },
//   { id: 8, name: "Adison Aminoff", number: "5684236533", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Open", rate: 70, balance: -270, deposit: 500 },
//   { id: 9, name: "Alfredo Aminoff", number: "5684236534", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Inactive", rate: 70, balance: 460, deposit: 500 },
//   { id: 10, name: "Allison Botosh", number: "5684236535", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Open", rate: 70, balance: 0, deposit: 500 },
];

function CustomerTable({customer, onEdit, onDelete}) {
  const navigate = useNavigate();
  const [selectedVpcs, setSelectedVpcs] = useState("");

  const handleCheckboxChange = (id) => {
    setSelectedVpcs(prev => 
      prev.includes(id) ? prev.filter(vpcId => vpcId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedVpcs.length === customers.length) {
      setSelectedVpcs([]);
    } else {
      setSelectedVpcs(customers.map(customer => customer.id));
    }
  };  

  const handleEdit = (id) => {
    console.log(`Editing VPC with id: ${id}`);
    // 여기에 편집 로직 구현
  };

  const handleDelete = () => {
    console.log(`Deleting VPCs with ids: ${selectedVpcs.join(', ')}`);
    // 여기에 삭제 로직 구현
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
            <input type="text" className={styles.searchInput} placeholder="Search..." aria-label="Search customers" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className={styles.addCustomerButton} onClick={() => navigate('/console/vpc/create')} style={{ marginRight: '10px' }}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3aad782ddd671404b8a4ec3b05999237daff58399b16ed95a8189efedd690970?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
            Create VPC
          </button>

          <ActionButtons 
            selectedCount={selectedVpcs.length}
            onEdit={() => handleEdit(selectedVpcs[0])}
            onDelete={handleDelete}
          />
        </div>
      </header>
      <TableHeader 
        onSelectAll={handleSelectAll}
        allSelected={selectedVpcs.length === customers.length}
      />
      {customers.map((customer, index) => (
        <CustomerRow 
          key={customer.id} 
          customer={customer} 
          isEven={index % 2 === 1}
          isSelected={selectedVpcs.includes(customer.id)}
          onCheckboxChange={() => handleCheckboxChange(customer.id)}
        />
      ))}
      <TablePagination />  
    </section>
  );
}

export default CustomerTable;