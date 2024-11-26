import React from 'react';
import styles from './EC2Table.module.css';

function EC2Row({ ec2, isEven, isSelected, onCheckboxChange }) {
  return (
    <div className={`${styles.tableRow} ${isEven ? styles.evenRow : ''}`}>
      <div className={styles.cell} style={{ width: '5%' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onCheckboxChange(ec2)}
        />
      </div>
      <div className={styles.cell} style={{ width: '15%' }}>{ec2.type}</div>
      <div className={styles.cell} style={{ width: '20%' }}>
        {ec2.type === "AWS" ? ec2.instanceId : "N/A"}
      </div>
      <div className={styles.cell} style={{ width: '20%' }}>{ec2.name}</div>
      <div className={styles.cell} style={{ width: '15%' }}>
        {ec2.type === "AWS" ? ec2.state : ec2.status}
      </div>
      <div className={styles.cell} style={{ width: '20%' }}>
        {ec2.type === "AWS" ? ec2.publicIpAddress : ec2.externalIp}
      </div>
      <div className={styles.cell} style={{ width: '20%' }}>
        {ec2.type === "AWS" ? ec2.privateIpAddress : ec2.internalIp}
      </div>
    </div>
  );
}

export default EC2Row;
