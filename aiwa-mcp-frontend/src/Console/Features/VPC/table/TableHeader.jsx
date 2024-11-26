import React from 'react';
import styles from './VPCTable.module.css';

function TableHeader({ onSelectAll, allSelected }) {
  return (
    <div className={`${styles.tableRow} ${styles.tableHeaderRow}`} style={{ textAlign: 'center' }}>
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '7%' }}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          className={styles.checkbox}
        />
      </div>
      <div className={styles.cell} style={{ width: '10%' }}>Provider</div>
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '10%' }}>Name</div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '20%' }}>VPC-ID</div>
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '13%' }}>Status</div>
      <div className={`${styles.cell} ${styles.cidrCell}`} style={{ width: '20%' }}>CIDR</div>
      <div className={`${styles.cell} ${styles.routingTableCell}`} style={{ width: '20%' }}>Routing Table</div>
    </div>
  );
}

export default TableHeader;
