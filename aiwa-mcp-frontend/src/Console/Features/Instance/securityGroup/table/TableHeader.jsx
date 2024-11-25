import React from 'react';
import styles from './SecuritygroupTable.module.css';

function TableHeader({ onSelectAll, allSelected }) {
  return (
    <div className={`${styles.tableRow} ${styles.tableHeaderRow}`} style={{ textAlign: 'center' }}>
      {/* Checkbox */}
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '6.4%' }}>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          className={styles.checkbox}
        />
      </div>
      {/* Group ID */}
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '18%', textAlign: 'center' }}>
        Group ID
      </div>
      {/* Group Name */}
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '27%', textAlign: 'center' }}>
        Target Group Name
      </div>
      {/* Tag Name */}
      <div className={`${styles.cell} ${styles.tagNameCell}`} style={{ width: '19%', textAlign: 'center' }}>
        Name
      </div>
      {/* VPC ID */}
      <div className={`${styles.cell} ${styles.vpcIdCell}`} style={{ width: '22%', textAlign: 'center' }}>
        VPC ID
      </div>
    </div>
  );
}

export default TableHeader;
