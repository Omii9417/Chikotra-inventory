import React from 'react';
import './General.css';

const General = () => {
  return (
    <div className="general-settings">
      <h2>General</h2>

      {/* Section 1: Modules */}
      <div className="setting-section">
        <h3>Select the modules you would like to enable.</h3>
        <label><input type="checkbox" /> Delivery Challans</label><br />
        <label><input type="checkbox" /> Retainer Invoices</label><br />
        <label><input type="checkbox" /> Proforma Invoices</label>
      </div>

      {/* Section 2: PDF Attachment */}
      <div className="setting-section">
        <h3>PDF Attachment</h3>
        <label><input type="checkbox" /> Attach an invoice PDF to email notifications which contain invoice payment links.</label><br />
        <label><input type="checkbox" /> I would like to encrypt the PDF files that I send.</label>
      </div>

      {/* Section 3: Discounts */}
      <div className="setting-section">
        <h3>Do you give discounts?</h3>
        <label><input type="radio" name="discount" /> I don’t give discounts</label><br />
        <label><input type="radio" name="discount" /> At Line Item Level</label><br />
        <select>
          <option>Discount exclusive of tax</option>
          <option>Discount inclusive of tax</option>
        </select><br />
        <label><input type="radio" name="discount" /> At Transaction Level</label>
      </div>

      {/* Section 4: Additional Charges */}
      <div className="setting-section">
        <h3>Select any additional charges you’d like to add</h3>
        <label><input type="checkbox" /> Adjustments</label><br />
        <label><input type="checkbox" /> Shipping Charges</label>
      </div>

      {/* Section 5: Rounding Off */}
      <div className="setting-section">
        <h3>Rounding off in Sales Transactions</h3>
        <label><input type="radio" name="rounding" /> No Rounding</label><br />
        <label><input type="radio" name="rounding" /> Round off the total to the nearest whole number</label>
      </div>

      {/* Section 6: Salesperson Field */}
      <div className="setting-section">
        <label><input type="checkbox" /> I want to add a field for salesperson</label>
      </div>

      {/* Section 7: Billable Bills */}
      <div className="setting-section">
        <h3>Billable Bills</h3>
        <label>Default Markup Percentage</label><br />
        <input type="number" />
      </div>

      {/* Section 8: Stock Tracking */}
      <div className="setting-section">
        <h3>Mode of Stock Tracking</h3>
        <label><input type="radio" name="stockTracking" /> Physical Stock</label><br />
        <label><input type="radio" name="stockTracking" /> Accounting Stock</label><br />
        <p className="note">The physical stock gets updated automatically when you raise standalone bills and invoices. <a href="#">Change</a></p>
      </div>

      {/* Section 9: Address Format */}
      <div className="setting-section">
        <h3>Organization Address Format <span>(Displayed in PDF only)</span></h3>
        <button className="preview-btn">Preview</button>
        <textarea rows="6" defaultValue={
          "${ORGANIZATION.CITY}\n${ORGANIZATION.STATE}\n${ORGANIZATION.POSTAL_CODE}\n${ORGANIZATION.COUNTRY}\n${ORGANIZATION.PHONE}\n${ORGANIZATION.EMAIL}\n${ORGANIZATION.WEBSITE}"
        } />
      </div>

      {/* Save Button */}
      <div className="save-section">
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
};

export default General;
