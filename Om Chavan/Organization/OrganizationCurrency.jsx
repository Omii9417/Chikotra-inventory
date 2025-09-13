import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrganizationCurrency.css";

const OrganizationCurrency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    symbol: "",
    name: "",
    decimal: "",
    format: ""
  });

  // Load data from db.json when component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/currencies")
      .then(res => setCurrencies(res.data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setFormData({ code: "", symbol: "", name: "", decimal: "", format: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const { code, symbol, name } = formData;
    if (code && symbol && name) {
      axios.post("http://localhost:5000/currencies", formData)
        .then(res => {
          setCurrencies([...currencies, res.data]); // Add to table
          closeModal(); // Close modal
        })
        .catch(err => console.error("Post error:", err));
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div className="currency-container">
      <div className="currency-header">
        <h2>Currencies</h2>
        <button className="add-btn" onClick={openModal}>+ Add Currency</button>
      </div>

      {currencies.length > 0 && (
        <table className="currency-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Symbol</th>
              <th>Name</th>
              <th>Decimal</th>
              <th>Format</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((cur, index) => (
              <tr key={index}>
                <td>{cur.code}</td>
                <td>{cur.symbol}</td>
                <td>{cur.name}</td>
                <td>{cur.decimal}</td>
                <td>{cur.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>New Currency</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Currency Code<span className="required">*</span></label>
                  <select name="code" value={formData.code} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Currency Symbol<span className="required">*</span></label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleChange}
                    placeholder="₹, $, € etc."
                  />
                </div>

                <div className="form-group">
                  <label>Currency Name<span className="required">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Rupee, Dollar, Euro"
                  />
                </div>

                <div className="form-group">
                  <label>Decimal Places</label>
                  <select name="decimal" value={formData.decimal} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Format</label>
                  <select name="format" value={formData.format} onChange={handleChange}>
                    <option value="">Select Format</option>
                    <option value="#,###.##">#,###.##</option>
                    <option value="##,##,###.##">##,##,###.##</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationCurrency;
