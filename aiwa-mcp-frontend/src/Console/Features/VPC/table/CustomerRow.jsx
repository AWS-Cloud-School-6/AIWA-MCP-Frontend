import React from 'react';
import styles from './CustomerTable.module.css';

function CustomerRow({ customer, isEven, isSelected, onCheckboxChange, onEdit, onDelete }) {
  const rowClass = isEven ? styles.customerRowEven : styles.customerRow;

  return (
    <div className={rowClass}>
      <div 
        className={styles.checkbox}
        onClick={onCheckboxChange}
        style={{ cursor: 'pointer' }}
      >
        {isSelected && (
          <div className={styles.checkmark}>✓</div>
        )}
      </div>
      <div>{customer.id}</div>
      <div className={styles.customerInfo}>
        <div className={styles.customerName}>{customer.name}</div>
        <div className={styles.customerNumber}>{customer.number}</div>
      </div>
      <div className={styles.customerDescription}>
        <p>{customer.description}</p>
        <span className={`${styles.tag} ${styles[customer.status.toLowerCase()]}`}>{customer.status}</span>
      </div>
      <div className={styles.financialInfo}>
        <div className={styles.amount}>
          <span>${customer.rate.toFixed(2)}</span>
          <span className={styles.currency}>CAD</span>
        </div>
        <div className={styles.amount}>
          <span className={customer.balance < 0 ? styles.negative : styles.positive}>
            ${Math.abs(customer.balance).toFixed(2)}
          </span>
          <span className={styles.currency}>CAD</span>
        </div>
        <div className={styles.amount}>
          <span>${customer.deposit.toFixed(2)}</span>
          <span className={styles.currency}>CAD</span>
        </div>
      </div>
      {/* <div className={styles.actionButtons}>
        <button className={styles.addCustomerButton} onClick={() => onEdit(customer.id)}>
          Edit
        </button>
        <button className={styles.addCustomerButton} onClick={() => onDelete(customer.id)}>
          Delete
        </button>
      </div> */}
    </div>
  );
}

export default CustomerRow;