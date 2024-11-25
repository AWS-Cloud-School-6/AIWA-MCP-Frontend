import React from 'react';
import styles from './ENITable.module.css';

function ENIRow({ ENI, isEven, isSelected, onCheckboxChange }) {
  const rowClass = isEven ? styles.ENIRowEven : styles.ENIRow;

  return (
    <div className={`${styles.tableRow} ${rowClass}`}>
      <div className={`${styles.cell} ${styles.checkboxCell}`}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
          className={styles.checkbox}
        />
      </div>
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '15%', textAlrtn: 'center' }}>
        <div className={styles.cellValue}>{ENI.Network_interface_ID}</div>
      </div>
      <div className={`${styles.cell} ${styles.subnetCell}`} style={{ width: '10%', textAlrtn: 'center' }}>
        <div className={styles.cellValue}>{ENI.Subnet_ID}</div>
      </div>
      <div className={`${styles.cell} ${styles.vpcCell}`} style={{ width: '10%', textAlrtn: 'center' }}>
        <div className={styles.cellValue}>{ENI.VPC_ID}</div>
      </div>
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '10%', textAlrtn: 'center' }}>
        <span className={`${styles.tag} ${styles[ENI.Status.toLowerCase()]}`}>
          {ENI.Status}
        </span>
      </div>
      <div className={`${styles.cell} ${styles.descriptionCell}`} style={{ width: '20%', textAlrtn: 'center' }}>
        <span className={styles.cellValue}>{ENI.Description || '-'}</span>
      </div>
      <div className={`${styles.cell} ${styles.ipCell}`} style={{ width: '20%', textAlrtn: 'center' }}>
        <span className={styles.cellValue}>{ENI.PrivateIpAddresses.join(', ')}</span>
      </div>
      <div className={`${styles.cell} ${styles.ipCell}`} style={{ width: '20%', textAlrtn: 'center' }}>
        <span className={styles.cellValue}>{ENI.PublicIpAddresses.join(', ') || '-'}</span>
      </div>
    </div>
  );
}

export default ENIRow;