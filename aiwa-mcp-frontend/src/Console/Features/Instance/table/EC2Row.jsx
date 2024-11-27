import React from 'react';
import styles from './EC2Table.module.css';
import awsIcon from '../../../../images/aws_icon.png';
import gcpIcon from '../../../../images/gcp_icon.png';

const PROVIDER_ICONS = {
  AWS: awsIcon,
  GCP: gcpIcon,
};


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

      <div className={`${styles.cell}`} style={{ width: '15%' }}>
        <img
          src={PROVIDER_ICONS[ec2.type]}
          alt={`${ec2.type} icon`}
          className={styles.providerIcon}
        />
      </div>

      <div className={styles.cell} style={{ width: '25%' }}>
        {ec2.type === "AWS" ? ec2.instanceId : "N/A"}
      </div>
      <div className={styles.cell} style={{ width: '20%' }}>{ec2.name}</div>

      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '15%' }}>
        <span className={`${styles.tag} ${styles[(ec2.type === "AWS" ? ec2.state : ec2.status)?.toLowerCase() || 'unknown']}`}>
          {ec2.type === "AWS" ? ec2.state : ec2.status}
        </span>
      </div>

      <div className={styles.cell} style={{ width: '20%' }  }>
          {ec2.type === "AWS" ? ec2.publicIpAddress : ec2.externalIp}
      </div>
      <div className={styles.cell} style={{ width: '20%' }}>
        {ec2.type === "AWS" ? ec2.privateIpAddress : ec2.internalIp}
      </div>
    </div>
  );
}

export default EC2Row;
