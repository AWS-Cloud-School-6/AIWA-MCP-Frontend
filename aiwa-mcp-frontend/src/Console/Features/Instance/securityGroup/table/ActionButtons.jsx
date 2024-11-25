import React from 'react';
import styles from './SecuritygroupTable.module.css';

function ActionButtons({ selectedCount, onEdit, onDelete }) {
  //   if (selectedCount === 0) return null;

  return (
    <div className={styles.actionButtons} style={{ display: 'flex', flexDirection: 'row' }}>
      {(
        <button onClick={onEdit} className={styles.AddSecuritygroupButton} disabled={selectedCount !== 1} style={{ marginRight: '0px' }}>
          Edit
        </button>
      )}
      <button onClick={onDelete} disabled={selectedCount !== 1} className={styles.AddSecuritygroupButton}>
        Delete
      </button>
    </div>
  );
}

export default ActionButtons;
