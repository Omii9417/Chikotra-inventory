import React, { useState } from "react";
import "./TransactionNumberSeries.css";

const TransactionNumberSeries = () => {
  const [showForm, setShowForm] = useState(false); // New state

  const handleNewSeriesClick = () => {
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const seriesData = {
    seriesName: "Default Transaction Series",
    salesReturn: "RMA-00001",
    vendorPayment: "1",
    retainerInvoice: "RET-00001",
    purchaseOrder: "PO-00001",
    creditNote: "CN-00001",
    customerPayment: "1",
    deliveryChallan: "DC-00001",
    billOfSupply: "BOS-00001",
    invoice: "INV-00001",
    salesOrder: "SO-00001",
  };

  return (
    <div className="transaction-series-container">
      <div className="header-row">
        <h2>Transaction Number Series</h2>
        <div className="actions">
          <button className="duplicate-toggle">🔄 Prevent Duplicate Transaction Numbers</button>
          <button className="new-series-btn" onClick={handleNewSeriesClick}>+ New Series</button>
        </div>
      </div>

      {!showForm && (
        <table className="series-table">
          <thead>
            <tr>
              <th>Series Name</th>
              <th>Sales Return</th>
              <th>Vendor Payment</th>
              <th>Retainer Invoice</th>
              <th>Purchase Order</th>
              <th>Credit Note</th>
              <th>Customer Payment</th>
              <th>Delivery Challan</th>
              <th>Bill of Supply</th>
              <th>Invoice</th>
              <th>Sales Order</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="link-text">{seriesData.seriesName}</td>
              <td>{seriesData.salesReturn}</td>
              <td>{seriesData.vendorPayment}</td>
              <td>{seriesData.retainerInvoice}</td>
              <td>{seriesData.purchaseOrder}</td>
              <td>{seriesData.creditNote}</td>
              <td>{seriesData.customerPayment}</td>
              <td>{seriesData.deliveryChallan}</td>
              <td>{seriesData.billOfSupply}</td>
              <td>{seriesData.invoice}</td>
              <td>{seriesData.salesOrder}</td>
            </tr>
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="new-series-form">
          <h3>New Series</h3>
          <div className="form-row">
            <label>Series Name*</label>
            <input type="text" placeholder="Enter series name" />
          </div>
          <div className="form-row">
            <label>Location</label>
            <select>
              <option>Add Location</option>
            </select>
          </div>

          <table className="series-input-table">
            <thead>
              <tr>
                <th>Module</th>
                <th>Prefix</th>
                <th>Starting Number</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Credit Note", "CN-"],
                ["Customer Payment", ""],
                ["Purchase Order", "PO-"],
                ["Sales Order", "SO-"],
                ["Vendor Payment", ""],
                ["Retainer Invoice", "RET-"],
                ["Bill Of Supply", "BOS-"],
                ["Invoice", "INV-"],
                ["Sales Return", "RMA-"],
                ["Delivery Challan", "DC-"],
              ].map(([module, prefix]) => (
                <tr key={module}>
                  <td>{module}</td>
                  <td>{prefix}</td>
                  <td><input defaultValue="00001" /></td>
                  <td>{prefix ? `${prefix}00001` : "1"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="form-actions">
            <button className="save-btn">Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionNumberSeries;
