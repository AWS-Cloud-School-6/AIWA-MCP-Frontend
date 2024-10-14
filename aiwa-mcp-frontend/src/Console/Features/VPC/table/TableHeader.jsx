import React from 'react';
import styles from './CustomerTable.module.css';

function TableHeader({ onSelectAll, allSelected }) {
  return (
    <div className={styles.tableHeaderRow}>
      <div 
        className={styles.checkbox}
        onClick={onSelectAll}
        style={{ cursor: 'pointer' }}
      >
        {allSelected && (
          <div className={styles.checkmark}>✓</div>
        )}
      </div>
      <div className={styles.columnHeader}>
        <span>#</span>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/25e3b38015f0815edb27bcfba79dd27d3e23807ac6822ecfe6baa61b1c465230?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
      </div>
      <div className={styles.columnHeader}>
        <span>name</span>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c9faabf8940ddbb184e98109c46a621198db915b672211fd53c0730fdb46217?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
      </div>
      <div className={styles.columnHeader}>description</div>
      <div className={styles.columnHeader}>
        <span>Status</span>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c9faabf8940ddbb184e98109c46a621198db915b672211fd53c0730fdb46217?placeholderIfAbsent=true&apiKey=0aa29cf27c604eac9ac8e5102203c841" alt="" className={styles.icon} />
      </div>
      <div className={styles.columnHeader}>CIDR</div>
      <div className={styles.columnHeader}>Routing Table</div>
    </div>
  );
}

export default TableHeader;