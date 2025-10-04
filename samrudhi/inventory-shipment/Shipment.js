import React, { useState } from "react";
import { Tabs, Tab, Form, Card, Button, Modal } from "react-bootstrap";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Shipment.css";

function Shipment() {
  const [activeTab, setActiveTab] = useState("general");

  // General tab: notifications
  const [carrierNotification, setCarrierNotification] = useState(false);
  const [manualNotification, setManualNotification] = useState(false);

  // General tab: address change dropdown + modal
  const [showAddressBox, setShowAddressBox] = useState(false);
  const [showNewAddressModal, setShowNewAddressModal] = useState(false);

  // Field Customization: new custom field second page
  const [showCustomFieldForm, setShowCustomFieldForm] = useState(false);
  const [dataType, setDataType] = useState(null);

  // Stored addresses previewed inside the Change Address dropdown
  const [addressList, setAddressList] = useState([
    { id: 1, name: "Samrudhi rawool", state: "Maharashtra", country: "India" },
  ]);

  // New Address modal form state
  const [newAddress, setNewAddress] = useState({
    attention: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: null, // {value, label}
    phone: "", // e.g. "+91"
  });

  // Dropdown data
  const countryOptions = countryList().getData(); // all countries
  const phoneOptions = [
    { value: "+91", label: "+91 (India)" },
    { value: "+1", label: "+1 (USA/Canada)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+81", label: "+81 (Japan)" },
    { value: "+49", label: "+49 (Germany)" },
    { value: "+61", label: "+61 (Australia)" },
    { value: "+971", label: "+971 (UAE)" },
    { value: "+33", label: "+33 (France)" },
    { value: "+86", label: "+86 (China)" },
  ];

  const dataTypeOptions = [
    { value: "text", label: "Text Box (Single Line)" },
    { value: "email", label: "Email" },
    { value: "url", label: "URL" },
    { value: "phone", label: "Phone" },
    { value: "number", label: "Number" },
    { value: "decimal", label: "Decimal" },
    { value: "amount", label: "Amount" },
    { value: "date", label: "Date" },
  ];

  // Handlers
  const handleSaveGeneral = (e) => {
    e.preventDefault();
    alert("Shipment settings saved successfully!");
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    // basic requireds similar to the UI reference
    if (!newAddress.attention || !newAddress.street1 || !newAddress.city) {
      alert("Please fill Attention, Street 1 and City.");
      return;
    }
    setAddressList((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newAddress.attention,
        state: newAddress.state,
        country: newAddress.country?.label || "",
      },
    ]);
    // reset & close
    setNewAddress({
      attention: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zip: "",
      country: null,
      phone: "",
    });
    setShowNewAddressModal(false);
  };

  const handleCustomFieldSave = (e) => {
    e.preventDefault();
    alert("New Custom Field Saved!");
    setShowCustomFieldForm(false);
  };

  // --------- Second page: New Custom Field (exact look) ----------
  if (showCustomFieldForm) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold">New Custom Field - Shipments</h6>
          <Button variant="light" size="sm" onClick={() => setShowCustomFieldForm(false)}>
            ✖
          </Button>
        </div>

        <Form onSubmit={handleCustomFieldSave}>
          {/* Label Name */}
          <Form.Group className="mb-3" controlId="labelName">
            <Form.Label className="fw-semibold text-danger">Label Name*</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          {/* Data Type (searchable dropdown) */}
          <Form.Group className="mb-3" controlId="dataType">
            <Form.Label className="fw-semibold text-danger">Data Type*</Form.Label>
            <Select
              options={dataTypeOptions}
              value={dataType}
              onChange={setDataType}
              placeholder="Select Data Type"
              isSearchable
            />
          </Form.Group>

          {/* Is Mandatory */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Is Mandatory</Form.Label>
            <div>
              <Form.Check inline label="Yes" name="mandatory" type="radio" id="mandatory-yes" />
              <Form.Check
                inline
                label="No"
                name="mandatory"
                type="radio"
                id="mandatory-no"
                defaultChecked
              />
            </div>
          </Form.Group>

          {/* Show in All PDFs */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Show in All PDF's</Form.Label>
            <div>
              <Form.Check inline label="Yes" name="pdf" type="radio" id="pdf-yes" />
              <Form.Check
                inline
                label="No"
                name="pdf"
                type="radio"
                id="pdf-no"
                defaultChecked
              />
            </div>
          </Form.Group>

          {/* Buttons */}
          <div className="mt-4">
            <Button type="submit" variant="primary" className="me-2">
              Save
            </Button>
            <Button variant="secondary" onClick={() => setShowCustomFieldForm(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    );
  }
  // ---------------------------------------------------------------

  return (
    <div className="container mt-4 shipment-container">
      {/* Page Header */}
      <h5 className="fw-bold mb-3">Shipments</h5>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
        {/* -------------------- General Tab -------------------- */}
        <Tab eventKey="general" title="General">
          <Form onSubmit={handleSaveGeneral}>
            <h6 className="fw-semibold mb-2">Shipment Notification</h6>

            <Form.Check
              type="checkbox"
              label="Do you want to send notifications to customers for carrier shipments?"
              checked={carrierNotification}
              onChange={(e) => setCarrierNotification(e.target.checked)}
              className="mb-2"
            />

            <Form.Check
              type="checkbox"
              label="Do you want to send notifications to customers for manual shipments?"
              checked={manualNotification}
              onChange={(e) => setManualNotification(e.target.checked)}
              className="mb-3"
            />

            <hr />

            {/* Dispatch Address Section */}
            <h6 className="fw-semibold mb-2">Choose default Dispatch address</h6>
            <Card className="p-3 shadow-sm mb-3 address-card position-relative">
              <p className="mb-1 fw-semibold">Samrudhi rawool</p>
              <p className="mb-1 text-muted">Maharashtra</p>
              <p className="mb-2 text-muted">India</p>

              {/* Change Address link directly below address */}
              <div className="mt-2">
                <Button
                  variant="link"
                  className="p-0 text-primary"
                  onClick={() => setShowAddressBox(!showAddressBox)}
                >
                  Change Address
                </Button>
              </div>

              {/* Dropdown-style address box with ➕ New Address */}
              {showAddressBox && (
                <div className="address-dropdown p-2 mt-2">
                  {addressList.map((addr) => (
                    <div key={addr.id} className="p-2 mb-2 bg-light rounded">
                      <p className="mb-1 fw-semibold">{addr.name}</p>
                      <p className="mb-1 text-muted">{addr.state}</p>
                      <p className="mb-0 text-muted">{addr.country}</p>
                    </div>
                  ))}
                  <Button
                    variant="link"
                    className="p-0 text-primary"
                    onClick={() => {
                      setShowNewAddressModal(true);
                      setShowAddressBox(false);
                    }}
                  >
                    ➕ New Address
                  </Button>
                </div>
              )}
            </Card>

            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        </Tab>

        {/* ---------------- Field Customization Tab ---------------- */}
        <Tab eventKey="customization" title="Field Customization">
          <div className="mt-3">
            {/* Top-right actions (skip 'Unavailable in your current plan') */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="me-3 text-muted small">Custom Fields Usage: 0/59</span>
              </div>
              <Button variant="primary" size="sm" onClick={() => setShowCustomFieldForm(true)}>
                + New Custom Field
              </Button>
            </div>

            {/* Column headers */}
            <div className="d-flex border-bottom pb-2 fw-semibold text-muted small">
              <div className="flex-grow-1">FIELD NAME</div>
              <div className="flex-grow-1">DATA TYPE</div>
              <div className="flex-grow-1">MANDATORY</div>
              <div className="flex-grow-1">SHOW IN ALL PDFS</div>
              <div className="flex-grow-1">STATUS</div>
            </div>

            {/* Empty message */}
            <div className="text-center text-muted mt-5">
              Do you have information that doesn't go under any existing field? Go ahead and create a custom field.
            </div>
          </div>
        </Tab>
      </Tabs>

      {/* ---------------- New Address Modal (top-center) ---------------- */}
      <Modal
        show={showNewAddressModal}
        onHide={() => setShowNewAddressModal(false)}
        dialogClassName="custom-modal-position"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>New address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddAddress}>
            <Form.Group className="mb-2">
              <Form.Label>Attention</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter attention name"
                value={newAddress.attention}
                onChange={(e) => setNewAddress({ ...newAddress, attention: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Street 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Street address 1"
                value={newAddress.street1}
                onChange={(e) => setNewAddress({ ...newAddress, street1: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Street 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Street address 2"
                value={newAddress.street2}
                onChange={(e) => setNewAddress({ ...newAddress, street2: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>State/Province</Form.Label>
              <Form.Control
                type="text"
                placeholder="State or Province"
                value={newAddress.state}
                onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>ZIP/Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="ZIP Code"
                value={newAddress.zip}
                onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Country/Region</Form.Label>
              <Select
                options={countryOptions}
                value={newAddress.country}
                onChange={(val) => setNewAddress({ ...newAddress, country: val })}
                placeholder="Select or type to add"
                isSearchable
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Select
                options={phoneOptions}
                value={phoneOptions.find((opt) => opt.value === newAddress.phone) || null}
                onChange={(val) => setNewAddress({ ...newAddress, phone: val.value })}
                placeholder="Select or type to add"
                isSearchable
              />
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowNewAddressModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Shipment;
