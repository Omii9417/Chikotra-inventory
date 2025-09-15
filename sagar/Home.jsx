import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [activeTimeFrame, setActiveTimeFrame] = useState("This Month");
  const [showDropdown, setShowDropdown] = useState(null);

  const timeFrames = [
    "Today",
    "Yesterday", 
    "This Week",
    "This Month",
    "This Year",
    "Previous Week",
    "Previous Month",
    "Previous Year",
    "Custom"
  ];

  const handleTimeFrameSelect = (timeFrame, dropdownName) => {
    setActiveTimeFrame(timeFrame);
    setShowDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    if (showDropdown === dropdownName) {
      setShowDropdown(null);
    } else {
      setShowDropdown(dropdownName);
    }
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="user-info">
            <span className="welcome-text">Hello, User</span>
            <div className="company-name">
              <h1>Company Solutions Pvt. Ltd.</h1>
            </div>
          </div>

          <nav className="dashboard-nav">
            <ul>
              <li className="active">Dashboard</li>
              <li>Getting Started</li>
              <li>Recent Updates</li>
            </ul>
          </nav>
        </div>

        <div className="header-right">
          {/* Empty for now, could add user profile or notifications */}
        </div>
      </header>

      {/* Top Section */}
      <div className="top-sections">
        {/* Sales Activity */}
        <div className="card">
          <h3>Sales Activity</h3>
          <div className="sales-grid">
            <div className="sales-item">
              <span className="sales-value blue">0</span>
              <p>TO BE PACKED</p>
            </div>
            <div className="sales-item">
              <span className="sales-value red">0</span>
              <p>TO BE SHIPPED</p>
            </div>
            <div className="sales-item">
              <span className="sales-value green">0</span>
              <p>TO BE DELIVERED</p>
            </div>
            <div className="sales-item">
              <span className="sales-value orange">0</span>
              <p>TO BE INVOICED</p>
            </div>
          </div>
        </div>

        {/* Inventory Summary */}
        <div className="card">
          <h3>Inventory Summary</h3>
          <div className="inventory-summary">
            <p>
              <strong>QUANTITY IN HAND:</strong> 0
            </p>
            <p>
              <strong>QUANTITY TO BE RECEIVED:</strong> 0
            </p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle-sections">
        {/* Item Details */}
        <div className="card">
          <h3>Item Details</h3>
          <div className="item-details">
            <div className="left">
              <p className="low-stock">Low Stock Items: 0</p>
              <p>All Item Groups: 0</p>
              <p>All Items: 0</p>
            </div>
            <div className="right">
              <div className="circle">
                <p>No Active Items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="card">
          <h3>TOP SELLING ITEMS</h3>
          <div className="time-frame-selector">
            <button 
              className="time-frame-btn"
              onClick={() => toggleDropdown('topSelling')}
            >
              {activeTimeFrame} <span className="dropdown-arrow">▼</span>
            </button>
            {showDropdown === 'topSelling' && (
              <div className="dropdown-menu">
                {timeFrames.map((timeFrame) => (
                  <div
                    key={timeFrame}
                    className={`dropdown-item ${activeTimeFrame === timeFrame ? 'active' : ''}`}
                    onClick={() => handleTimeFrameSelect(timeFrame, 'topSelling')}
                  >
                    {timeFrame}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="no-items-message">
            <p>No items were invoiced in this time frame</p>
          </div>
        </div>
      </div>

      {/* Purchase & Sales Orders */}
      <div className="purchase-sales-section">
        {/* Purchase Order */}
        <div className="card">
          <div className="card-header">
            <h3>Purchase Order</h3>
            <div className="time-frame-selector">
              <button 
                className="time-frame-btn"
                onClick={() => toggleDropdown('purchaseOrder')}
              >
                This Month <span className="dropdown-arrow">▼</span>
              </button>
              {showDropdown === 'purchaseOrder' && (
                <div className="dropdown-menu">
                  {timeFrames.map((timeFrame) => (
                    <div
                      key={timeFrame}
                      className={`dropdown-item ${activeTimeFrame === timeFrame ? 'active' : ''}`}
                      onClick={() => handleTimeFrameSelect(timeFrame, 'purchaseOrder')}
                    >
                      {timeFrame}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="card-body">
            <p>
              <strong>Quantity Ordered:</strong> 0
            </p>
            <p>
              <strong>Total Cost:</strong> Rs.0.00
            </p>
          </div>
        </div>

        {/* Sales Order */}
        <div className="card">
          <div className="card-header">
            <h3>Sales Order</h3>
            <div className="time-frame-selector">
              <button 
                className="time-frame-btn"
                onClick={() => toggleDropdown('salesOrder')}
              >
                This Month <span className="dropdown-arrow">▼</span>
              </button>
              {showDropdown === 'salesOrder' && (
                <div className="dropdown-menu">
                  {timeFrames.map((timeFrame) => (
                    <div
                      key={timeFrame}
                      className={`dropdown-item ${activeTimeFrame === timeFrame ? 'active' : ''}`}
                      onClick={() => handleTimeFrameSelect(timeFrame, 'salesOrder')}
                    >
                      {timeFrame}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="card-body">
            <table>
             
              <tbody>
                <tr>
                  <td colSpan="6" className="no-data">
                    No sales were made in this time frame
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sales Order Summary */}
      <div className="sales-summary-section">
        <div className="card large-card">
          <div className="card-header">
            <h3>Sales Order Summary (in INR)</h3>
            <div className="time-frame-selector">
              <button 
                className="time-frame-btn"
                onClick={() => toggleDropdown('salesSummary')}
              >
                This Month <span className="dropdown-arrow">▼</span>
              </button>
              {showDropdown === 'salesSummary' && (
                <div className="dropdown-menu">
                  {timeFrames.map((timeFrame) => (
                    <div
                      key={timeFrame}
                      className={`dropdown-item ${activeTimeFrame === timeFrame ? 'active' : ''}`}
                      onClick={() => handleTimeFrameSelect(timeFrame, 'salesSummary')}
                    >
                      {timeFrame}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="card-body">
            <p className="no-data">No data found.</p>
          </div>
        </div>

        <div className="card">
          <h3>Total Sales</h3>
          <p>
            <span className="blue-dot"></span> DIRECT SALES Rs.0.00
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="card">
          <h3>Manage your inventory on the go!</h3>
          <p>
            Experience the ease of managing your inventory with the Zoho
            Inventory mobile app for Android & iOS.
          </p>
        </div>
        <div className="card">
          <h3>Other Zoho Apps</h3>
          <p>Accounting Software</p>
          <p>Ecommerce Software</p>
        </div>
        <div className="card">
          <h3>Help & Support</h3>
          <p>Contact Support</p>
          <p>Help Documentation</p>
        </div>
        <div className="card">
          <h3>Quick Links</h3>
          <p>Getting Started</p>
          <p>Mobile apps</p>
        </div>
      </div>
    </div>
  );
};

export default Home;