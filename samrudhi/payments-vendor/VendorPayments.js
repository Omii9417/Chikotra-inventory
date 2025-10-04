import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  InputGroup
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VendorPayments.css";

const banks = [
  {
    name: "SBI",
    logo: process.env.PUBLIC_URL + "/logos/sbi.png",
    desc:
      "Set up your SBI Current Account in Zoho Inventory to experience the following benefits:",
    points: [
      "Initiate payments to vendors directly from Zoho Inventory.",
      "Fetch bank feeds to reconcile transactions.",
      "View transaction status and get real-time visibility into your account balance."
    ]
  },
  {
    name: "HSBC",
    logo: process.env.PUBLIC_URL + "/logos/hsbc.png",
    desc:
      "Connect your HSBC account with Zoho Inventory for seamless payments, reconciliation, and more. When you integrate, you will be able to:",
    points: ["Pay your vendors individually."]
  },
  {
    name: "YES Bank",
    logo: process.env.PUBLIC_URL + "/logos/yesbank.png",
    desc:
      "Integrate your YES Bank Current Account with Zoho Inventory for a seamless payment experience powered by API Banking. You can:",
    points: [
      "Pay vendors individually or in bulk, directly from Zoho Inventory.",
      "Make real-time payments through 24×7 IMPS facility."
    ],
    footerLink: "New to YES Bank? Request for a New Account ▸"
  }
];

const VendorPayments = () => {
  // SBI
  const [showSBIModal, setShowSBIModal] = useState(false);
  const [agreeTermsSBI, setAgreeTermsSBI] = useState(false);

  // HSBC
  const [showHSBCModal, setShowHSBCModal] = useState(false);
  const [agreeTermsHSBC, setAgreeTermsHSBC] = useState(false);
  const [hasCredentialsHSBC, setHasCredentialsHSBC] = useState("Yes");

  // YES
  const [showYESModal, setShowYESModal] = useState(false);
  const [agreeTermsYES, setAgreeTermsYES] = useState(false);
  const [hasCredentialsYES, setHasCredentialsYES] = useState("Yes");

  return (
    <Container fluid className="py-4 vendor-payments">
      <h4 className="fw-bold text-dark mb-4">Vendor Payments</h4>

      <Row xs={1} md={2} className="g-4">
        {/* SBI (full width) */}
        <Col xs={12}>
          <Card className="border-0 shadow-hover p-3">
            <Card.Body>
              <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                <img src={banks[0].logo} alt="SBI" height="80" />
                <div>
                  <Card.Text className="text-muted small mb-2">
                    {banks[0].desc}
                  </Card.Text>
                  <ul className="small text-muted ps-3 mb-3">
                    {banks[0].points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  <div className="d-flex align-items-center gap-3">
                    <Button size="sm" className="rounded-pill" onClick={() => setShowSBIModal(true)}>
                      Set Up Now
                    </Button>
                    <a href="#" className="small text-primary text-decoration-none">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* HSBC */}
        <Col>
          <Card className="border-0 shadow-hover p-3">
            <Card.Body>
              <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                <img src={banks[1].logo} alt="HSBC" height="100" />
                <div>
                  <Card.Text className="text-muted small mb-2">
                    {banks[1].desc}
                  </Card.Text>
                  <ul className="small text-muted ps-3 mb-3">
                    {banks[1].points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  <div className="d-flex align-items-center gap-3">
                    <Button size="sm" className="rounded-pill" onClick={() => setShowHSBCModal(true)}>
                      Set Up Now
                    </Button>
                    <a href="#" className="small text-primary text-decoration-none">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* YES Bank */}
        <Col>
          <Card className="border-0 shadow-hover p-3">
            <Card.Body>
              <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                <img src={banks[2].logo} alt="YES Bank" height="100" />
                <div>
                  <Card.Text className="text-muted small mb-2">
                    {banks[2].desc}
                  </Card.Text>
                  <ul className="small text-muted ps-3 mb-3">
                    {banks[2].points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  <div className="d-flex align-items-center gap-3">
                    <Button size="sm" className="rounded-pill" onClick={() => setShowYESModal(true)}>
                      Set Up Now
                    </Button>
                    <a href="#" className="small text-primary text-decoration-none">
                      Learn More
                    </a>
                  </div>
                  <p className="small text-primary mt-3 mb-0">{banks[2].footerLink}</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ====================== SBI MODAL ====================== */}
      <Modal
        show={showSBIModal}
        onHide={() => setShowSBIModal(false)}
        dialogClassName="vendor-modal-top"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            Integrate with <img src={banks[0].logo} alt="SBI" height="50" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="small text-muted">
            This integration can only be <strong>set up by admin users in the SBI portal</strong>.
            If you're an admin, initiate the setup in Zoho Inventory and then configure the
            integration in SBI’s banking portal.
          </p>

          <div className="p-2 border rounded small bg-light mb-3">
            <p className="fw-semibold mb-1">NOTE</p>
            <ul className="mb-0 ps-3">
              <li>This is a user-level integration. Other users cannot initiate payments on your behalf.</li>
              <li>Transaction charges, if applicable, are as per your agreement with the bank. Zoho does not charge additional fees.</li>
            </ul>
          </div>

          <Form.Check
            type="checkbox"
            className="small mb-3"
            checked={agreeTermsSBI}
            onChange={(e) => setAgreeTermsSBI(e.target.checked)}
            label={
              <>
                I have read and agree with the{" "}
                <a href="#" className="text-primary text-decoration-none">Terms and Conditions</a>.
              </>
            }
          />

          <div className="d-flex gap-2">
            <Button size="sm" disabled={!agreeTermsSBI}>Initiate Integration</Button>
            <Button size="sm" variant="secondary" onClick={() => setShowSBIModal(false)}>Cancel</Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* ====================== HSBC MODAL ====================== */}
      <Modal
        show={showHSBCModal}
        onHide={() => setShowHSBCModal(false)}
        size="xl"
        dialogClassName="vendor-modal-top"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Set up HSBC Integration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-0 split-modal">
            {/* Left info */}
            <Col md={5} className="pe-md-4 border-end">
              <div className="d-flex align-items-center mb-3">
                <img src={banks[1].logo} alt="HSBC" height="70" className="me-2" />
                <h6 className="fw-bold mb-0">Transaction Charges</h6>
              </div>
              <p className="small text-muted">
                Transaction charges, if applicable, are as per your agreement with the bank. Zoho does not charge any additional fees.
              </p>
              <h6 className="fw-semibold mt-3">To set up the integration:</h6>
              <ul className="small text-muted ps-3">
                <li>Enter the PC ID, Client ID, and Client Secret that the HSBC has sent you via email.</li>
                <li>Select the HSBC account that you want to connect with Zoho Inventory.</li>
                <li>Click Set Up Now to integrate your HSBC with Zoho Inventory.</li>
              </ul>
              <p className="small text-muted mt-3">
                <strong>NOTE:</strong> This is a user-level integration. Other users cannot initiate payments on your behalf.
              </p>
            </Col>

            {/* Right form */}
            <Col md={7} className="ps-md-4 mt-4 mt-md-0">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-danger">
                    Do you have the credentials to integrate Zoho Inventory with the HSBC?
                  </Form.Label>
                  <div className="d-flex gap-4">
                    <Form.Check
                      inline
                      label="Yes"
                      type="radio"
                      name="hsbcCreds"
                      checked={hasCredentialsHSBC === "Yes"}
                      onChange={() => setHasCredentialsHSBC("Yes")}
                    />
                    <Form.Check
                      inline
                      label="No"
                      type="radio"
                      name="hsbcCreds"
                      checked={hasCredentialsHSBC === "No"}
                      onChange={() => setHasCredentialsHSBC("No")}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>PC ID*</Form.Label>
                  <Form.Control placeholder="Enter PC ID" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Client Secret*</Form.Label>
                  <InputGroup>
                    <Form.Control type="password" placeholder="Enter Client Secret" />
                    <InputGroup.Text>🔒</InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>HSBC Bank Account*</Form.Label>
                  <Form.Select>
                    <option>Select Account</option>
                  </Form.Select>
                </Form.Group>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>Secret PIN*</Form.Label>
                    <InputGroup>
                      <Form.Control type="password" placeholder="Enter PIN" />
                      <InputGroup.Text>👁</InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label>Confirm Secret PIN*</Form.Label>
                    <InputGroup>
                      <Form.Control type="password" placeholder="Confirm PIN" />
                      <InputGroup.Text>👁</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>

                <Form.Check
                  type="checkbox"
                  className="small mb-3"
                  checked={agreeTermsHSBC}
                  onChange={(e) => setAgreeTermsHSBC(e.target.checked)}
                  label={
                    <>
                      I agree to the{" "}
                      <a href="#" className="text-primary text-decoration-none">
                        Terms and Conditions
                      </a>.
                    </>
                  }
                />

                <div className="d-flex gap-2">
                  <Button size="sm" disabled={!agreeTermsHSBC}>Set Up Now</Button>
                  <Button size="sm" variant="secondary" onClick={() => setShowHSBCModal(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* ====================== YES BANK MODAL ====================== */}
      <Modal
        show={showYESModal}
        onHide={() => setShowYESModal(false)}
        size="xl"
        dialogClassName="vendor-modal-top"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Set up YES Bank Integration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-0 split-modal">
            {/* Left info */}
            <Col md={5} className="pe-md-4 border-end">
              <div className="d-flex align-items-center mb-3">
                <img src={banks[2].logo} alt="YES Bank" height="70" className="me-2" />
                <h6 className="fw-bold mb-0">Transaction Charges</h6>
              </div>
              <p className="small text-muted">
                Transaction charges, if applicable, are as per your agreement with the bank. Zoho does not charge any additional fees.
              </p>
              <h6 className="fw-semibold mt-3">To configure the integration:</h6>
              <ul className="small text-muted ps-3">
                <li>If your current account is not registered for API Banking select “No” in the form and submit your details.</li>
                <li>Enter the unique Customer ID of your corporate account on the right.</li>
                <li>Enter the password halves shared by the bank.</li>
                <li>Create a six-digit PIN to authorise all transactions initiated from Zoho Inventory.</li>
                <li>Select the YES Bank account you want to integrate and click Set Up Now.</li>
              </ul>
              <p className="small text-muted mt-3">
                <strong>NOTE:</strong> This is a user-level integration. Other users cannot initiate payments on your behalf.
              </p>
            </Col>

            {/* Right form */}
            <Col md={7} className="ps-md-4 mt-4 mt-md-0">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-danger">
                    Have you registered your current account for API Banking on YES Bank’s portal?
                  </Form.Label>
                  <div className="d-flex gap-4">
                    <Form.Check
                      inline
                      label="Yes"
                      type="radio"
                      name="yesApi"
                      checked={hasCredentialsYES === "Yes"}
                      onChange={() => setHasCredentialsYES("Yes")}
                    />
                    <Form.Check
                      inline
                      label="No"
                      type="radio"
                      name="yesApi"
                      checked={hasCredentialsYES === "No"}
                      onChange={() => setHasCredentialsYES("No")}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Customer ID*</Form.Label>
                  <Form.Control placeholder="Enter Customer ID" />
                </Form.Group>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>First Half of Password*</Form.Label>
                    <InputGroup>
                      <Form.Control type="password" placeholder="Enter First Half" />
                      <InputGroup.Text>👁</InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label>Second Half of Password*</Form.Label>
                    <InputGroup>
                      <Form.Control type="password" placeholder="Enter Second Half" />
                      <InputGroup.Text>👁</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>YES Bank Account*</Form.Label>
                  <Form.Select>
                    <option>Select Account</option>
                  </Form.Select>
                </Form.Group>

                <Row className="mb-3">
                  <Col>
                    <Form.Label>Secret PIN*</Form.Label>
                    <InputGroup>
                      <Form.Control type="password" placeholder="Enter PIN" />
                      <InputGroup.Text>👁</InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Form.Label>Confirm Secret PIN*</Form.Label>
                    <InputGroup>
                      <Form.Control type="password" placeholder="Confirm PIN" />
                      <InputGroup.Text>👁</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Registered Mobile Number*</Form.Label>
                  <Form.Control placeholder="Enter Mobile Number" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Live Balance*</Form.Label>
                  <Form.Control placeholder="Enter Live Balance" />
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  className="small mb-3"
                  checked={agreeTermsYES}
                  onChange={(e) => setAgreeTermsYES(e.target.checked)}
                  label={
                    <>
                      I agree to the{" "}
                      <a href="#" className="text-primary text-decoration-none">
                        Terms and Conditions
                      </a>.
                    </>
                  }
                />

                <div className="d-flex gap-2">
                  <Button size="sm" disabled={!agreeTermsYES}>Set Up Now</Button>
                  <Button size="sm" variant="secondary" onClick={() => setShowYESModal(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default VendorPayments;
