import React from 'react';
import styles from './NatTable.module.css';

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
      <div className={`${styles.cell} ${styles.connectCell}`}>
        <div className={styles.columnHeader}>
          Connect type
        </div>
      </div>
      <div className={`${styles.cell} ${styles.statusCell}`}>
        <div className={styles.columnHeader}>
          Status
        </div>
      </div>
      <div className={`${styles.cell} ${styles.ipCell}`}>
        <div className={styles.columnHeader}>
          IP
        </div>
      </div>
      <div className={`${styles.cell} ${styles.netidCell}`}>
        <div className={styles.columnHeader}>
          Network ID
        </div>
      </div>
      <div className={`${styles.cell} ${styles.vpcIdCell}`}>
        <div className={styles.columnHeader}>
          VPC ID
        </div>
      </div>
      <div className={`${styles.cell} ${styles.subnetIdCell}`}>
        <div className={styles.columnHeader}>
          Subnet ID
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
