import React, { useState } from 'react';
import './OrganizationLocations.css'; // Create this CSS file

const OrganizationLocations = () => {
  const [locationsEnabled, setLocationsEnabled] = useState(false);

  return (
    <div className="locations-container">
      <h2>Locations</h2>
      <p>
        Create locations for each branch and warehouse in your organisation and manage them all in one place.
      </p>

      {!locationsEnabled ? (
        <button className="enable-button" onClick={() => setLocationsEnabled(true)}>
          Enable Locations
        </button>
      ) : (
        <div className="enabled-message">✅ Locations Feature Enabled</div>
      )}

      <div className="key-benefits">
        <h4>🔑 KEY BENEFITS</h4>
        <ul>
          <li>✔️ Monitor Item Stocks</li>
          <li>✔️ Unique Transaction Numbers</li>
          <li>✔️ Separate Billing and Storage</li>
          <li>✔️ Location-specific Accounting</li>
        </ul>
      </div>

      <div className="note-section">
        <h4>⚠️ Points to Note</h4>
        <ul>
          <li>Once you enable Locations, you won't be able to disable it in Chikotra Inventory.</li>
          <li>You can delete a location if it hasn't been used in transactions or mark it as inactive.</li>
          <li>You can manage multiple warehouses under a single location.</li>
        </ul>
      </div>
    </div>
  );
};

export default OrganizationLocations;
