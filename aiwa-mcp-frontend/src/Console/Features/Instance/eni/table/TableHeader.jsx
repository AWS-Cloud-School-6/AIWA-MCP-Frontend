import React from 'react';
import styles from './ENITable.module.css';

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
      <div className={`${styles.cell} ${styles.IdCell}`}>
        <div className={styles.columnHeader}>
          Network interface ID
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
      <div className={`${styles.cell} ${styles.statusCell}`}>
        <div className={styles.columnHeader}>
          Status
        </div>
      </div>
      <div className={`${styles.cell} ${styles.descriptionCell}`}>
        <div className={styles.columnHeader}>
          Description
        </div>
      </div>
      <div className={`${styles.cell} ${styles.privateipCell}`}>
        <div className={styles.columnHeader}>
          Primary private IPv4 address
        </div>
      </div>
      <div className={`${styles.cell} ${styles.publicipCell}`}>
        <div className={styles.columnHeader}>
          Public IPv4 address
        </div>
      </div>
    </div>
  );
}

export default TableHeader;
