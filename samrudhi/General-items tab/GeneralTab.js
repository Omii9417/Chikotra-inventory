import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Form, Button, Dropdown } from "react-bootstrap";
import {
  FaSearch,
  FaCopy,
  FaList,
  FaExclamationTriangle,
  FaBoxes,
  FaCog,
} from "react-icons/fa";

function GeneralTab() {
  // States for checkboxes/switches
  const [duplicateName, setDuplicateName] = useState(false);
  const [enhancedSearch, setEnhancedSearch] = useState(false);
  const [priceLists, setPriceLists] = useState(false);
  const [compositeItems, setCompositeItems] = useState(false);
  const [replenishments, setReplenishments] = useState(false);

  // States for dropdowns
  const [decimalRate, setDecimalRate] = useState("2");
  const [dimensionUnit, setDimensionUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [barcodeType, setBarcodeType] = useState("SKU");

  // Replenishment states
  const [replenishFrequency, setReplenishFrequency] = useState("1");
  const [replenishUnit, setReplenishUnit] = useState("Days");

  // Save button handler
  const handleSave = () => {
    const settings = {
      decimalRate,
      dimensionUnit,
      weightUnit,
      barcodeType,
      duplicateName,
      enhancedSearch,
      priceLists,
      compositeItems,
      replenishments,
      replenishFrequency,
      replenishUnit,
    };
    console.log("Saved Settings:", settings);
    alert("Settings saved! Check console for details.");
  };

  // Reusable Warning Box
  const WarningBox = ({ text }) => (
    <div className="d-flex align-items-start mt-2 p-2 bg-warning bg-opacity-25 border-start border-4 border-warning rounded">
      <FaExclamationTriangle className="me-2 mt-1 text-warning" />
      <span>{text}</span>
    </div>
  );

  // Generic reusable searchable dropdown
  const SearchableDropdown = ({ options, value, onChange }) => {
    const [search, setSearch] = useState("");
    const filtered = options.filter((opt) =>
      opt.toString().toLowerCase().includes(search.toLowerCase())
    );

    return (
      <Dropdown>
        <Dropdown.Toggle
          size="sm"
          variant="outline-secondary"
          id="dropdown-basic"
          style={{ minWidth: "120px" }}
        >
          {value}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ minWidth: "150px" }}>
          <Form.Control
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
            size="sm"
          />
          {filtered.map((opt, idx) => (
            <Dropdown.Item key={idx} onClick={() => onChange(opt)}>
              {opt}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  // Decimal Rate options 0 to 10
  const decimalOptions = Array.from({ length: 11 }, (_, i) => i.toString());

  return (
    <Container fluid className="p-4 d-flex justify-content-center">
      <Row style={{ maxWidth: "900px", width: "100%" }}>
        <Col md={12}>
          <h3 className="mb-4">Items</h3>

          {/* General Settings */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">General</h5>
              <Row className="align-items-center mb-2">
                <Col md={8}>
                  Set a decimal rate for your item quantity
                </Col>
                <Col md={4}>
                  <SearchableDropdown
                    options={decimalOptions}  // Updated options 0-10
                    value={decimalRate}
                    onChange={setDecimalRate}
                  />
                </Col>
              </Row>

              <Row className="align-items-center mb-2">
                <Col md={8}>Measure item dimensions in:</Col>
                <Col md={4}>
                  <SearchableDropdown
                    options={["cm", "mm", "inch"]}
                    value={dimensionUnit}
                    onChange={setDimensionUnit}
                  />
                </Col>
              </Row>

              <Row className="align-items-center mb-2">
                <Col md={8}>Measure item weights in:</Col>
                <Col md={4}>
                  <SearchableDropdown
                    options={["kg", "g", "lb","OZ"]}
                    value={weightUnit}
                    onChange={setWeightUnit}
                  />
                </Col>
              </Row>

              <Row className="align-items-center mb-2">
                <Col md={8}>
                  Select items when barcodes are scanned using:
                </Col>
                <Col md={4}>
                  <SearchableDropdown
                    options={["SKU", "EAN", "UPC","ISBN"]}
                    value={barcodeType}
                    onChange={setBarcodeType}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Duplicate Item Name */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5>
                <FaCopy className="me-2 text-success" /> Duplicate Item Name
              </h5>
              <Form.Check
                type="checkbox"
                id="duplicate-name-checkbox"
                aria-label="Allow duplicate item names"
                label="Allow items with duplicate names"
                checked={duplicateName}
                onChange={() => setDuplicateName(!duplicateName)}
              />
              <WarningBox text="Before you enable this option, make the SKU field active and mandatory." />
            </Card.Body>
          </Card>

          {/* Enhanced Item Search */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5>
                <FaSearch className="me-2 text-primary" /> Enhanced Item Search
              </h5>
              <Form.Check
                type="checkbox"
                id="enhanced-search-checkbox"
                aria-label="Enable enhanced item search"
                label="Enable enhanced search for items"
                checked={enhancedSearch}
                onChange={() => setEnhancedSearch(!enhancedSearch)}
              />
              <WarningBox text="Enabling this option makes it easier to find any item using relevant keywords in any order." />
            </Card.Body>
          </Card>

          {/* Price Lists */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5>
                <FaList className="me-2 text-danger" /> Price Lists
              </h5>
              <Form.Check
                type="checkbox"
                id="price-lists-checkbox"
                aria-label="Enable price lists"
                label="Enable Price Lists"
                checked={priceLists}
                onChange={() => setPriceLists(!priceLists)}
              />
              <WarningBox text="Price Lists enable you to customise the rates of the items in your sales and purchase transactions." />
            </Card.Body>
          </Card>

          {/* Composite Items */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5>
                <FaBoxes className="me-2 text-secondary" /> Composite Items
              </h5>
              <Form.Check
                type="checkbox"
                id="composite-items-checkbox"
                aria-label="Enable composite items"
                label="Enable Composite Items"
                checked={compositeItems}
                onChange={() => setCompositeItems(!compositeItems)}
              />

              {compositeItems && (
                <Form.Group className="mt-3">
                  <Form.Label>Inventory Start Date</Form.Label>
                  <Form.Control type="date" defaultValue="2025-09-10" />
                </Form.Group>
              )}
            </Card.Body>
          </Card>

          {/* Advanced Inventory Tracking */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5>
                <FaCog className="me-2 text-dark" /> Advanced Inventory Tracking
              </h5>
              <Form.Check className="mt-2" type="checkbox" label="Enable Serial Number Tracking" />
              <Form.Check className="mt-2" type="checkbox" label="Enable Batch Tracking" />
              <Form.Check
                className="mt-2"
                type="checkbox"
                label="Prevent stock from going below zero"
                defaultChecked
              />
              <Form.Check
                className="mt-2"
                type="checkbox"
                label="Show an Out of Stock warning when an item’s stock drops below zero"
              />
              <Form.Check
                className="mt-2"
                type="checkbox"
                label="Notify me if an item’s quantity reaches the reorder point"
              />
              <Form.Check className="mt-2" type="checkbox" label="Track landed cost on items" />
            </Card.Body>
          </Card>

          {/* Replenishments */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={6}>
                  <h5>
                    Replenishments
                    <span className="badge bg-warning text-dark ms-1">New</span>
                  </h5>
                </Col>
                <Col
                  md={6}
                  className="text-end d-flex justify-content-end align-items-center"
                >
                  <Form.Check
                    type="switch"
                    id="replenishments-switch"
                    aria-label="Enable or disable replenishments"
                    label={replenishments ? "Enabled" : "Disabled"}
                    checked={replenishments}
                    onChange={() => setReplenishments(!replenishments)}
                    className="me-2"
                  />
                </Col>
              </Row>

              {replenishments && (
                <>
                  <Form.Group className="mt-3">
                    <Form.Label>
                      Select how frequently you would like to replenish the stock
                    </Form.Label>
                    <Row>
                      <Col md={3}>
                        <Form.Select
                          value={replenishFrequency}
                          onChange={(e) => setReplenishFrequency(e.target.value)}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </Form.Select>
                      </Col>
                      <Col md={3}>
                        <Form.Select
                          value={replenishUnit}
                          onChange={(e) => setReplenishUnit(e.target.value)}
                        >
                          <option>Days</option>
                          <option>Weeks</option>
                          <option>Months</option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Check
                    className="mt-3"
                    type="checkbox"
                    label="Include Yet to Receive and In Transit stock along with available for sale to generate replenishment tasks"
                  />
                  <p className="text-muted small mt-1">
                    By enabling this preference, the quantity to replenish will include yet to
                    receive and in transit stock along with available for sale while generating
                    replenishment tasks.
                  </p>
                </>
              )}
            </Card.Body>
          </Card>

          {/* Save Button */}
          <div className="text-start mb-5">
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GeneralTab;
