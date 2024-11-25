import React from 'react';
import styles from './SecuritygroupTable.module.css';

function SecuritygroupRow({ securitygroup, isEven, isSelected, onCheckboxChange }) {
  const rowClass = isEven ? styles.SecuritygroupRowEven : styles.SecuritygroupRow;

  return (
    <div className={`${styles.tableRow} ${rowClass}`}>
      {/* Checkbox */}
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '5%', textAlign: 'center' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
          className={styles.checkbox}
        />
      </div>
      {/* Group ID */}
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '18%', textAlign: 'center' }}>
        {securitygroup.groupId}
      </div>
      {/* Group Name */}
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '25%', textAlign: 'center' }}>
        {securitygroup.groupName}
      </div>
      {/* Tag Name */}
      <div className={`${styles.cell} ${styles.tagNameCell}`} style={{ width: '20%', textAlign: 'center' }}>
        {securitygroup.tagName || '-'}
      </div>
      {/* VPC ID */}
      <div className={`${styles.cell} ${styles.vpcIdCell}`} style={{ width: '20%', textAlign: 'center' }}>
        {securitygroup.vpcId}
      </div>
    </div>
  );
}

export default SecuritygroupRow;
