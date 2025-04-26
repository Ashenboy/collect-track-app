import React, { useState } from 'react';
import './Modal.css';

function NewItemForm({ onSave, onCancel }) {
  const [itemData, setItemData] = useState({
    title: '',
    category: 'Books',
    creator: '',
    condition: 'Excellent',
    purchaseDate: new Date().toISOString().split('T')[0],
    purchasePrice: '',
    location: '',
    isLoaned: false
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(itemData);
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Item</h2>
          <button className="close-button" onClick={onCancel}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={itemData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={itemData.category}
                onChange={handleChange}
                required
              >
                <option value="Books">Books</option>
                <option value="Video Games">Video Games</option>
                <option value="Vinyl Records">Vinyl Records</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="condition">Condition</label>
              <select
                id="condition"
                name="condition"
                value={itemData.condition}
                onChange={handleChange}
              >
                <option value="Mint">Mint</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="creator">Creator/Author</label>
            <input
              type="text"
              id="creator"
              name="creator"
              value={itemData.creator}
              onChange={handleChange}
              placeholder="Author, Artist, Developer, etc."
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="purchaseDate">Purchase Date</label>
              <input
                type="date"
                id="purchaseDate"
                name="purchaseDate"
                value={itemData.purchaseDate}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="purchasePrice">Purchase Price</label>
              <input
                type="number"
                id="purchasePrice"
                name="purchasePrice"
                value={itemData.purchasePrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Storage Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={itemData.location}
              onChange={handleChange}
              placeholder="e.g., Living Room Shelf, Bedroom Cabinet"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="button-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="button-primary">
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewItemForm;