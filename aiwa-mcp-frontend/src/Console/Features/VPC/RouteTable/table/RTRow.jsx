import React from 'react';
import styles from './RTTable.module.css';

function RTRow({ rt, isEven, isSelected, onCheckboxChange }) {
  const rowClass = isEven ? styles.RTRowEven : styles.RTRow;

  return (
    <div className={`${styles.tableRow} ${rowClass}`}>
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '5%', textAlrtn: 'center' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
          className={styles.checkbox}
        />
      </div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '15%', textAlrtn: 'center' }}>
        {rt.name}
      </div>
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '20%', textAlrtn: 'center' }}>
        {rt.id}
      </div>  
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '5%', textAlrtn: 'center' }}>
      <span className={`${styles.tag} ${styles[rt.status.toLowerCase()]}`}>
          {rt.status}
        </span>
      </div>                
      <div className={`${styles.cell} ${styles.subnetCell}`} style={{ width: '40%', textAlrtn: 'center' }}>
        {rt.subnetid.map((id, index) => (
          <div key={index}>
            <div>{id}</div>
            <div style={{ color: 'grey', fontSize: '0.8em' }}>{rt.subnetname[index]}</div>
          </div>
        ))}
      </div>      
      <div className={`${styles.cell} ${styles.vpcCell}`} style={{ width: '40%', textAlrtn: 'center' }}>
      <div className={styles.vpcId}>{rt.vpcName} </div>
        <div style={{ color: 'grey', fontSize: '0.8em' }} className={styles.vpcId}>{rt.vpcId}</div>
      </div>
    </div>

  );
}

export default RTRow;
