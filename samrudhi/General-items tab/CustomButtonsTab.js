import React, { useState } from "react";
import {
  Dropdown,
  Button,
  ButtonGroup,
  Form,
  Modal,
} from "react-bootstrap";
import { X, ExclamationTriangleFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function CustomButtonsTab() {
  const [location, setLocation] = useState("All");
  const [page, setPage] = useState("main"); // main | newButton | newLink
  const [showCancelModal, setShowCancelModal] = useState(false);

  const locations = [
    "All",
    "Details Page Menu",
    "List Page - Action Menu",
    "List Page - Bulk Action Menu",
  ];

  const placeholders = [
    "ITEM",
    "Item ID",
    "Item Name",
    "Item Type",
    "Sales Description",
    "Sales Price",
    "Account Name",
    "Purchase Account Name",
    "Purchase Price",
    "Usage Unit",
    "Tax ID",
    "Purchase Description",
    "SKU",
    "Inventory Account Name",
    "Reorder Level",
    "Initial Stock",
    "Initial Stock Rate",
    "Stock In Hand",
    "Vendor Name",
    "Created By",
    "Modified By",
    "Created Time",
    "Modified Time",
    "Status",
    "UPC",
    "EAN",
    "MPN",
    "ISBN",
    "Brand",
    "Manufacturer",
    "Preferred Vendor",
    "Package Weight",
    "Package Length",
    "Package Width",
    "Package Height",
  ];

  const [url, setUrl] = useState("");

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const handlePlaceholderInsert = (ph) => {
    const textarea = document.getElementById("urlInput");
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        url.substring(0, start) + "${" + ph + "}" + url.substring(end);
      setUrl(newText);
    }
  };

  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    setPage("main");
  };

  const closeModal = () => {
    setShowCancelModal(false);
  };

  // ---------- New Custom Button Page ----------
  const renderNewButtonPage = () => (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h6 className="m-0">New Custom Button - Items</h6>
        <X role="button" className="text-danger" onClick={handleCancelClick} />
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <span className="text-danger">Custom Button Name</span> <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control type="text" size="sm" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Select size="sm" defaultValue="Details Page Menu">
            {locations.slice(1).map((loc, index) => (
              <option key={index}>{loc}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" size="sm" className="me-2">
          Proceed
        </Button>
        <Button variant="secondary" size="sm" onClick={handleCancelClick}>
          Cancel
        </Button>
      </Form>
    </div>
  );

  // ---------- New Custom Link Page ----------
  const renderNewLinkPage = () => (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h6 className="m-0">New Custom Link - Items</h6>
        <X role="button" className="text-danger" onClick={handleCancelClick} />
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            <span className="text-danger">Custom Link Name</span> <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control type="text" size="sm" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Select size="sm" defaultValue="Details Page Menu">
            {locations.slice(1).map((loc, index) => (
              <option key={index}>{loc}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Visibility</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Only Me"
              name="visibility"
              defaultChecked
            />
            <Form.Check
              inline
              type="radio"
              label="Only Selected Users & Roles"
              name="visibility"
            />
            <Form.Check inline type="radio" label="Everyone" name="visibility" />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <span className="text-danger">URL</span> <span className="text-danger">*</span>
          </Form.Label>
          <div className="d-flex">
            <Form.Control
              as="textarea"
              rows={3}
              id="urlInput"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.example.com?item_name=${ITEM.NAME}"
            />
            <Dropdown className="ms-2">
              <Dropdown.Toggle variant="link" className="p-0 small">
                Insert Placeholders
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  width: "250px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
                className="small"
              >
                {placeholders.map((ph, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handlePlaceholderInsert(ph)}
                  >
                    {ph}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Form.Group>

        <Button variant="primary" size="sm" className="me-2">
          Save
        </Button>
        <Button variant="secondary" size="sm" onClick={handleCancelClick}>
          Cancel
        </Button>
      </Form>
    </div>
  );

  // ---------- Main Page ----------
  const renderMainPage = () => (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <span className="me-2">Location :</span>
          <Dropdown onSelect={handleLocationChange}>
            <Dropdown.Toggle
              variant="light"
              className="border bg-white"
              size="sm"
            >
              {location}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {locations.map((loc, index) => (
                <Dropdown.Item key={index} eventKey={loc}>
                  {loc}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="d-flex align-items-center">
          <a href="#" className="me-3 text-primary small">
            View Logs
          </a>
          <Dropdown as={ButtonGroup}>
            <Button variant="primary" size="sm">
              + New
            </Button>
            <Dropdown.Toggle
              split
              variant="primary"
              id="dropdown-split-basic"
              size="sm"
            />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setPage("newButton")}>
                New Custom Button
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setPage("newLink")}>
                New Custom Link
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="d-flex px-2 py-2 border-bottom text-secondary small">
        <div className="flex-grow-1">BUTTON NAME</div>
        <div className="flex-grow-1">ACCESS PERMISSION</div>
        <div className="flex-grow-1">LOCATION</div>
      </div>

      <div className="text-center text-muted py-5">
        Create buttons which perform actions set by you. What are you waiting
        for!
      </div>
    </div>
  );

  return (
    <div>
      {page === "main" && renderMainPage()}
      {page === "newButton" && renderNewButtonPage()}
      {page === "newLink" && renderNewLinkPage()}

      {/* Cancel Confirmation Modal */}
      <Modal
        show={showCancelModal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-top"
      >
        <Modal.Body className="d-flex align-items-start">
          <ExclamationTriangleFill
            className="text-warning flex-shrink-0 me-3"
            size={28}
          />
          <div>
            <h6 className="fw-bold mb-2">Leave this page?</h6>
            <p className="mb-3 text-muted small">
              If you leave, your unsaved changes will be discarded.
            </p>
            <div className="d-flex">
              <Button
                variant="primary"
                size="sm"
                className="me-2"
                onClick={closeModal}
              >
                Stay Here
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={confirmCancel}
              >
                Leave &amp; Discard Changes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* CSS to move modal to top */}
      <style>{`
        .modal-top .modal-dialog {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

export default CustomButtonsTab;
