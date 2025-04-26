import React, { useState } from 'react';
import './Modal.css';

function NewLoanForm({ onSave, onCancel, items }) {
  const [loanData, setLoanData] = useState({
    itemId: items.length > 0 ? items[0].id : '',
    borrowerName: '',
    borrowerContact: '',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 weeks from now
    notes: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(loanData);
  };
  
  // Group items by category for the dropdown
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Loan an Item</h2>
          <button className="close-button" onClick={onCancel}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="itemId">Select Item</label>
            <select
              id="itemId"
              name="itemId"
              value={loanData.itemId}
              onChange={handleChange}
              required
            >
              {items.length === 0 ? (
                <option value="" disabled>No available items</option>
              ) : (
                Object.entries(groupedItems).map(([category, categoryItems]) => (
                  <optgroup key={category} label={category}>
                    {categoryItems.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.title} ({item.creator})
                      </option>
                    ))}
                  </optgroup>
                ))
              )}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="borrowerName">Borrower's Name</label>
            <input
              type="text"
              id="borrowerName"
              name="borrowerName"
              value={loanData.borrowerName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="borrowerContact">Borrower's Contact</label>
            <input
              type="text"
              id="borrowerContact"
              name="borrowerContact"
              value={loanData.borrowerContact}
              onChange={handleChange}
              placeholder="Phone number or email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={loanData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={loanData.notes}
              onChange={handleChange}
              placeholder="Any special instructions or comments"
              rows="3"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="button-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="button-primary"
              disabled={items.length === 0}
            >
              Loan Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewLoanForm;