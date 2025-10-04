import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select, { components } from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const RecordLocking = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState({
    value: "restrictAll",
    label: "Restrict All Actions",
  });
  const [selectedRole, setSelectedRole] = useState({
    value: "allRoles",
    label: "All Roles",
  });

  const [actionInputValue, setActionInputValue] = useState(""); // for dropdown search
  const [roleInputValue, setRoleInputValue] = useState(""); // for dropdown search

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const actionOptions = [
    { value: "restrictAll", label: "Restrict All Actions" },
    { value: "restrictSelected", label: "Restrict Selected Actions" },
    { value: "allowSelected", label: "Allow Selected Actions" },
  ];

  const roleOptions = [
    { value: "allRoles", label: "All Roles" },
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "employee", label: "Employee" },
  ];

  // ✅ Custom MenuList with a writable search box inside dropdown
  const CustomMenuList = (props) => {
    return (
      <div>
        <div style={{ padding: "5px 10px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={props.selectProps.inputValue}
            onChange={(e) =>
              props.selectProps.onInputChange(e.target.value, {
                action: "input-change",
              })
            }
            style={{
              width: "100%",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <components.MenuList {...props}>{props.children}</components.MenuList>
      </div>
    );
  };

  return (
    <div className="container text-center mt-5">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="display-1 text-secondary">
          <i className="bi bi-lock"></i>
        </div>

        <h4 className="mt-3">Record Locking</h4>

        <p className="text-muted" style={{ maxWidth: "600px" }}>
          Record Locking helps you control updates to records. You can specify
          which actions and field updates to allow or restrict after records are
          locked, and choose who can perform these actions. This is useful for
          protecting important information and preventing accidental changes.
        </p>

        <button className="btn btn-primary" onClick={handleOpen}>
          <i className="bi bi-plus-lg"></i> New Lock Configuration
        </button>
      </div>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>New Lock Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="lockName">
              <Form.Label className="fw-bold text-danger">
                Lock Configuration Name*
              </Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

            <hr />

            {/* Allow or Restrict Actions */}
            <Form.Group
              className="mb-3 d-flex align-items-center"
              controlId="actions"
            >
              <Form.Label className="fw-bold text-danger me-3 mb-0">
                Allow or Restrict Actions*
              </Form.Label>

              <div style={{ flex: 1 }}>
                <Select
                  options={actionOptions}
                  value={selectedAction}
                  onChange={(option) => setSelectedAction(option)}
                  inputValue={actionInputValue} // ✅ controlled input
                  onInputChange={(val) => setActionInputValue(val)}
                  isSearchable
                  placeholder="Select..."
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  components={{ MenuList: CustomMenuList }}
                />
              </div>
            </Form.Group>

            {/* Lock Records For */}
            <Form.Group
              className="mb-3 d-flex align-items-center"
              controlId="lockFor"
            >
              <Form.Label className="fw-bold text-danger me-3 mb-0">
                Lock Records For*
              </Form.Label>

              <div style={{ flex: 1 }}>
                <Select
                  options={roleOptions}
                  value={selectedRole}
                  onChange={(option) => setSelectedRole(option)}
                  inputValue={roleInputValue} // ✅ controlled input
                  onInputChange={(val) => setRoleInputValue(val)}
                  isSearchable
                  placeholder="Select..."
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  components={{ MenuList: CustomMenuList }}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RecordLocking;
