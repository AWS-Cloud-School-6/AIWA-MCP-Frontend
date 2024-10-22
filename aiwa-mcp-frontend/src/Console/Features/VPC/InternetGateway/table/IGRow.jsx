import React from 'react';
import styles from './IGTable.module.css';

function IGRow({ ig, isEven, isSelected, onCheckboxChange }) {
  const rowClass = isEven ? styles.SubnetRowEven : styles.SubnetRow;

  return (
    <div className={`${styles.tableRow} ${rowClass}`}>
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '5%', textAlign: 'center' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
          className={styles.checkbox}
        />
      </div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '15%', textAlign: 'center' }}>
        {ig.name}
      </div>
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '15%', textAlign: 'center' }}>
        {ig.id}
      </div>
      {/* <div className={`${styles.cell} ${styles.descriptionCell}`} style={{ width: '20%', textAlign: 'center' }}>
        <p>{ig.description}</p>
      </div> */}
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '8%', textAlign: 'center' }}>
        <span className={`${styles.tag} ${styles[ig.status.toLowerCase()]}`}>
          {ig.status}
        </span>
      </div>
      <div className={`${styles.cell} ${styles.vpcCell}`} style={{ width: '20%', textAlign: 'center' }}>
        <div className={styles.vpcId}>{ig.vpcId}</div>
      </div>
    </div>
  );
}

export default IGRow;
