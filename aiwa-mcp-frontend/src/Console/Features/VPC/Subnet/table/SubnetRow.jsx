import React from 'react';
import styles from './SubnetTable.module.css';

function SubnetRow({ customer, isEven, isSelected, onCheckboxChange }) {
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
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '5%', textAlign: 'center' }}>
        {customer.id}
      </div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '20%', textAlign: 'center' }}>
        <div className={styles.customerName}>{customer.name}</div>
        <div className={styles.customerNumber}>{customer.number}</div>
      </div>
      {/* <div className={`${styles.cell} ${styles.descriptionCell}`} style={{ width: '20%', textAlign: 'center' }}>
        <p>{customer.description}</p>
      </div> */}
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '8%', textAlign: 'center' }}>
        <span className={`${styles.tag} ${styles[customer.status.toLowerCase()]}`}>
          {customer.status}
        </span>
      </div>
      <div className={`${styles.cell} ${styles.vpcCell}`} style={{ width: '20%', textAlign: 'center' }}>
        <div className={styles.vpcId}>{customer.vpcId}</div>
      </div>
      <div className={`${styles.cell} ${styles.cidrCell}`} style={{ width: '25%', textAlign: 'center' }}>
        <div className={styles.cidr}>{customer.cidr}</div>
        <div className={styles.cidrv6} style={{ color: 'rgb(25, 104, 110)' }}>{customer.cidrv6 || '-'}</div>
      </div>
      <div className={`${styles.cell} ${styles.availableipCell}`} style={{ width: '20%', textAlign: 'center' }}>
        {customer.availableip}
      </div>
      <div className={`${styles.cell} ${styles.routingTableCell}`} style={{ width: '20%', textAlign: 'center' }}>
        {customer.routingTable || '-'}
      </div>
    </div>
  );
}

export default SubnetRow;
