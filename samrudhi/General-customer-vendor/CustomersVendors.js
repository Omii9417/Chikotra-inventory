/* eslint-disable no-template-curly-in-string */
import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomersVendors() {
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [enableCustomerNumbers, setEnableCustomerNumbers] = useState(false);
  const [enableVendorNumbers, setEnableVendorNumbers] = useState(false);
  const [defaultCustomerType, setDefaultCustomerType] = useState("business");
  const [enableCreditLimit, setEnableCreditLimit] = useState(false);
  const [billingFormat, setBillingFormat] = useState(
    "${CONTACT.CONTACT_DISPLAYNAME}\n" +
      "${CONTACT.CONTACT_ADDRESS}\n" +
      "${CONTACT.CONTACT_CITY}\n" +
      "${CONTACT.CONTACT_CODE} ${CONTACT.CONTACT_STATE}\n" +
      "${CONTACT.CONTACT_COUNTRY}"
  );
  const [shippingFormat, setShippingFormat] = useState(
    "${CONTACT.CONTACT_ADDRESS}\n" +
      "${CONTACT.CONTACT_CITY}\n" +
      "${CONTACT.CONTACT_CODE} ${CONTACT.CONTACT_STATE}\n" +
      "${CONTACT.CONTACT_COUNTRY}"
  );

  const billingRef = useRef(null);
  const shippingRef = useRef(null);

  const placeholders = [
    "${CONTACT.CONTACT_DISPLAYNAME}",
    "${CONTACT.CONTACT_ADDRESS}",
    "${CONTACT.CONTACT_CITY}",
    "${CONTACT.CONTACT_CODE}",
    "${CONTACT.CONTACT_STATE}",
    "${CONTACT.CONTACT_COUNTRY}",
  ];

  // Insert placeholder at cursor
  const insertPlaceholder = (type, value) => {
    if (!value) return;
    const ref = type === "billing" ? billingRef : shippingRef;
    const setFormat = type === "billing" ? setBillingFormat : setShippingFormat;
    const currentValue = type === "billing" ? billingFormat : shippingFormat;

    if (ref.current) {
      const { selectionStart, selectionEnd } = ref.current;
      const newValue =
        currentValue.substring(0, selectionStart) +
        value +
        currentValue.substring(selectionEnd);

      setFormat(newValue);

      // restore cursor position after inserting
      setTimeout(() => {
        ref.current.selectionStart = ref.current.selectionEnd =
          selectionStart + value.length;
        ref.current.focus();
      }, 0);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4">Customers and Vendors</h3>

      {/* Allow Duplicates */}
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={allowDuplicates}
          onChange={() => setAllowDuplicates(!allowDuplicates)}
          id="allowDuplicates"
        />
        <label className="form-check-label" htmlFor="allowDuplicates">
          Allow duplicates for customer and vendor display name.
        </label>
      </div>

      {/* Customer & Vendor Numbers */}
      <h5>Customer & Vendor Numbers</h5>
      <p className="text-muted">
        Generate customer and vendor numbers automatically. You can configure
        the series in which numbers are generated while creating new records.
      </p>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={enableCustomerNumbers}
          onChange={() => setEnableCustomerNumbers(!enableCustomerNumbers)}
          id="enableCustomerNumbers"
        />
        <label className="form-check-label" htmlFor="enableCustomerNumbers">
          Enable Customer Numbers
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={enableVendorNumbers}
          onChange={() => setEnableVendorNumbers(!enableVendorNumbers)}
          id="enableVendorNumbers"
        />
        <label className="form-check-label" htmlFor="enableVendorNumbers">
          Enable Vendor Numbers
        </label>
      </div>
      <div className="alert alert-warning small">
        Once you’ve enabled this feature, you cannot disable it.
      </div>

      {/* Default Customer Type */}
      <h5>Default Customer Type</h5>
      <p className="text-muted">
        Select the default customer type based on the kind of customers you
        usually sell your products or services to.
      </p>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="customerType"
          id="business"
          value="business"
          checked={defaultCustomerType === "business"}
          onChange={(e) => setDefaultCustomerType(e.target.value)}
        />
        <label className="form-check-label" htmlFor="business">
          Business
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="customerType"
          id="individual"
          value="individual"
          checked={defaultCustomerType === "individual"}
          onChange={(e) => setDefaultCustomerType(e.target.value)}
        />
        <label className="form-check-label" htmlFor="individual">
          Individual
        </label>
      </div>

      {/* Customer Credit Limit */}
      <h5>Customer Credit Limit</h5>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={enableCreditLimit}
          onChange={() => setEnableCreditLimit(!enableCreditLimit)}
          id="enableCreditLimit"
        />
        <label className="form-check-label" htmlFor="enableCreditLimit">
          Enable Credit Limit
        </label>
      </div>

      {/* Billing Address Format */}
      <h5>Customer and Vendor Billing Address Format</h5>
      <p className="text-muted">(Displayed in PDF only)</p>
      <select
        className="form-select mb-2"
        onChange={(e) => insertPlaceholder("billing", e.target.value)}
      >
        <option value="">Insert Placeholders</option>
        {placeholders.map((ph, i) => (
          <option key={i} value={ph}>
            {ph}
          </option>
        ))}
      </select>
      <textarea
        ref={billingRef}
        className="form-control mb-3"
        rows="5"
        value={billingFormat}
        onChange={(e) => setBillingFormat(e.target.value)}
      />

      {/* Shipping Address Format */}
      <h5>Customer and Vendor Shipping Address Format</h5>
      <p className="text-muted">(Displayed in PDF only)</p>
      <select
        className="form-select mb-2"
        onChange={(e) => insertPlaceholder("shipping", e.target.value)}
      >
        <option value="">Insert Placeholders</option>
        {placeholders.map((ph, i) => (
          <option key={i} value={ph}>
            {ph}
          </option>
        ))}
      </select>
      <textarea
        ref={shippingRef}
        className="form-control mb-3"
        rows="5"
        value={shippingFormat}
        onChange={(e) => setShippingFormat(e.target.value)}
      />

      {/* Save Button */}
      <button className="btn btn-primary">Save</button>
    </div>
  );
}

export default CustomersVendors;
