import React from 'react';
import styles from './EC2Table.module.css';

function ActionButtons({ selectedCount, onEdit, onDelete }) {
//   if (selectedCount === 0) return null;

  return (
    <div className={styles.actionButtons} style={{ display: 'flex', flexDirection: 'row' }}>
      { (
        <button onClick={onEdit} className={styles.EC2Button} style={{ marginRight: '10px' }}>
          Create
        </button>
      )}
      <button onClick={onDelete} className={styles.EC2Button}>
        Delete
      </button>
    </div>
  );
}

export default ActionButtons;
