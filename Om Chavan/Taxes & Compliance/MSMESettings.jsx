import React from "react";
import "./msme.css";

const MSMESettings = () => {
  return (
    <div className="msme-settings-container">
      <h2 className="msme-title">MSME Settings</h2>

      <div className="msme-section">
        <label className="msme-label">
          <input type="checkbox" />
          &nbsp; Enable MSME-related fields for Customers and Vendors
        </label>
        <p className="msme-subtext">
          This will allow you to mark Customers and Vendors as MSME registered and store their details.
        </p>
      </div>

      <div className="msme-section">
        <label className="msme-label">
          <input type="checkbox" />
          &nbsp; Show MSME Registration Number field in Customer/Vendor form
        </label>
        <p className="msme-subtext">
          Useful for record-keeping and legal compliance.
        </p>
      </div>

      <div className="msme-section">
        <label className="msme-label">
          <input type="checkbox" />
          &nbsp; Show MSME Registration Date field in Customer/Vendor form
        </label>
        <p className="msme-subtext">
          Helps you track when the MSME status was granted.
        </p>
      </div>

      <div className="msme-footer">
        <button className="msme-save">Save</button>
        <button className="msme-cancel">Cancel</button>
      </div>
    </div>
  );
};

export default MSMESettings;
