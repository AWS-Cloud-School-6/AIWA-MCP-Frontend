import React from 'react';
import styles from './EC2Table.module.css';

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
      <div className={styles.cell} style={{ width: '15%' }}>Provider</div>
      <div className={styles.cell} style={{ width: '20%' }}>Instance ID</div>
      <div className={styles.cell} style={{ width: '20%' }}>Name</div>
      <div className={styles.cell} style={{ width: '15%' }}>Status</div>
      <div className={styles.cell} style={{ width: '20%' }}>Public IP</div>
      <div className={styles.cell} style={{ width: '20%' }}>Private IP</div>
    </div>
  );
}

export default TableHeader;
