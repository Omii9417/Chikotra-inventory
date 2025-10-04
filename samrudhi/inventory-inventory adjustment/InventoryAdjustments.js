import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab, Card, Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select"; 
import { FaQuestionCircle } from "react-icons/fa";
import "./App.css";

function InventoryAdjustments() {
  const [activeTab, setActiveTab] = useState("approvals");
  const [approvalType, setApprovalType] = useState("noApproval");
  const [showNewFieldForm, setShowNewFieldForm] = useState(false);
  const [customFields, setCustomFields] = useState([]);

  const [fieldData, setFieldData] = useState({
    labelName: "",
    dataType: "",
    hyperlinkLabel: "",
    helpText: "",
    pii: false,
    ephi: false,
    inputFormat: "",
    defaultValue: "",
    mandatory: "No",
    showInPdf: "No",
    status: "Active",
    dataPrivacy: "",
  });

  const [useCustomFormat, setUseCustomFormat] = useState(false);

  const handleSaveApproval = () => {
    alert(`Selected Approval Type: ${approvalType}`);
  };

  const handleSaveCustomField = () => {
    if (!fieldData.labelName || !fieldData.dataType) {
      alert("Label Name and Data Type are required!");
      return;
    }
    setCustomFields([...customFields, { ...fieldData }]);
    setFieldData({
      labelName: "",
      dataType: "",
      hyperlinkLabel: "",
      helpText: "",
      pii: false,
      ephi: false,
      inputFormat: "",
      defaultValue: "",
      mandatory: "No",
      showInPdf: "No",
      status: "Active",
      dataPrivacy: "",
    });
    setShowNewFieldForm(false);
  };

  const dataTypeOptions = [
    { value: "Text Box (Single Line)", label: "Text Box (Single Line)" },
    { value: "Email", label: "Email" },
    { value: "URL", label: "URL" },
    { value: "Phone", label: "Phone" },
    { value: "Number", label: "Number" },
    { value: "Decimal", label: "Decimal" },
    { value: "Amount", label: "Amount" },
    { value: "Date", label: "Date" },
    { value: "Dropdown", label: "Dropdown" },
    { value: "Checkbox", label: "Checkbox" },
    { value: "Multi Line Text", label: "Multi Line Text" },
    { value: "Percentage", label: "Percentage" },
    { value: "Date and Time", label: "Date and Time" },
    { value: "Auto-Generate Number", label: "Auto-Generate Number" },
    { value: "Multi-Select", label: "Multi-Select" },
    { value: "Attachment", label: "Attachment" },
    { value: "Image", label: "Image" },
    { value: "Lookup", label: "Lookup" },
  ];

  const inputFormatOptions = [
    { value: "Numbers", label: "Numbers" },
    { value: "AlphanumericWithoutSpaces", label: "Alphanumeric Without Spaces" },
    { value: "AlphanumericWithSpaces", label: "Alphanumeric With Spaces" },
    { value: "AlphanumericHyphensUnderscores", label: "Alphanumeric With Hyphens/Underscores" },
    { value: "AlphabetsWithoutSpaces", label: "Alphabets Without Spaces" },
    { value: "AlphabetsWithSpaces", label: "Alphabets With Spaces" },
  ];

  return (
    <div className="container mt-4">
      <h4>Inventory Adjustments</h4>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => {
          setActiveTab(k);
          setShowNewFieldForm(false);
        }}
        className="mb-3"
      >
        <Tab eventKey="approvals" title="Approvals">
          <h6 className="mb-3">Approval Type</h6>
          <div className="d-flex gap-3">
            <Card
              className={`p-3 flex-fill ${approvalType === "noApproval" ? "border-primary" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setApprovalType("noApproval")}
            >
              <Form.Check
                type="radio"
                name="approvalType"
                checked={approvalType === "noApproval"}
                onChange={() => setApprovalType("noApproval")}
                label="No Approval"
              />
              <small className="text-muted">
                Create Inventory Adjustment and perform further actions without approval.
              </small>
            </Card>

            <Card
              className={`p-3 flex-fill ${approvalType === "simpleApproval" ? "border-primary" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setApprovalType("simpleApproval")}
            >
              <Form.Check
                type="radio"
                name="approvalType"
                checked={approvalType === "simpleApproval"}
                onChange={() => setApprovalType("simpleApproval")}
                label="Simple Approval"
              />
              <small className="text-muted">
                Any user with approve permission can approve the Inventory Adjustment.
              </small>
            </Card>

            <Card
              className={`p-3 flex-fill ${approvalType === "multiLevel" ? "border-primary" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setApprovalType("multiLevel")}
            >
              <Form.Check
                type="radio"
                name="approvalType"
                checked={approvalType === "multiLevel"}
                onChange={() => setApprovalType("multiLevel")}
                label="Multi-Level Approval"
              />
              <small className="text-muted">
                Set many levels of approval. The Inventory Adjustment will be approved only when all the approvers approve.
              </small>
            </Card>
          </div>

          <div className="mt-4">
            <Button variant="primary" onClick={handleSaveApproval}>
              Save
            </Button>
          </div>
        </Tab>

        <Tab eventKey="fieldCustomization" title="Field Customization">
          {!showNewFieldForm ? (
            <>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted small">
                  Custom Fields Usage: {customFields.length}/150
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowNewFieldForm(true)}
                >
                  + New Custom Field
                </Button>
              </div>

              <div className="d-flex border-bottom mt-3 py-2 fw-semibold text-muted small">
                <div className="flex-fill">FIELD NAME</div>
                <div className="flex-fill">DATA TYPE</div>
                <div className="flex-fill">MANDATORY</div>
                <div className="flex-fill">SHOW IN ALL PDFS</div>
                <div className="flex-fill">STATUS</div>
              </div>

              {customFields.length === 0 ? (
                <div className="text-center text-muted py-5">
                  Do you have information that doesn't go under any existing field? Go ahead and create a custom field.
                </div>
              ) : (
                customFields.map((field, index) => (
                  <div
                    key={index}
                    className="d-flex border-bottom py-2 small align-items-center"
                  >
                    <div className="flex-fill">{field.labelName}</div>
                    <div className="flex-fill">{field.dataType}</div>
                    <div className="flex-fill">{field.mandatory}</div>
                    <div className="flex-fill">{field.showInPdf}</div>
                    <div className="flex-fill">{field.status}</div>
                  </div>
                ))
              )}
            </>
          ) : (
            <div className="mt-3 position-relative">
              <h6 className="mb-4">New Custom Field - Inventory Adjustments</h6>
              <button
                type="button"
                className="btn-close position-absolute"
                style={{ top: 0, right: 0 }}
                aria-label="Close"
                onClick={() => setShowNewFieldForm(false)}
              ></button>

              <Form>
                {/* Label Name */}
                <Form.Group className="mb-3 compact-input" controlId="labelName">
                  <Form.Label>
                    Label Name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    placeholder="Enter label name"
                    value={fieldData.labelName}
                    onChange={(e) =>
                      setFieldData({ ...fieldData, labelName: e.target.value })
                    }
                  />
                </Form.Group>

                {/* Data Type */}
                <Form.Group className="mb-3 compact-input" controlId="dataType">
                  <Form.Label>
                    Data Type<span className="text-danger">*</span>{" "}
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="tooltip-dataType">
                          A short text, numerical value or a combination of both upto 255 characters.
                        </Tooltip>
                      }
                    >
                      <span style={{ marginLeft: "5px", cursor: "pointer", verticalAlign: "middle" }}>
                        <FaQuestionCircle size={14} color="#6c757d" />
                      </span>
                    </OverlayTrigger>
                  </Form.Label>
                  <Select
                    options={dataTypeOptions}
                    value={
                      fieldData.dataType
                        ? dataTypeOptions.find((opt) => opt.value === fieldData.dataType)
                        : null
                    }
                    onChange={(selected) =>
                      setFieldData({
                        ...fieldData,
                        dataType: selected ? selected.value : "",
                      })
                    }
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select data type"
                    isSearchable
                    menuPortalTarget={document.body}
                  />
                </Form.Group>

                {/* Hyperlink Label */}
                {fieldData.dataType === "URL" && (
                  <Form.Group className="mb-3 compact-input" controlId="hyperlinkLabel">
                    <Form.Label>
                      Hyperlink Label
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip id="tooltip-hyperlinkLabel">
                            Enter a label that will be displayed as a hyperlink.
                          </Tooltip>
                        }
                      >
                        <span style={{ marginLeft: "5px", cursor: "pointer", verticalAlign: "middle" }}>
                          <FaQuestionCircle size={14} color="#6c757d" />
                        </span>
                      </OverlayTrigger>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter hyperlink label"
                      value={fieldData.hyperlinkLabel}
                      onChange={(e) =>
                        setFieldData({ ...fieldData, hyperlinkLabel: e.target.value })
                      }
                    />
                  </Form.Group>
                )}

               {/* Help Text */}
                  <Form.Group className="mb-3 compact-input" controlId="helpText">
                  <Form.Label>Help Text</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={2}
                     size="sm"
                     placeholder="Enter help text"
                     value={fieldData.helpText}
                     onChange={(e) =>
                         setFieldData({ ...fieldData, helpText: e.target.value })
                }
                  />
                  <div className="text-muted small mt-1">
                  Enter some text to help users understand the purpose of this custom field
                  </div>
                  </Form.Group>


                {/* Data Privacy (replaced text box with checkboxes + message) */}
                <Form.Group className="mb-3 compact-input" controlId="dataPrivacy">
                  <Form.Label>
                    Data Privacy{" "}
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip id="privacy-tooltip">
                          Enable PII/ePHI to protect sensitive data.
                        </Tooltip>
                      }
                    >
                      <span style={{ marginLeft: "5px", cursor: "pointer", verticalAlign: "middle" }}>
                        <FaQuestionCircle size={14} color="#6c757d" />
                      </span>
                    </OverlayTrigger>
                  </Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="checkbox"
                      label="PII"
                      checked={fieldData.pii}
                      onChange={(e) =>
                        setFieldData({ ...fieldData, pii: e.target.checked })
                      }
                    />
                    <Form.Check
                      inline
                      type="checkbox"
                      label="ePHI"
                      checked={fieldData.ephi}
                      onChange={(e) =>
                        setFieldData({ ...fieldData, ephi: e.target.checked })
                      }
                    />
                  </div>
                  <div className="text-muted small mt-1">
                    Data will be stored without encryption and will be visible to all users.
                  </div>
                </Form.Group>

                {/* Input Format */}
                <Form.Group className="mb-3 compact-input" controlId="inputFormat">
                  <Form.Label>Input Format</Form.Label>
                  {!useCustomFormat ? (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setUseCustomFormat(true)}
                    >
                      Configure Custom Format
                    </Button>
                  ) : (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => setUseCustomFormat(false)}
                    >
                      Use Standard Format
                    </Button>
                  )}
                  {!useCustomFormat ? (
                    <Select
                      options={inputFormatOptions}
                      value={
                        fieldData.inputFormat
                          ? inputFormatOptions.find(opt => opt.value === fieldData.inputFormat)
                          : null
                      }
                      onChange={(selected) =>
                        setFieldData({
                          ...fieldData,
                          inputFormat: selected ? selected.value : "",
                        })
                      }
                      className="react-select-container mt-2"
                      classNamePrefix="react-select"
                      placeholder="Select input format"
                      isSearchable
                      menuPortalTarget={document.body}
                    />
                  ) : (
                    <Form.Control
                      type="text"
                      size="sm"
                      className="mt-2"
                      placeholder="Enter standard format"
                      value={fieldData.inputFormat}
                      onChange={(e) =>
                        setFieldData({ ...fieldData, inputFormat: e.target.value })
                      }
                    />
                  )}
                </Form.Group>

                {/* Default Value */}
                <Form.Group className="mb-3 compact-input" controlId="defaultValue">
                  <Form.Label>Default Value</Form.Label>
                  <div className="d-flex align-items-center">
                    {fieldData.dataType === "URL" && (
                      <span style={{ marginRight: "5px", fontSize: "18px" }}>🌐</span>
                    )}
                    <Form.Control
                      type="text"
                      size="sm"
                      placeholder="Enter default value"
                      value={fieldData.defaultValue}
                      onChange={(e) =>
                        setFieldData({ ...fieldData, defaultValue: e.target.value })
                      }
                    />
                  </div>
                </Form.Group>

                {/* Is Mandatory */}
                <Form.Group className="mb-3 compact-input">
                  <Form.Label>Is Mandatory</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Yes"
                      name="mandatory"
                      checked={fieldData.mandatory === "Yes"}
                      onChange={() =>
                        setFieldData({ ...fieldData, mandatory: "Yes" })
                      }
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="No"
                      name="mandatory"
                      checked={fieldData.mandatory === "No"}
                      onChange={() =>
                        setFieldData({ ...fieldData, mandatory: "No" })
                      }
                    />
                  </div>
                </Form.Group>

                {/* Show in All PDFs */}
                <Form.Group className="mb-3 compact-input">
                  <Form.Label>Show in All PDFs</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Yes"
                      name="showInPdf"
                      checked={fieldData.showInPdf === "Yes"}
                      onChange={() =>
                        setFieldData({ ...fieldData, showInPdf: "Yes" })
                      }
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="No"
                      name="showInPdf"
                      checked={fieldData.showInPdf === "No"}
                      onChange={() =>
                        setFieldData({ ...fieldData, showInPdf: "No" })
                      }
                    />
                  </div>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={handleSaveCustomField}>
                    Save
                  </Button>
                  <Button variant="secondary" onClick={() => setShowNewFieldForm(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default InventoryAdjustments;
