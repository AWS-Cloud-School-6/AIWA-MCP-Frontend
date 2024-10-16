import React from 'react';
import styles from './EC2Table.module.css';

function EC2Row({ instance, isEven, isSelected, onCheckboxChange }) {
  return (
    <div className={`${styles.tableRow} ${isEven ? styles.evenRow : ''}`}>
      <div className={styles.cell}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onCheckboxChange(instance.InstanceId)}
        />
      </div>
      <div className={styles.cell}>{instance.InstanceId}</div>
      <div className={styles.cell}>{instance.InstanceType}</div>
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '8%' ,textAlign: 'center'}}>
        <span className={`${styles.tag} ${styles[instance.State.Name.toLowerCase()]}`}>
          {instance.State.Name}
        </span>
      </div>      
      <div className={styles.cell}>{instance.Placement.AvailabilityZone}</div>
      <div className={styles.cell}>{new Date(instance.LaunchTime).toLocaleString()}</div>
    </div>
  );
}

export default EC2Row;
