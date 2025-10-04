// C:\inventory-system\src\pages\Settings\TaxesAndCompliance\Taxes.jsx

import React, { useState, useEffect } from 'react';
import './gst.css';

const Taxes = () => {
  const [taxes, setTaxes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTax, setNewTax] = useState({
    taxName: '',
    rate: '',
    taxType: 'Tax on Value (Sales)',
  });

  useEffect(() => {
    fetch('http://localhost:5000/taxes')
      .then((res) => res.json())
      .then((data) => setTaxes(data));
  }, []);

  const handleChange = (e) => {
    setNewTax({ ...newTax, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/taxes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTax),
    })
      .then((res) => res.json())
      .then((data) => {
        setTaxes([...taxes, data]);
        setShowModal(false);
        setNewTax({ taxName: '', rate: '', taxType: 'Tax on Value (Sales)' });
      });
  };

  return (
    <div className="gst-settings">
      <div className="gst-header">
        <h2>Taxes</h2>
        <button onClick={() => setShowModal(true)} className="gst-add-btn">+ New Tax</button>
      </div>

      <table className="gst-table">
        <thead>
          <tr>
            <th>Tax Name</th>
            <th>Rate</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax) => (
            <tr key={tax.id}>
              <td>{tax.taxName}</td>
              <td>{tax.rate}%</td>
              <td>{tax.taxType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding new tax */}
      {showModal && (
        <div className="gst-modal">
          <div className="gst-modal-content">
            <h3>Add New Tax</h3>
            <form onSubmit={handleSubmit}>
              <label>Tax Name</label>
              <input
                type="text"
                name="taxName"
                value={newTax.taxName}
                onChange={handleChange}
                required
              />
              <label>Rate (%)</label>
              <input
                type="number"
                name="rate"
                value={newTax.rate}
                onChange={handleChange}
                required
              />
              <label>Tax Type</label>
              <select name="taxType" value={newTax.taxType} onChange={handleChange}>
                <option value="Tax on Value (Sales)">Tax on Value (Sales)</option>
                <option value="Tax on Value (Purchases)">Tax on Value (Purchases)</option>
              </select>

              <div className="gst-modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taxes;
