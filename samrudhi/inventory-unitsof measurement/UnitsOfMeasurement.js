import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, Modal, Button, Form, Alert } from "react-bootstrap";
import Select from "react-select";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./UnitsOfMeasurement.css";

function UnitsOfMeasurement() {
  const [openRow, setOpenRow] = useState(null);
  const [editRow, setEditRow] = useState(null);

  const [showNewUnitModal, setShowNewUnitModal] = useState(false);
  const [showConversionModal, setShowConversionModal] = useState(false);

  const [units, setUnits] = useState([
    { name: "Box", symbol: "box", precision: "" },
    { name: "Centimeter", symbol: "cm", precision: "" },
    { name: "Dozen", symbol: "dz", precision: "" },
    { name: "Grams", symbol: "g", precision: "" },
    { name: "Inches", symbol: "in", precision: "" },
    { name: "Kilograms", symbol: "kg", precision: "" },
    { name: "Kilometers", symbol: "km", precision: "" },
    { name: "Pounds", symbol: "lb", precision: "" },
    { name: "Milli Grams", symbol: "mg", precision: "" },
    { name: "Milli Litre", symbol: "ml", precision: "" },
    { name: "Meter", symbol: "m", precision: "" },
    { name: "Pieces", symbol: "pcs", precision: "" },
  ]);

  // New Unit form state
  const [newUnit, setNewUnit] = useState({ name: "", symbol: "", precision: "0" });

  // New Conversion state
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [conversionTarget, setConversionTarget] = useState(null);
  const [conversionRate, setConversionRate] = useState("");

  // Alert state
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  // Page toggle: "units" or "conversions"
  const [page, setPage] = useState("units");

  const handleSaveNewUnit = () => {
    setUnits([...units, newUnit]);
    setAlertMsg(`Unit "${newUnit.name}" added successfully!`);
    setAlertType("success");
    setNewUnit({ name: "", symbol: "", precision: "0" });
    setShowNewUnitModal(false);

    setTimeout(() => setAlertMsg(""), 3000);
  };

  const handleDeleteUnit = (index) => {
    const deletedUnit = units[index].name;
    const updatedUnits = [...units];
    updatedUnits.splice(index, 1);
    setUnits(updatedUnits);

    setAlertMsg(`Unit "${deletedUnit}" deleted successfully!`);
    setAlertType("danger");
    setEditRow(null);
    setOpenRow(null);

    setTimeout(() => setAlertMsg(""), 3000);
  };

  const handleSaveConversion = () => {
    if (!conversionTarget || !conversionRate) {
      setAlertMsg("Please select target unit and enter conversion rate.");
      setAlertType("danger");
      setTimeout(() => setAlertMsg(""), 3000);
      return;
    }

    setAlertMsg(
      `Conversion added: 1 ${selectedUnit.symbol} = ${conversionRate} ${conversionTarget.symbol}`
    );
    setAlertType("success");
    setShowConversionModal(false);
    setConversionTarget(null);
    setConversionRate("");

    setTimeout(() => setAlertMsg(""), 3000);
  };

  return (
    <div className="container mt-4">
      {/* Floating Alert */}
      {alertMsg && (
        <div className="custom-alert-center">
          <Alert variant={alertType} className="mb-0 py-2 px-3 text-center">
            {alertMsg}
          </Alert>
        </div>
      )}

      {/* Page 1: Units Listing */}
      {page === "units" && (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h4>Units of Measurement</h4>
            <Button
              variant="primary"
              onClick={() => setShowNewUnitModal(true)}
              className="btn-sm"
            >
              + New Unit
            </Button>
          </div>

          <table className="table table-hover mt-3">
            <thead>
              <tr>
                <th>UNIT NAME</th>
                <th>SYMBOL</th>
                <th>UNIT PRECISION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {units.map((unit, index) => (
                <tr key={index}>
                  <td>{unit.name}</td>
                  <td>{unit.symbol}</td>
                  <td>{unit.precision}</td>
                  <td className="text-end">
                    <Dropdown
                      show={openRow === index}
                      onMouseEnter={() => setOpenRow(index)}
                      onMouseLeave={() => setOpenRow(null)}
                    >
                      <Dropdown.Toggle
                        variant="light"
                        className="dropdown-toggle-btn"
                      >
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {editRow !== index && (
                          <Dropdown.Item
                            onClick={() => {
                              setEditRow(index);
                              setOpenRow(index);
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                        )}

                        {editRow === index && (
                          <>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedUnit(unit);
                                setPage("conversions");
                              }}
                            >
                              View Unit Conversions
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-danger"
                              onClick={() => handleDeleteUnit(index)}
                            >
                              Delete
                            </Dropdown.Item>
                          </>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Page 2: Unit Conversions */}
      {page === "conversions" && selectedUnit && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <Button
                variant="link"
                className="p-0"
                onClick={() => {
                  setPage("units");
                  setSelectedUnit(null);
                  setEditRow(null);
                }}
              >
                &lt; Back
              </Button>
              <h5 className="d-inline ms-2">
                {selectedUnit.name} ({selectedUnit.symbol}) - Unit Conversions
              </h5>
            </div>
            <Button
              variant="primary"
              className="btn-sm"
              onClick={() => setShowConversionModal(true)}
            >
              + New Unit Conversion
            </Button>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>TARGET UNIT</th>
                <th>UNIT CONVERSION RATE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" className="text-center text-muted">
                  No unit conversion found
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {/* New Unit Modal */}
      <Modal
        show={showNewUnitModal}
        onHide={() => setShowNewUnitModal(false)}
        dialogClassName="modal-top"
        centered={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Unit Name</Form.Label>
              <Form.Control
                type="text"
                value={newUnit.name}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, name: e.target.value })
                }
                placeholder="Enter unit name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Symbol</Form.Label>
              <Form.Control
                type="text"
                value={newUnit.symbol}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, symbol: e.target.value })
                }
                placeholder="Enter unit symbol"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit Precision</Form.Label>
              <Form.Select
                value={newUnit.precision}
                onChange={(e) =>
                  setNewUnit({ ...newUnit, precision: e.target.value })
                }
              >
                {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowNewUnitModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveNewUnit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* New Conversion Modal */}
      <Modal
        show={showConversionModal}
        onHide={() => setShowConversionModal(false)}
        dialogClassName="modal-top"
        centered={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Unit Conversion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center gap-2">
            <span>1</span>
            <div style={{ flex: 1 }}>
              <Select
                placeholder="Select Target Unit"
                options={units
                  .filter((u) => u.symbol !== selectedUnit?.symbol)
                  .map((u) => ({ label: `${u.name} (${u.symbol})`, value: u }))}
                value={
                  conversionTarget
                    ? {
                        label: `${conversionTarget.name} (${conversionTarget.symbol})`,
                        value: conversionTarget,
                      }
                    : null
                }
                onChange={(option) => setConversionTarget(option.value)}
                isSearchable
              />
            </div>
            <span>=</span>
            <Form.Control
              type="number"
              placeholder="Conversion Rate"
              value={conversionRate}
              onChange={(e) => setConversionRate(e.target.value)}
              style={{ width: "150px" }}
            />
            <span>{selectedUnit?.name}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSaveConversion}>
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowConversionModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UnitsOfMeasurement;
