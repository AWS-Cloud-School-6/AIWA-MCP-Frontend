import React from 'react';
import styles from './CustomerTable.module.css';

function ActionButtons({ selectedCount, onEdit, onDelete }) {
//   if (selectedCount === 0) return null;

  return (
    <div className={styles.actionButtons} style={{ display: 'flex', flexDirection: 'row' }}>
      { (
        <button onClick={onEdit} className={styles.addCustomerButton} style={{ marginRight: '10px' }}>
          Edit
        </button>
      )}
      <button onClick={onDelete} className={styles.addCustomerButton}>
        Delete
      </button>
    </div>
  );
}

export default ActionButtons;
