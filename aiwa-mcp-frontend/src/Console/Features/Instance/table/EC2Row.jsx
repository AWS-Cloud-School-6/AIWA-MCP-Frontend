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
      <div className={styles.cell} style={{ width: '25%' }}>{ec2.instanceId}</div>
      <div className={styles.cell} style={{ width: '15%' }}>{ec2.name}</div>
      <div className={styles.cell} style={{ width: '15%' }}>{ec2.state}</div>
      <div className={styles.cell} style={{ width: '20%' }}>{ec2.publicIpAddress}</div>
      <div className={styles.cell} style={{ width: '20%' }}>{ec2.privateIpAddress}</div>
    </div>
  );
}

export default EC2Row;
