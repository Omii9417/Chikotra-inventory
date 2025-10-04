import React, { useState } from "react";
import { Table, Button, Dropdown, Form, Modal } from "react-bootstrap";
import { BsImage, BsBox, BsTag, BsCurrencyDollar } from "react-icons/bs";
import Select from "react-select";
import "./App.css";

function FieldCustomizationTab() {
  const [fields, setFields] = useState([
    { name: "Selling Price", type: "Decimal", mandatory: false, pdf: true, status: "Active", icon: <BsCurrencyDollar /> },
    { name: "Purchase Price", type: "Decimal", mandatory: false, pdf: true, status: "Active", icon: <BsCurrencyDollar /> },
    { name: "SKU", type: "Text Box (Single Line)", mandatory: false, pdf: false, status: "Active", icon: <BsTag /> },
    { name: "Image", type: "Text Box (Single Line)", mandatory: false, pdf: false, status: "Active", icon: <BsImage /> },
    { name: "Category", type: "Text Box (Single Line)", mandatory: false, pdf: false, status: "Active", icon: <BsBox /> },
    { name: "MRP", type: "Decimal", mandatory: false, pdf: false, status: "Active", icon: <BsCurrencyDollar /> },
    { name: "Alias Name", type: "Text Box (Single Line)", mandatory: false, pdf: false, status: "Inactive", icon: <BsTag /> },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newField, setNewField] = useState({ name: "", type: null, mandatory: false });
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [currentField, setCurrentField] = useState(null);
  const [roleAccess, setRoleAccess] = useState({ Admin: "readWrite" });
  const [showPopup, setShowPopup] = useState(false);   // ✅ Popup state

  const dataTypeOptions = [
    { value: "text", label: "Text Box (Single Line)" },
    { value: "email", label: "Email" },
    { value: "url", label: "URL" },
    { value: "phone", label: "Phone" },
    { value: "number", label: "Number" },
    { value: "decimal", label: "Decimal" },
    { value: "amount", label: "Amount" },
  ];

  // ✅ Show popup function
  const triggerPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const handleStatusChange = (index, value) => {
    const updatedFields = [...fields];
    updatedFields[index].status = value;
    setFields(updatedFields);
    triggerPopup();
  };

  const handleSave = () => {
    if (!newField.name.trim() || !newField.type) {
      alert("Please fill in all required fields.");
      return;
    }
    setFields([
      ...fields,
      {
        name: newField.name,
        type: newField.type ? newField.type.label : "",
        mandatory: newField.mandatory,
        pdf: false,
        status: "Active",
        icon: <BsTag />,
      },
    ]);
    setNewField({ name: "", type: null, mandatory: false });
    setShowForm(false);
    triggerPopup();
  };

  const openAccessModal = (field) => {
    setCurrentField(field);
    setShowAccessModal(true);
  };

  const handleAccessChange = (role, value) => {
    setRoleAccess({ ...roleAccess, [role]: value });
  };

  const handleAccessSave = () => {
    console.log("Saved Access:", roleAccess);
    setShowAccessModal(false);
    triggerPopup();
  };

  // If showForm is true → Show add form
  if (showForm) {
    return (
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6>New Custom Field - Items</h6>
          <Button variant="link" className="text-decoration-none fs-5" onClick={() => setShowForm(false)}>
            ×
          </Button>
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Label Name<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={newField.name}
              onChange={(e) => setNewField({ ...newField, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Data Type<span className="text-danger">*</span>
            </Form.Label>
            <Select
              options={dataTypeOptions}
              value={newField.type}
              onChange={(selected) => setNewField({ ...newField, type: selected })}
              placeholder="Search"
              isSearchable
              menuPlacement="auto"
              styles={{
                menu: (provided) => ({ ...provided, maxHeight: 220 }),
                menuList: (provided) => ({ ...provided, maxHeight: 200 }),
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Is Mandatory</Form.Label>
            <div>
              <Form.Check
                inline
                label="Yes"
                name="mandatory"
                type="radio"
                checked={newField.mandatory}
                onChange={() => setNewField({ ...newField, mandatory: true })}
              />
              <Form.Check
                inline
                label="No"
                name="mandatory"
                type="radio"
                checked={!newField.mandatory}
                onChange={() => setNewField({ ...newField, mandatory: false })}
              />
            </div>
          </Form.Group>
          <Button variant="primary" className="me-2" onClick={handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
        </Form>
      </div>
    );
  }

  // Otherwise → Main Table
  return (
    <div className="p-3">
      {/* ✅ Popup message at top */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#eaf7f0",
            padding: "10px 20px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            fontSize: "14px",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: "#2ecc71",
              color: "white",
              borderRadius: "6px",
              padding: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
            }}
          >
            ✔
          </div>
          <div>Preferences have been saved.</div>
        </div>
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Custom Fields Usage: 0/135</span>
        <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
          + New Custom Field
        </Button>
      </div>

      {/* Table */}
      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>FIELD NAME</th>
            <th>DATA TYPE</th>
            <th>MANDATORY</th>
            <th>SHOW IN ALL PDFS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <td>{field.icon} &nbsp; {field.name}</td>
              <td>{field.type}</td>
              <td className="text-center">{field.mandatory ? "Yes" : "No"}</td>
              <td className="text-center">{field.pdf ? "Yes" : "No"}</td>
              <td className="text-center status-cell">
                <div className="d-flex justify-content-center align-items-center">
                  <span className="me-2">{field.status}</span>
                  <Dropdown className="status-dropdown">
                    <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 bg-transparent" className="text-primary caret-toggle">
                      ▼
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {["Selling Price", "Purchase Price"].includes(field.name) ? (
                        <Dropdown.Item
                          onClick={() => openAccessModal(field)}
                          style={{ backgroundColor: "#0d6efd", color: "#fff", fontWeight: "500" }}
                        >
                          Configure Access
                        </Dropdown.Item>
                      ) : ["SKU", "MRP"].includes(field.name) ? (
                        <>
                          <Dropdown.Item onClick={() => handleStatusChange(index, field.status === "Active" ? "Inactive" : "Active")}>
                            Mark as {field.status === "Active" ? "Inactive" : "Active"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              const updatedFields = [...fields];
                              updatedFields[index].pdf = !updatedFields[index].pdf;
                              setFields(updatedFields);
                              triggerPopup();
                            }}
                          >
                            {field.pdf ? "Remove from All PDFs" : "Show in All PDFs"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              const updatedFields = [...fields];
                              updatedFields[index].mandatory = !updatedFields[index].mandatory;
                              setFields(updatedFields);
                              triggerPopup();
                            }}
                          >
                            {field.mandatory ? "Unmark Mandatory" : "Mark as Mandatory"}
                          </Dropdown.Item>
                        </>
                      ) : field.name === "Image" ? (
                        <>
                          <Dropdown.Item onClick={() => handleStatusChange(index, field.status === "Active" ? "Inactive" : "Active")}>
                            Mark as {field.status === "Active" ? "Inactive" : "Active"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              const updatedFields = [...fields];
                              updatedFields[index].pdf = !updatedFields[index].pdf;
                              setFields(updatedFields);
                              triggerPopup();
                            }}
                          >
                            {field.pdf ? "Remove from All PDFs" : "Show in All PDFs"}
                          </Dropdown.Item>
                        </>
                      ) : ["Category", "Alias Name"].includes(field.name) ? (
                        <Dropdown.Item onClick={() => handleStatusChange(index, field.status === "Active" ? "Inactive" : "Active")}>
                          Mark as {field.status === "Active" ? "Inactive" : "Active"}
                        </Dropdown.Item>
                      ) : (
                        <>
                          <Dropdown.Item onClick={() => handleStatusChange(index, "Active")}>
                            Active
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleStatusChange(index, "Inactive")}>
                            Inactive
                          </Dropdown.Item>
                        </>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Configure Access Modal */}
      <Modal
        show={showAccessModal}
        onHide={() => setShowAccessModal(false)}
        size="lg"
        centered={false}
        dialogClassName="mt-5"
      >
        <Modal.Header closeButton>
          <Modal.Title>Read / Write Access for {currentField?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>ROLE</th>
                <th>READ AND WRITE</th>
                <th>READ ONLY</th>
                <th>HIDE FIELD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Admin</td>
                <td className="text-center">
                  <Form.Check type="radio" name="adminAccess" checked={roleAccess.Admin === "readWrite"} onChange={() => handleAccessChange("Admin", "readWrite")} />
                </td>
                <td className="text-center">
                  <Form.Check type="radio" name="adminAccess" checked={roleAccess.Admin === "readOnly"} onChange={() => handleAccessChange("Admin", "readOnly")} />
                </td>
                <td className="text-center">
                  <Form.Check type="radio" name="adminAccess" checked={roleAccess.Admin === "hideField"} onChange={() => handleAccessChange("Admin", "hideField")} />
                </td>
              </tr>
            </tbody>
          </Table>
          <small className="text-muted">
            Note: If you select <b>Read Only</b> or <b>Hide Field</b> for a role, users under that role will not be able to update the {currentField?.name}.
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAccessSave}>Save</Button>
          <Button variant="secondary" onClick={() => setShowAccessModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FieldCustomizationTab;
