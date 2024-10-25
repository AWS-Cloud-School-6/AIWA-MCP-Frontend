import React from 'react';
import styles from './NatTable.module.css';

function NatRow({ nat, isEven, isSelected, onCheckboxChange }) {
  const rowClass = isEven ? styles.SubnetRowEven : styles.SubnetRow;

  return (
    <div className={`${styles.tableRow} ${rowClass}`}>
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '5%', textAlnatn: 'center' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
          className={styles.checkbox}
        />
      </div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '15%', textAlnatn: 'center' }}>
        {nat.name}
      </div>
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '20%', textAlnatn: 'center' }}>
        {nat.id}
      </div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '10%', textAlnatn: 'center' }}>
        {nat.type}
      </div>
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '10%', textAlnatn: 'center' }}>
        <span className={`${styles.tag} ${styles[nat.status.toLowerCase()]}`}>
          {nat.status}
        </span>
      </div>
      <div className={`${styles.cell} ${styles.ipCell}`} style={{ width: '40%', textAlign: 'center', flexDirection: 'column' }}>
        <div>private ip: {nat.privateip || '-'}</div>
        <div>public ip: {nat.publicip || '-'}</div>
      </div>  
      <div className={`${styles.netidCell}`} style={{ width: '40%', textAlnatn: 'center' }}>
        <div>{nat.netid}</div>
      </div>          
      <div className={`${styles.cell} ${styles.vpcCell}`} style={{ width: '40%', textAlnatn: 'center' }}>
        <div className={styles.vpcId}>{nat.vpcId}</div>
      </div>
      <div className={`${styles.cell} ${styles.subnetCell}`} style={{ width: '40%', textAlnatn: 'center' }}>
        <div>{nat.subnetid}</div>
      </div>      

    </div>
  );
}

export default NatRow;
