import React, { createContext, useState, useContext } from 'react';

const CustomerTableContext = createContext();

export function useCustomerTable() {
  return useContext(CustomerTableContext);
}

export function CustomerTableProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const value = {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
  };

  return (
    <CustomerTableContext.Provider value={value}>
      {children}
    </CustomerTableContext.Provider>
  );
}