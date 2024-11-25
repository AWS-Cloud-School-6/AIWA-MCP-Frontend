import React from 'react';
import styles from './RTTable.module.css';

function TableHeader({ onSelectAll, allSelected }) {
  return (
    <div className={`${styles.tableRow} ${styles.tableHeaderRow}`}>
      <div className={`${styles.cell} ${styles.checkboxCell}`}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          className={styles.checkbox}
        />
      </div>
      <div className={`${styles.cell} ${styles.nameCell}`}>
        <div className={styles.columnHeader}>
          Name
        </div>
      </div>
      <div className={`${styles.cell} ${styles.idCell}`}>
        <div className={styles.columnHeader}>
          ID
        </div>
      </div>
      <div className={`${styles.cell} ${styles.routesCell}`}>
        <div className={styles.columnHeader}>
          Provider
        </div>
      </div>
      <div className={`${styles.cell} ${styles.statusCell}`}>
        <div className={styles.columnHeader}>
          Status
        </div>
      </div>
      <div className={`${styles.cell} ${styles.subnetIdCell}`}>
        <div className={styles.columnHeader}>
          Subnet ID
        </div>
      </div>
      <div className={`${styles.cell} ${styles.vpcIdCell}`}>
        <div className={styles.columnHeader}>
          VPC ID
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
