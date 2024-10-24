import React from 'react';
import styles from './IGTable.module.css';

function TableHeader({ onSelectAll, allSelected }) {
  return (
    <div className={`${styles.tableRow} ${styles.tableHeaderRow}`} style={{ textAlign: 'center' }}>
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '5%', textAlign: 'center' }}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          className={styles.checkbox}
        />
      </div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '15%', textAlign: 'center' }}>Name</div>
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '30%', textAlign: 'center' }}>ID</div>
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '8%', textAlign: 'center' }}>Status</div>
      <div className={`${styles.cell} ${styles.vpcIdCell}`} style={{ width: '40%', textAlign: 'center' }}>VPC ID</div>
    </div>
  );
}

export default TableHeader;
