import React from 'react';
import styles from './VPCTable.module.css';

function VPCRow({ customer, isEven, isSelected, onCheckboxChange }) {
  const rowClass = isEven ? styles.VPCRowEven : styles.VPCRow;

  return (
    <div className={`${styles.tableRow} ${rowClass}`}>
      {/* 체크박스 */}
      <div className={`${styles.cell} ${styles.checkboxCell}`}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onCheckboxChange}
          className={styles.checkbox}
        />
      </div>
      {/* VPC ID */}
      <div className={`${styles.cell} ${styles.idCell}`}>
        {customer.name}
      </div>
      {/* 이름 */}
      <div className={`${styles.cell} ${styles.nameCell}`}>
        <div className={styles.customerNumber}>{customer.number}</div>
      </div>
      {/* 상태 */}
      <div className={`${styles.cell} ${styles.statusCell}`}>
        <span className={`${styles.tag} ${styles[customer.status.toLowerCase()]}`}>
          {customer.status}
        </span>
      </div>
      {/* CIDR */}
      <div className={`${styles.cell} ${styles.cidrCell}`}>
        <div className={styles.cidr}>{customer.cidr}</div>
        <div className={styles.cidrv6}>{customer.cidrv6 || '-'}</div>
      </div>
      {/* 라우팅 테이블 */}
      <div className={`${styles.cell} ${styles.routingTableCell}`}>
        {customer.routingTable || '-'}
      </div>
    </div>
  );
}

export default VPCRow;
