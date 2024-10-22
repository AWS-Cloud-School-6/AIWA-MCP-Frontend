import React from 'react';
import styles from './IGTable.module.css';

function TableHeader({ onSelectAll, allSelected }) {
  return (
    <div className={`${styles.tableRow} ${styles.tableHeaderRow}`} style={{ textAlign: 'center' }}>
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '5%' }}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          className={styles.checkbox}
        />
      </div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '15%' }}>Name</div>
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '15%' }}>ID</div>
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '8%' }}>Status</div>
      <div className={`${styles.cell} ${styles.vpcIdCell}`} style={{ width: '20%' }}>VPC ID</div>
    </div>
  );
}

export default TableHeader;
