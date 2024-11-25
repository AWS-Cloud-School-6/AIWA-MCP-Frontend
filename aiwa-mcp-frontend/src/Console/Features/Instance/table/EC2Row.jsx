import React from 'react';
import styles from './EC2Table.module.css';

function EC2Row({ ec2, isEven, isSelected, onCheckboxChange }) {
  return (
    <div className={`${styles.tableRow} ${isEven ? styles.evenRow : ''}`}>
      <div className={styles.cell}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onCheckboxChange(ec2)}
        />
      </div>
      <div className={styles.cell}>{ec2.instanceId}</div>
      <div className={styles.cell}>{ec2.name}</div>
      <div className={styles.cell}>{ec2.state}</div>
      <div className={styles.cell}>{ec2.publicIpAddress}</div>
      <div className={styles.cell}>{ec2.privateIpAddress}</div>
    </div>
  );
}

export default EC2Row;
