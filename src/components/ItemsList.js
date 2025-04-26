import React, { useState } from 'react';
import './ItemsList.css';

function ItemsList({ items, onAddItem }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Get unique categories for filter dropdown
  const categories = [...new Set(items.map(item => item.category))];
  
  // Filter and sort items
  const filteredItems = items
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      (filterCategory === '' || item.category === filterCategory)
    )
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      } else if (sortBy === 'date') {
        return new Date(b.purchaseDate) - new Date(a.purchaseDate);
      } else if (sortBy === 'price') {
        return parseFloat(b.purchasePrice) - parseFloat(a.purchasePrice);
      }
      return 0;
    });
  
  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div className="items-list">
      <div className="items-header">
        <h2>My Collection</h2>
        <button className="button-primary" onClick={onAddItem}>Add New Item</button>
      </div>
      
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-options">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Sort By:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="category">Category</option>
              <option value="date">Date Added</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>
      
      {currentItems.length > 0 ? (
        <div className="items-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Creator/Author</th>
                <th>Condition</th>
                <th>Purchase Date</th>
                <th>Price</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(item => (
                <tr key={item.id} className={item.isLoaned ? 'loaned-item' : ''}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.creator}</td>
                  <td>{item.condition}</td>
                  <td>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                  <td>${parseFloat(item.purchasePrice).toFixed(2)}</td>
                  <td>{item.location}</td>
                  <td>{item.isLoaned ? 'On Loan' : 'Available'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
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
          <p>No items found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

export default ItemsList;
