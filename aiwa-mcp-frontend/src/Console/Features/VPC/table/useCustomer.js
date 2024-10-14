// import { useState, useEffect } from 'react';
// import { useCustomerTable } from './CustomerTableContext';

// const mockCustomers = [
//   { id: 1, name: "Ann Culhane", number: "5684236526", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Open", rate: 70, balance: -270, deposit: 500 },
//   { id: 2, name: "Ahmad Rosser", number: "5684236527", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Paid", rate: 70, balance: 270, deposit: 500 },
//   { id: 3, name: "Zain Calzoni", number: "5684236528", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Open", rate: 70, balance: -20, deposit: 500 },
//   { id: 4, name: "Leo Stanton", number: "5684236529", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Inactive", rate: 70, balance: 600, deposit: 500 },
//   { id: 5, name: "Kaiya Vetrovs", number: "5684236530", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Open", rate: 70, balance: -350, deposit: 500 },
//   { id: 6, name: "Ryan Westervelt", number: "5684236531", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Paid", rate: 70, balance: -270, deposit: 500 },
//   { id: 7, name: "Corey Stanton", number: "5684236532", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Due", rate: 70, balance: 30, deposit: 500 },
//   { id: 8, name: "Adison Aminoff", number: "5684236533", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Open", rate: 70, balance: -270, deposit: 500 },
//   { id: 9, name: "Alfredo Aminoff", number: "5684236534", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Inactive", rate: 70, balance: 460, deposit: 500 },
//   { id: 10, name: "Allison Botosh", number: "5684236535", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...", status: "Open", rate: 70, balance: 0, deposit: 500 },
// ];

// export function useCustomers() {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { searchTerm, currentPage, rowsPerPage } = useCustomerTable();

//   useEffect(() => {
//     // Simulating API call
//     const fetchCustom