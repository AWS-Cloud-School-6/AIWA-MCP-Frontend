import React from 'react';
import styles from './SubnetTable.module.css';

function ActionButtons({ selectedCount, onEdit, onDelete }) {
  //   if (selectedCount === 0) return null;

  return (
    <div className={styles.actionButtons} style={{ display: 'flex', flexDirection: 'row' }}>
      {(
        <button onClick={onEdit} className={styles.AddSubnetButton} disabled={selectedCount !== 1} style={{ marginRight: '0px' }}>
          Edit
        </button>
      )}
      <button onClick={onDelete} disabled={selectedCount !== 1} className={styles.AddSubnetButton}>
        Delete
      </button>
    </div>
  );
}

export default ActionButtons;
