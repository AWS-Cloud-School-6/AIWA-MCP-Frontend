import React, { useState } from 'react';
import styles from './VPCTable.module.css';
import awsIcon from '../../../../images/aws_icon.png';
import gcpIcon from '../../../../images/gcp_icon.png';

// PROVIDER_ICONS 상수 수정
const PROVIDER_ICONS = {
  "AWS": awsIcon,
  "GCP": gcpIcon
};

function VPCRow({ customer, isEven, isSelected, onCheckboxChange }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_VISIBLE_ROUTES = 2;

  const rowClass = isEven ? styles.VPCRowEven : styles.VPCRow;

  return (
    <div className={`${styles.tableRow} ${rowClass}`}>
      {/* Checkbox: 7% */}
      <div className={`${styles.cell} ${styles.checkboxCell}`} style={{ width: '7%' }}>
        <input type="checkbox" checked={isSelected} onChange={onCheckboxChange} className={styles.checkbox} />
      </div>
      
      {/* Provider: 10% */}
      <div className={styles.cell} style={{ width: '8%' }}>
          <img 
            src={PROVIDER_ICONS[customer.provider]} 
            alt={`${customer.provider} icon`}
            className={styles.providerIcon}
          />
      </div>

      {/* Name: 10% (수정됨) */}
      <div className={`${styles.cell} ${styles.idCell}`} style={{ width: '10%' }}>
        {customer.name}
      </div>

      {/* VPC-ID: 20% */}
      <div className={`${styles.cell} ${styles.nameCell}`} style={{ width: '20%' }}>
        <div className={styles.customerNumber}>{customer.number}</div>
      </div>

      {/* Status: 13% */}
      <div className={`${styles.cell} ${styles.statusCell}`} style={{ width: '15%' }}>
        <span className={`${styles.tag} ${styles[customer.status.toLowerCase()]}`}>
          {customer.status}
        </span>
      </div>

      {/* CIDR: 20% */}
      <div className={`${styles.cell} ${styles.cidrCell}`} style={{ width: '20%' }}>
        <div>
          <div className={styles.cidr}>{customer.cidr}</div>
          <div className={styles.cidrv6}>{customer.cidrv6 || '-'}</div>
        </div>
      </div>

      {/* Routing Table: 20% */}
      <div className={`${styles.cell} ${styles.routingTableCell}`} style={{ width: '20%' }}>
        <div style={{ 
          maxWidth: '100%',
          wordBreak: 'break-all',
          wordWrap: 'break-word'
        }}>
          {customer.routeTables ? 
            <>
              {customer.routeTables.split(', ').slice(0, isExpanded ? undefined : MAX_VISIBLE_ROUTES).map((route, index) => (
                <div key={index} style={{
                  wordBreak: 'break-all',
                  wordWrap: 'break-word',
                  maxWidth: '100%'
                }}>
                  {route}
                </div>
              ))}
              {customer.routeTables.split(', ').length > MAX_VISIBLE_ROUTES && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={styles.expandButton}
                >
                  {isExpanded ? '접기' : `...더보기 (${customer.routeTables.split(', ').length - MAX_VISIBLE_ROUTES})`}
                </button>
              )}
            </>
            : '-'
          }
        </div>
      </div>
    </div>
  );
}

export default VPCRow;
