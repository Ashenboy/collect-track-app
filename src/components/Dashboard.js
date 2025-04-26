import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './Dashboard.css';

function Dashboard({ items, loans, onAddItem }) {
  // Calculate statistics
  const totalItems = items.length;
  const activeLoans = loans.filter(loan => loan.status === 'active').length;
  const totalValue = items.reduce((sum, item) => sum + (parseFloat(item.purchasePrice) || 0), 0);
  
  // Prepare data for chart
  const categoryGroups = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  
  const chartData = Object.keys(categoryGroups).map(category => ({
    name: category,
    value: categoryGroups[category]
  }));
  
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Get recently added items (last 5)
  const recentItems = [...items]
    .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="button-primary" onClick={onAddItem}>Add New Item</button>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Items</h3>
          <p className="stat-value">{totalItems}</p>
        </div>
        <div className="stat-card">
          <h3>Items on Loan</h3>
          <p className="stat-value">{activeLoans}</p>
        </div>
        <div className="stat-card">
          <h3>Collection Value</h3>
          <p className="stat-value">${totalValue.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="dashboard-section">
          <h3>Collection Breakdown</h3>
          <div className="chart-container">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} items`, 'Quantity']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>No items to display in chart</p>
            )}
          </div>
        </div>
        
        <div className="dashboard-section">
          <h3>Recently Added Items</h3>
          {recentItems.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Added On</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {recentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{new Date(item.purchaseDate).toLocaleDateString()}</td>
                    <td>${parseFloat(item.purchasePrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No items in your collection yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
