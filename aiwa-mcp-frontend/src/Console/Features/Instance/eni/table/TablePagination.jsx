import React from 'react';
import styles from './ENITable.module.css';

function TablePagination() {


  return (
    <div className={styles.tablePagination}>
      <span className={styles.paginationInfo}>1-10 of 97</span>
      <div className={styles.rowsPerPage}>
        <label htmlFor="rowsPerPage">Rows per page:</label>
        <select id="rowsPerPage" className={styles.rowsPerPageSelect}>
          <option value="10">10</option>
        </select>
      </div>
      <div className={styles.paginationControls}>
        <button className={styles.paginationButton} aria-label="Previous page" disabled>
          &lt;
        </button>
        <button className={styles.paginationButton} aria-label="Next page">
          &gt;
        </button>
      </div>
    </div>
  );
}

export default TablePagination;