import React, { useState } from 'react';
import DataManagement from '../components/DataManagement';
import { DataService } from '../services/DataService';
import './DataManagementPage.css';

function DataManagementPage({ items, loans, onImportItems, onImportLoans }) {
  const [backupSchedule, setBackupSchedule] = useState('weekly');
  const [lastBackupDate, setLastBackupDate] = useState(localStorage.getItem('lastBackupDate') || 'Never');
  
  // Schedule automated backup
  const scheduleBackup = () => {
    // This would normally connect to a backend service
    // For demo purposes, we'll just save the preference and show a confirmation
    localStorage.setItem('backupSchedule', backupSchedule);
    alert(`Auto-backup scheduled: ${backupSchedule}`);
  };
  
  // Create a manual backup right now
  const createManualBackup = () => {
    const inventoryData = {
      items: items,
      loans: loans,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    
    const filename = `home_inventory_backup_${new Date().toISOString().slice(0,10)}.json`;
    DataService.exportToJsonFile(inventoryData, filename);
    
    // Update last backup date
    const now = new Date().toLocaleString();
    localStorage.setItem('lastBackupDate', now);
    setLastBackupDate(now);
  };
  
  // Clear all data (with confirmation)
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete ALL inventory data? This cannot be undone!')) {
      // Create one final backup before clearing
      const shouldBackup = window.confirm('Would you like to create a backup before clearing all data?');
      
      if (shouldBackup) {
        createManualBackup();
      }
      
      // Clear the data
      onImportItems([]);
      onImportLoans([]);
      localStorage.removeItem('inventoryItems');
      localStorage.removeItem('inventoryLoans');
      
      alert('All inventory data has been cleared.');
    }
  };

  return (
    <div className="data-management-page">
      <h2>Data Management</h2>
      
      <div className="data-management-grid">
        <div className="data-card">
          <h3>Export & Import</h3>
          <p>Backup your data or restore from a previous backup file.</p>
          
          <DataManagement 
            items={items}
            loans={loans}
            onImportItems={onImportItems}
            onImportLoans={onImportLoans}
          />
        </div>
        
        <div className="data-card">
          <h3>Automatic Backups</h3>
          <p>Set up a schedule for automatic data backups.</p>
          
          <div className="backup-controls">
            <div className="form-group">
              <label htmlFor="backupSchedule">Backup Frequency:</label>
              <select 
                id="backupSchedule" 
                value={backupSchedule}
                onChange={(e) => setBackupSchedule(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="never">Never</option>
              </select>
            </div>
            
            <button className="button-primary" onClick={scheduleBackup}>
              Save Schedule
            </button>
          </div>
          
          <div className="backup-info">
            <p><strong>Last Backup:</strong> {lastBackupDate}</p>
            <button className="button-secondary" onClick={createManualBackup}>
              Create Backup Now
            </button>
          </div>
        </div>
        
        <div className="data-card danger-zone">
          <h3>Danger Zone</h3>
          <p>These actions cannot be undone. Please proceed with caution.</p>
          
          <div className="danger-actions">
            <button className="button-danger" onClick={clearAllData}>
              Clear All Data
            </button>
            
            <div className="data-warning">
              <p>Deleting your data will permanently remove all your inventory items and loan records.</p>
            </div>
          </div>
        </div>
        
        <div className="data-card">
          <h3>Data Statistics</h3>
          <div className="data-stats">
            <div className="stat-row">
              <span>Total Items:</span>
              <span>{items.length}</span>
            </div>
            <div className="stat-row">
              <span>Active Loans:</span>
              <span>{loans.filter(loan => loan.status === 'active').length}</span>
            </div>
            <div className="stat-row">
              <span>Storage Size:</span>
              <span>{((JSON.stringify(items).length + JSON.stringify(loans).length) / 1024).toFixed(2)} KB</span>
            </div>
            <div className="stat-row">
              <span>Last Modified:</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataManagementPage;