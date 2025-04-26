import React, { useRef } from 'react';
import { DataService } from '../services/DataService';
import './DataManagement.css';

function DataManagement({ items, loans, onImportItems, onImportLoans }) {
  const itemsFileInputRef = useRef(null);
  const loansFileInputRef = useRef(null);
  
  // Export inventory data to JSON file
  const exportInventory = () => {
    const inventoryData = {
      items: items,
      loans: loans,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    
    const filename = `home_inventory_backup_${new Date().toISOString().slice(0,10)}.json`;
    DataService.exportToJsonFile(inventoryData, filename);
  };
  
  // Trigger file input click for items import
  const triggerItemsImport = () => {
    itemsFileInputRef.current.click();
  };
  
  // Trigger file input click for loans import
  const triggerLoansImport = () => {
    loansFileInputRef.current.click();
  };
  
  // Handle items file import
  const handleItemsImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      DataService.handleFileImport(file, (importedData) => {
        if (importedData.items) {
          onImportItems(importedData.items);
          alert(`Successfully imported ${importedData.items.length} items!`);
        } else {
          alert("No valid items data found in the import file.");
        }
        // Reset file input
        e.target.value = null;
      });
    }
  };
  
  // Handle loans file import
  const handleLoansImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      DataService.handleFileImport(file, (importedData) => {
        if (importedData.loans) {
          onImportLoans(importedData.loans);
          alert(`Successfully imported ${importedData.loans.length} loans!`);
        } else {
          alert("No valid loans data found in the import file.");
        }
        // Reset file input
        e.target.value = null;
      });
    }
  };
  
  // Handle full backup import
  const handleFullImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      DataService.handleFileImport(file, (importedData) => {
        if (importedData.items && importedData.loans) {
          onImportItems(importedData.items);
          onImportLoans(importedData.loans);
          alert(`Successfully imported ${importedData.items.length} items and ${importedData.loans.length} loans!`);
        } else {
          alert("No valid data found in the import file.");
        }
        // Reset file input
        e.target.value = null;
      });
    }
  };
  
  return (
    <div className="data-management">
      <h3>Data Management</h3>
      
      <div className="data-management-actions">
        <button className="button-secondary" onClick={exportInventory}>
          Export Full Backup
        </button>
        
        <div className="import-controls">
          <input 
            type="file"
            ref={itemsFileInputRef}
            onChange={handleItemsImport}
            accept=".json"
            style={{ display: 'none' }}
          />
          
          <input 
            type="file"
            ref={loansFileInputRef}
            onChange={handleLoansImport}
            accept=".json"
            style={{ display: 'none' }}
          />
          
          <input 
            type="file"
            id="fullBackupImport"
            onChange={handleFullImport}
            accept=".json"
            style={{ display: 'none' }}
          />
          
          <button className="button-secondary" onClick={() => document.getElementById('fullBackupImport').click()}>
            Import Full Backup
          </button>
        </div>
      </div>
      
      <div className="data-info">
        <p>Last auto-save: {new Date().toLocaleTimeString()}</p>
        <p>Items: {items.length} | Loans: {loans.length}</p>
      </div>
    </div>
  );
}

export default DataManagement;
