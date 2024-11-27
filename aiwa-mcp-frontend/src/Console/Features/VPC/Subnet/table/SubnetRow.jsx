import React from 'react';
import styles from './SubnetTable.module.css';
// import awsIcon from '../../../../../images/aws_icon.png';
// import gcpIcon from '../../../../../images/gcp_icon.png';
import awsIcon from '../../../../../images/aws_icon.png';
import gcpIcon from '../../../../../images/gcp_icon.png';



const PROVIDER_ICONS = {
  "AWS": awsIcon,
  "GCP": gcpIcon
};

function SubnetRow({ customer, isEven, isSelected, onCheckboxChange }) {
  const rowClass = isEven ? styles.SubnetRowEven : styles.SubnetRow;

  return (
    <div className={`${styles.tableRow} ${rowClass}`}>
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '6.4%' }}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
          className={styles.checkbox}
        />
      </div>
      <div className={styles.cell} style={{ width: '6.4%', textAlign: 'center' }}>
          <img 
            src={PROVIDER_ICONS[customer.provider]} 
            alt={`${customer.provider} icon`}
            className={styles.providerIcon}
          />
      </div>
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '20%', textAlign: 'center' }}>
        <div className={styles.customerName}>{customer.name}</div>
        <div className={styles.customerNumber}>{customer.number}</div>
      </div>
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '5%', textAlign: 'center' }}>
        <span className={`${styles.tag} ${styles[customer.status.toLowerCase()]}`}>
          {customer.status}
        </span>
      </div>
      <div className={`${styles.cell} ${styles.vpcCell}`} style={{ width: '17%', textAlign: 'center' }}>
        <div className={styles.vpcId}>{customer.vpcId}</div>
      </div>
      <div className={`${styles.cell} ${styles.cidrCell}`} style={{ width: '10%', textAlign: 'center' }}>
        <div className={styles.cidr}>{customer.cidr}</div>
        <div className={styles.cidrv6} style={{ color: 'rgb(25, 104, 110)' }}>{customer.cidrv6 || '-'}</div>
      </div>
      <div className={`${styles.cell} ${styles.availableipCell}`} style={{ width: '10%', textAlign: 'center' }}>
        {customer.availableip}
      </div>
      <div className={`${styles.cell} ${styles.routingTableCell}`} style={{ width: '20%', textAlign: 'center' }}>
        {customer.az || '-'}
      </div>
    </div>
  );
}

export default SubnetRow;
