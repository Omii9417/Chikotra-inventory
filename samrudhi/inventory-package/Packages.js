import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Button, Dropdown, Form } from "react-bootstrap";
import Select from "react-select"; // 👈 for searchable dropdown
import "./App.css";

function Packages() {
  const [activeTab, setActiveTab] = useState("field");
  const [location, setLocation] = useState("All");
  const [showCustomFieldPage, setShowCustomFieldPage] = useState(false); // new page toggle
  const [dataType, setDataType] = useState(null); // 👈 track selected data type

  // Data type dropdown options (as per image)
  const dataTypeOptions = [
    { value: "text", label: "Text Box (Single Line)" },
    { value: "email", label: "Email" },
    { value: "url", label: "URL" },
    { value: "phone", label: "Phone" },
    { value: "number", label: "Number" },
    { value: "decimal", label: "Decimal" },
    { value: "amount", label: "Amount" },
    { value: "percent", label: "Percentage" },
    { value: "date", label: "Date" },
    { value: "checkbox", label: "Checkbox" },
    { value: "dropdown", label: "Dropdown" },
    { value: "multiSelect", label: "Multi Select" },
    { value: "longText", label: "Text Box (Multi Line)" },
    { value: "auto-generate number", label: "Auto-Generate Number" },
    { value: "lookup", label: "Lookup" },
    { value: "attachment", label: "Attachment" },
    { value: "image", label: "Image" },
    { value: "date and time", label: "Date and Time" },
    
  ];

  // Save / Cancel handlers
  const handleSave = (e) => {
    e.preventDefault();
    if (!dataType) {
      alert("Please select a Data Type.");
      return;
    }
    alert(`Custom field saved successfully! Data Type: ${dataType.label}`);
    setShowCustomFieldPage(false);
  };

  const handleCancel = () => {
    setShowCustomFieldPage(false);
  };

  // New Custom Field Page (2nd Page)
  if (showCustomFieldPage) {
    return (
      <div className="container mt-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold">New Custom Field - Packages</h6>
          <Button variant="light" size="sm" onClick={handleCancel}>
            ✖
          </Button>
        </div>

        {/* Form */}
        <Form onSubmit={handleSave}>
          {/* Label Name */}
          <Form.Group className="mb-3" controlId="labelName">
            <Form.Label className="fw-semibold text-danger">
              Label Name*
            </Form.Label>
            <Form.Control type="text" placeholder="Enter label name" required />
          </Form.Group>

          {/* Data Type Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-danger">Data Type*</Form.Label>
            <Select
              value={dataType}
              onChange={setDataType}
              options={dataTypeOptions}
              placeholder="Select Data Type"
              isSearchable
              className="basic-single"
              classNamePrefix="select"
            />
          </Form.Group>

          {/* Mandatory */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Is Mandatory</Form.Label>
            <div>
              <Form.Check
                inline
                label="Yes"
                name="mandatory"
                type="radio"
                id="mandatory-yes"
              />
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
            <Form.Label className="fw-semibold">Show in All PDFs</Form.Label>
            <div>
              <Form.Check
                inline
                label="Yes"
                name="pdf"
                type="radio"
                id="pdf-yes"
              />
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
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  // Main Page (Your Original Code)
  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold">Packages</h6>
        {activeTab === "field" && (
          <div>
            <span className="me-3 text-muted small">
              Custom Fields Usage: 0/135
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowCustomFieldPage(true)} // open second page
            >
              + New Custom Field
            </Button>
          </div>
        )}
        {activeTab === "buttons" && (
          <div className="d-flex align-items-center">
            <a
              href="#logs"
              className="me-3 small text-primary text-decoration-none"
            >
              🔄 View Logs
            </a>
            <Dropdown>
              <Dropdown.Toggle variant="primary" size="sm" id="dropdown-basic">
                + New
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action1">Action 1</Dropdown.Item>
                <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
      >
        <Nav.Item>
          <Nav.Link eventKey="field">Field Customization</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="buttons">Custom Buttons</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="lists">Related Lists</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Tab Content */}
      <div className="mt-3">
        {/* Field Customization Tab */}
        {activeTab === "field" && (
          <div>
            {/* Column Headers */}
            <div className="d-flex border-bottom pb-2 fw-semibold text-muted small">
              <div className="flex-grow-1">FIELD NAME</div>
              <div className="flex-grow-1">DATA TYPE</div>
              <div className="flex-grow-1">MANDATORY</div>
              <div className="flex-grow-1">SHOW IN ALL PDFS</div>
              <div className="flex-grow-1">STATUS</div>
            </div>

            {/* Empty message */}
            <div className="text-center text-muted mt-5">
              Do you have information that doesn't go under any existing field? Go
              ahead and create a custom field.
            </div>
          </div>
        )}

        {/* Custom Buttons Tab */}
        {activeTab === "buttons" && (
          <div>
            {/* Location Dropdown */}
            <div className="d-flex align-items-center mb-2">
              <span className="me-2 small fw-semibold text-muted">Location :</span>
              <Dropdown onSelect={(val) => setLocation(val)}>
                <Dropdown.Toggle variant="light" size="sm" className="border">
                  {location}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    eventKey="All"
                    active={location === "All"}
                    className="no-highlight"
                  >
                    All
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="Details Page Menu"
                    active={location === "Details Page Menu"}
                    className="highlight-option"
                  >
                    Details Page Menu
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="List Page - Action Menu"
                    active={location === "List Page - Action Menu"}
                    className="highlight-option"
                  >
                    List Page - Action Menu
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="List Page - Bulk Action Menu"
                    active={location === "List Page - Bulk Action Menu"}
                    className="highlight-option"
                  >
                    List Page - Bulk Action Menu
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Column Headers */}
            <div className="d-flex border-bottom pb-2 fw-semibold text-muted small">
              <div className="flex-grow-1">BUTTON NAME</div>
              <div className="flex-grow-1">ACCESS PERMISSION</div>
              <div className="flex-grow-1">LOCATION</div>
            </div>

            {/* Empty message */}
            <div className="text-center text-muted mt-5">
              Create buttons which perform actions set by you. What are you waiting for!
            </div>
          </div>
        )}

        {/* Related Lists Tab */}
        {activeTab === "lists" && (
          <div className="p-4 text-center text-muted">
            Related Lists section content goes here.
          </div>
        )}
      </div>
    </div>
  );
}

export default Packages;
