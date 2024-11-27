import React from 'react';
import styles from './SubnetTable.module.css';

function TableHeader({ onSelectAll, allSelected }) {
  return (
    <div className={`${styles.tableRow} ${styles.tableHeaderRow}`} style={{ textAlign: 'center' }}>
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '6.4%' }}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          className={styles.checkbox}
        />
      </div>
      <div className={`${styles.cell} ${styles.idCell}`} style={{textAlign: 'center' }}>Provider</div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '20%', textAlign: 'center' }}>Name</div>
      {/* <div className={`${styles.cell} ${styles.descriptionCell}`} style={{ width: '20%' }}>Description</div> */}
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '7%', textAlign: 'center' }}>Status</div>
      <div className={`${styles.cell} ${styles.vpcIdCell}`} style={{ width: '15%', textAlign: 'center' }}>VPC ID</div>
      <div className={`${styles.cell} ${styles.cidrCell}`} style={{ width: '15%' }}>CIDR</div>
      <div className={`${styles.cell} ${styles.availableipCell}`} style={{ width: '8%' }}>Available IP</div>
      <div className={`${styles.cell} ${styles.azCell}`} style={{ width: '20%' }}>AZ</div>
      {/* <div className={`${styles.cell} ${styles.routingTableCell}`} style={{ width: '22.5%' }}>Routing Table</div> */}
    </div>
  );
}

export default TableHeader;
