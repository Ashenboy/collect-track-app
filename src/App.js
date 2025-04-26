import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ItemsList from './components/ItemsList';
import LoansList from './components/LoansList';
import NewItemForm from './components/NewItemForm';
import NewLoanForm from './components/NewLoanForm';
import DataManagement from './components/DataManagement';
import { initialItems, initialLoans } from './data/initialData';
import { DataService } from './services/DataService';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [loans, setLoans] = useState([]);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [isNewLoanModalOpen, setIsNewLoanModalOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  // Load data on initial component mount
  useEffect(() => {
    // Load data from localStorage or use initial data if empty
    const savedItems = DataService.loadData('inventoryItems', initialItems);
    const savedLoans = DataService.loadData('inventoryLoans', initialLoans);
    
    setItems(savedItems);
    setLoans(savedLoans);
    
    // Set last saved time if data exists
    if (savedItems.length > 0 || savedLoans.length > 0) {
      setLastSaved(new Date());
    }
  }, []);
  
  // Auto-save data whenever items or loans change
  useEffect(() => {
    // Only save if there's actual data to save
    if (items.length > 0 || loans.length > 0) {
      DataService.saveData('inventoryItems', items);
      DataService.saveData('inventoryLoans', loans);
      setLastSaved(new Date());
    }
  }, [items, loans]);
  
  // Set up auto-save interval
  useEffect(() => {
    // Set up auto-save for items and loans (every 2 minutes)
    const cleanupItemsAutoSave = DataService.setupAutoSave('inventoryItems', items, setItems, 2);
    const cleanupLoansAutoSave = DataService.setupAutoSave('inventoryLoans', loans, setLoans, 2);
    
    // Clean up intervals on component unmount
    return () => {
      cleanupItemsAutoSave();
      cleanupLoansAutoSave();
    };
  }, [items, loans]);
  
  const addItem = (newItem) => {
    // Generate a unique ID for the new item
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    const itemWithId = { ...newItem, id: newId };
    const updatedItems = [...items, itemWithId];
    setItems(updatedItems);
    setIsNewItemModalOpen(false);
  };
  
  const addLoan = (newLoan) => {
    // Generate a unique ID for the new loan
    const newId = loans.length > 0 ? Math.max(...loans.map(loan => loan.id)) + 1 : 1;
    const loanWithId = { 
      ...newLoan, 
      id: newId, 
      status: 'active', 
      loanDate: new Date().toISOString() 
    };
    
    const updatedLoans = [...loans, loanWithId];
    setLoans(updatedLoans);
    
    // Update the item to mark it as loaned
    const updatedItems = items.map(item => 
      item.id === newLoan.itemId ? { ...item, isLoaned: true } : item
    );
    setItems(updatedItems);
    
    setIsNewLoanModalOpen(false);
  };
  
  const returnLoan = (loanId) => {
    // Find the loan to return
    const loan = loans.find(loan => loan.id === loanId);
    
    // Update the loan status
    const updatedLoans = loans.map(l => 
      l.id === loanId ? { ...l, status: 'returned', returnDate: new Date().toISOString() } : l
    );
    setLoans(updatedLoans);
    
    // Update the item to mark it as no longer loaned
    const updatedItems = items.map(item => 
      item.id === loan.itemId ? { ...item, isLoaned: false } : item
    );
    setItems(updatedItems);
  };
  
  // Handle importing items from file
  const handleImportItems = (importedItems) => {
    setItems(importedItems);
  };
  
  // Handle importing loans from file
  const handleImportLoans = (importedLoans) => {
    setLoans(importedLoans);
  };
  
  return (
    <Router>
      <div className="app">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1>Collect Track</h1>
            <p>Home Inventory Management System</p>
          </div>
          <nav className="sidebar-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Dashboard
            </NavLink>
            <NavLink to="/items" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              My Collection
            </NavLink>
            <NavLink to="/loans" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Loans
            </NavLink>
            <NavLink to="/data" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Data Management
            </NavLink>
          </nav>
          <div className="sidebar-footer">
            <p>Kevin's Collection Manager</p>
            {lastSaved && (
              <small>Last saved: {lastSaved.toLocaleTimeString()}</small>
            )}
          </div>
        </aside>
        
        <main className="content">
        <Routes>
          <Route path="/" element={
            <Dashboard 
              items={items} 
              loans={loans} 
              onAddItem={() => setIsNewItemModalOpen(true)}
            />
          } />
          <Route path="/items" element={
            <ItemsList 
              items={items} 
              onAddItem={() => setIsNewItemModalOpen(true)}
            />
          } />
          <Route path="/loans" element={
            <LoansList 
              loans={loans} 
              items={items}
              onAddLoan={() => setIsNewLoanModalOpen(true)}
              onReturnLoan={returnLoan}
            />
          } />
          <Route path="/data" element={
            <DataManagement
              items={items}
              loans={loans}
              onImportItems={handleImportItems}
              onImportLoans={handleImportLoans}
            />
          } />
        </Routes>
        </main>
      </div>
      
      {isNewItemModalOpen && (
        <NewItemForm 
          onSave={addItem}
          onCancel={() => setIsNewItemModalOpen(false)}
        />
      )}
      
      {isNewLoanModalOpen && (
        <NewLoanForm 
          onSave={addLoan}
          onCancel={() => setIsNewLoanModalOpen(false)}
          items={items.filter(item => !item.isLoaned)}
        />
      )}
    </Router>
  );
}

export default App;