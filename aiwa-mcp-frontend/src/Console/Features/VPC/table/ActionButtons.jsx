import React from 'react';
import styles from './VPCTable.module.css';

function ActionButtons({ selectedCount, onEdit, onDelete }) {
  //   if (selectedCount === 0) return null;

  return (
    <div className={styles.actionButtons} style={{ display: 'flex', flexDirection: 'row' }}>
      {(
        <button onClick={onEdit} className={styles.AddVPCButton} disabled={selectedCount !== 1} style={{ marginRight: '10px' }} >
          Edit
        </button>
      )}
      <button onClick={onDelete} disabled={selectedCount !== 1} className={styles.AddVPCButton}>
        Delete
      </button>
    </div>
  );
}

export default ActionButtons;
