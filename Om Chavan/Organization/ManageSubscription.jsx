import React from "react";
import "./ManageSubscription.css";

const ManageSubscription = () => {
  const usageStats = [
    { title: "Sales Orders", total: 50, used: 0 },
    { title: "Carrier Shipments", total: 50, used: 0 },
    { title: "Invoices", total: 50, used: 0 },
    { title: "Bills", total: 20, used: 0 },
  ];

  return (
    <div className="subscription-container">
      <h1 className="subscription-heading">Subscription Details</h1>

      <div className="plan-section">
        <div className="plan-card">
          <p className="label">PLAN NAME</p>
          <div className="plan-name">FREE</div>
        </div>
        <div className="plan-cycle-card">
          <div>
            <p className="label">Usage Cycle</p>
            <p>-</p>
          </div>
          <button className="change-plan-btn">Change Plan</button>
        </div>
      </div>

      <div className="usage-section">
        <p className="usage-title">Usage Stats</p>
        <div className="usage-grid">
          {usageStats.map((item, index) => (
            <div key={index} className="usage-card">
              <p className="usage-name">{item.title}</p>
              <div className="usage-percentage">
                <span>0%</span>
                <p className="usage-subtext">Used</p>
              </div>
              <div className="usage-info">
                <p>Total: {item.total}</p>
                <p>Used: {item.used}</p>
                <p>Available: {item.total - item.used}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;
