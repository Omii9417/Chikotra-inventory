import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css"; // import custom CSS for hover effect

const App = () => {
  return (
    <div className="container mt-5">
      <h4 className="mb-4">Module Settings</h4>
      <div className="row">

        {/* General Section */}
        <div className="col-md-3">
          <h6 className="clickable text-success">
            <i className="bi bi-gear me-2"></i> General
          </h6>
          <ul className="list-unstyled ms-3">
            <li className="clickable">Customers and Vendors</li>
            <li className="clickable">Items</li>
          </ul>
        </div>

        {/* Inventory Section */}
        <div className="col-md-3">
          <h6 className="clickable text-danger">
            <i className="bi bi-box-seam me-2"></i> Inventory
          </h6>
          <ul className="list-unstyled ms-3">
            <li className="clickable">Inventory Adjustments</li>
            <li className="clickable">Packages</li>
            <li className="clickable">Shipments</li>
          </ul>

          <h6 className="clickable text-warning mt-3">
            <i className="bi bi-credit-card me-2"></i> Online Payments
          </h6>
          <ul className="list-unstyled ms-3">
            <li className="clickable">Customer Payments</li>
            <li className="clickable">Vendor Payments</li>
          </ul>
        </div>

        {/* Sales Section */}
        <div className="col-md-3">
          <h6 className="clickable text-success">
            <i className="bi bi-cart me-2"></i> Sales
          </h6>
          <ul className="list-unstyled ms-3">
            <li className="clickable">Sales Orders</li>
            <li className="clickable">Delivery Challans</li>
            <li className="clickable">Invoices</li>
            <li className="clickable">Payments Received</li>
            <li className="clickable">Sales Returns</li>
            <li className="clickable">Credit Notes</li>
          </ul>
        </div>

        {/* Purchases Section */}
        <div className="col-md-3">
          <h6 className="clickable text-info">
            <i className="bi bi-bag me-2"></i> Purchases
          </h6>
          <ul className="list-unstyled ms-3">
            <li className="clickable">Purchase Orders</li>
            <li className="clickable">Purchase Receives</li>
            <li className="clickable">Bills</li>
            <li className="clickable">Payments Made</li>
            <li className="clickable">Vendor Credits</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
