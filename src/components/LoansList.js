import React, { useState } from 'react';
import './LoansList.css';

function LoansList({ loans, items, onAddLoan, onReturnLoan }) {
  const [filterStatus, setFilterStatus] = useState('active');
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 10;
  
  // Get filtered loans
  const filteredLoans = loans.filter(loan => {
    if (filterStatus === 'all') return true;
    return loan.status === filterStatus;
  });
  
  // Calculate loan status and days remaining/overdue
  const getStatusInfo = (loan) => {
    if (loan.status === 'returned') {
      return { status: 'returned', label: 'Returned', className: 'status-returned' };
    }
    
    const today = new Date();
    const dueDate = new Date(loan.dueDate);
    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysRemaining < 0) {
      return { 
        status: 'overdue', 
        label: `Overdue by ${Math.abs(daysRemaining)} days`, 
        className: 'status-overdue' 
      };
    } else if (daysRemaining <= 7) {
      return { 
        status: 'due-soon', 
        label: `Due in ${daysRemaining} days`, 
        className: 'status-due-soon' 
      };
    } else {
      return { 
        status: 'active', 
        label: `Due in ${daysRemaining} days`, 
        className: 'status-active' 
      };
    }
  };
  
  // Pagination
  const totalPages = Math.ceil(filteredLoans.length / loansPerPage);
  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = filteredLoans.slice(indexOfFirstLoan, indexOfLastLoan);
  
  // Get item details for a loan
  const getItemDetails = (itemId) => {
    return items.find(item => item.id === itemId) || {};
  };
  
  return (
    <div className="loans-list">
      <div className="loans-header">
        <h2>Items on Loan</h2>
        <button className="button-primary" onClick={onAddLoan}>Loan an Item</button>
      </div>
      
      <div className="filters">
        <div className="filter-group">
          <label>Show:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="active">Active Loans</option>
            <option value="overdue">Overdue Loans</option>
            <option value="returned">Returned Items</option>
            <option value="all">All Loans</option>
          </select>
        </div>
      </div>
      
      {currentLoans.length > 0 ? (
        <div className="loans-container">
          {currentLoans.map(loan => {
            const statusInfo = getStatusInfo(loan);
            const itemDetails = getItemDetails(loan.itemId);
            
            return (
              <div key={loan.id} className="loan-card">
                <div className="loan-header">
                  <h3>{itemDetails.title}</h3>
                  <div className={`status-badge ${statusInfo.className}`}>
                    {statusInfo.label}
                  </div>
                </div>
                <div className="loan-details">
                  <div className="loan-info">
                    <p><strong>Borrower:</strong> {loan.borrowerName}</p>
                    <p><strong>Contact:</strong> {loan.borrowerContact}</p>
                    <p><strong>Item Category:</strong> {itemDetails.category}</p>
                  </div>
                  <div className="loan-dates">
                    <p><strong>Loaned on:</strong> {new Date(loan.loanDate).toLocaleDateString()}</p>
                    <p><strong>Due back:</strong> {new Date(loan.dueDate).toLocaleDateString()}</p>
                    {loan.status === 'returned' && (
                      <p><strong>Returned on:</strong> {new Date(loan.returnDate).toLocaleDateString()}</p>
                    )}
                  </div>
                </div>
                {loan.notes && (
                  <div className="loan-notes">
                    <p><strong>Notes:</strong> {loan.notes}</p>
                  </div>
                )}
                {loan.status !== 'returned' && (
                  <div className="loan-actions">
                    <button 
                      className="button-secondary"
                      onClick={() => onReturnLoan(loan.id)}
                    >
                      Mark as Returned
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="empty-state">
          <p>No loans found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

export default LoansList;