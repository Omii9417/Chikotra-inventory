import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Modal, Form, Alert } from "react-bootstrap";
import { FaCog } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CustomerPayments.css";

const gateways = [
  {
    name: "Razorpay",
    logo: process.env.PUBLIC_URL + "/logos/razorpay.png",
    desc: "Razorpay is a payments platform supporting both domestic and international payments, with multiple modes including cards, UPI, and wallets.",
    link: "View Razorpay's Transaction Fees",
  },
  {
    name: "Paytm PG",
    logo: process.env.PUBLIC_URL + "/logos/paytm.png",
    desc: "Paytm Payment Gateway enables you to accept payments easily through UPI, debit & credit cards, and more.",
    link: "View Paytm’s Transaction Fees",
  },
  {
    name: "Stripe",
    logo: process.env.PUBLIC_URL + "/logos/stripe.png",
    desc: "Stripe is an online payment processing platform that allows you to receive one-time payments securely from customers.",
    link: "View Stripe's Transaction Fees",
  },
  {
    name: "PayPal",
    logo: process.env.PUBLIC_URL + "/logos/paypal.png",
    desc: "PayPal lets you seamlessly accept and manage all major payment types, including PayPal, Venmo, and Pay Later.",
    link: "View PayPal Transaction Fees",
  },
  {
    name: "Verifone",
    logo: process.env.PUBLIC_URL + "/logos/verifone.png",
    desc: "Verifone (2Checkout) enables businesses to accept mobile and online payments from buyers worldwide.",
    link: "View Verifone’s Transaction Fees",
  },
  {
    name: "Eazypay",
    logo: process.env.PUBLIC_URL + "/logos/eazypay.png",
    desc: "Eazypay by ICICI enables customers to pay using online and offline methods securely in INR.",
    link: "",
  },
];

const CustomerPayments = () => {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  const handleShowPricing = () => setShowPricingModal(true);
  const handleClosePricing = () => setShowPricingModal(false);

  const handleShowCard = () => setShowCardModal(true);
  const handleCloseCard = () => setShowCardModal(false);

  const fields = ["Street", "City", "State", "ZIP Code", "Country/Region"];

  return (
    <Container fluid className="py-4 customer-payments">
      {/* Title + Settings Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark mb-0">Customer Payments</h4>

        {/* Card Verification Settings */}
        <div
          className="d-flex align-items-center text-primary settings-link"
          style={{ cursor: "pointer" }}
          onClick={handleShowCard}
        >
          <FaCog className="me-2" />
          <span className="fw-semibold small">Card Verification Settings</span>
        </div>
      </div>

      {/* Zoho Payments (Preferred Gateway) */}
      <Card className="mb-5 border-0 shadow-hover">
        <Card.Body>
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3">
            <div>
              {/* Zoho Payments logo */}
              <div className="d-flex align-items-center mb-3">
                <img
                  src={process.env.PUBLIC_URL + "/logos/zoho-payments.png"}
                  alt="Zoho Payments"
                  height="200"
                  className="me-3"
                  style={{ objectFit: "contain", maxWidth: "300px", marginRight: "12px" }}
                />
                <Badge bg="warning" text="dark">
                  Preferred Gateway
                </Badge>
              </div>

              <Card.Title className="fw-semibold">
                Our unified payments solution that’s built for your business apps
              </Card.Title>
              <Card.Text className="text-muted small">
                With Zoho Payments, you can quickly collect one-time payments via UPI, cards,
                and net banking, and automate reconciliation. It integrates with Zoho Inventory
                to provide a secure and efficient payment experience.
              </Card.Text>

              {/* Supported Payment Methods */}
              <Row className="text-muted small align-items-center">
                <Col md={6}>
                  <p className="mb-1 fw-semibold">Supported Payment Methods</p>
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <img src={process.env.PUBLIC_URL + "/logos/upi.png"} alt="UPI" height="22" />
                      <span>UPI</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img src={process.env.PUBLIC_URL + "/logos/card.png"} alt="Card" height="22" />
                      <span>Cards</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={process.env.PUBLIC_URL + "/logos/netbanking.png"}
                        alt="Net Banking"
                        height="22"
                      />
                      <span>Net Banking</span>
                    </div>
                  </div>
                </Col>

                <Col md={6}>
                  <p className="mb-1 fw-semibold">Transaction Fees</p>
                  <a href="#" className="text-primary" onClick={handleShowPricing}>
                    View Platform Fee Details
                  </a>
                </Col>
              </Row>

              <p className="small text-muted mt-2">
                Note: Zoho Payments is built and owned by Zoho Payment Technologies Pvt Ltd.
              </p>
            </div>

            {/* Right Button */}
            <div className="text-end">
              <p className="text-danger small mb-2">Autocharge is not available</p>
              <Button variant="primary" size="sm" className="rounded-pill">
                Set Up Now
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Other Gateways Section */}
      <Row xs={1} md={2} xl={2} className="g-4">
        {gateways.map((gateway, idx) => (
          <Col key={idx}>
            <Card className="border-0 h-100 shadow-hover p-2">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start flex-column flex-md-row">
                  <div className="me-3">
                    <div className="d-flex align-items-center mb-2">
                      {gateway.logo && (
                        <img
                          src={gateway.logo}
                          alt={gateway.name}
                          height="45"
                          className="me-3"
                          style={{ objectFit: "contain" }}
                        />
                      )}
                      <Card.Title className="fw-semibold mb-0">{gateway.name}</Card.Title>
                    </div>
                    <Card.Text className="small text-muted">{gateway.desc}</Card.Text>
                    {gateway.link && (
                      <a href="#" className="small text-primary">{gateway.link}</a>
                    )}
                  </div>
                  <div className="text-end mt-3 mt-md-0">
                    <p className="text-danger small mb-1">Autocharge is not available</p>
                    <Button variant="primary" size="sm" className="rounded-pill">
                      Set Up Now
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pricing Modal */}
      <Modal
        show={showPricingModal}
        onHide={handleClosePricing}
        backdrop="static"
        keyboard={false}
        dialogClassName="pricing-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Pricing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="text-center border-bottom pb-2">
            <Col>
              <h6 className="fw-bold">PLATFORM FEE</h6>
            </Col>
            <Col>
              <h6 className="fw-bold">PAYMENT METHOD</h6>
            </Col>
          </Row>

          <Row className="py-3 align-items-center border-bottom">
            <Col className="text-center">
              <h5 className="text-success fw-bold mb-0">0%</h5>
              <p className="small text-muted mb-0">per transaction</p>
            </Col>
            <Col>
              <div className="d-flex align-items-center gap-2 mb-2">
                <img src={process.env.PUBLIC_URL + "/logos/upi.png"} alt="UPI" height="18" />
                <span>UPI</span>
              </div>
            </Col>
          </Row>

          <Row className="py-3 align-items-center border-bottom">
            <Col className="text-center">
              <h5 className="text-primary fw-bold mb-0">2%</h5>
              <p className="small text-muted mb-0">per transaction</p>
            </Col>
            <Col>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-2">
                  <img src={process.env.PUBLIC_URL + "/logos/card.png"} alt="Card" height="18" />
                  <span>Cards (2.75% for Corporate Credit Cards)</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={process.env.PUBLIC_URL + "/logos/netbanking.png"}
                    alt="NetBanking"
                    height="18"
                  />
                  <span>Net Banking</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <img src={process.env.PUBLIC_URL + "/logos/upi.png"} alt="UPI" height="18" />
                  <span>UPI via RuPay Credit Cards</span>
                </div>
              </div>
            </Col>
          </Row>

          <p className="small text-muted mt-3">
            <strong>Note:</strong> As per GST regulations, an <strong>18% GST</strong> is applicable on
            the platform fee.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClosePricing}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Card Verification Settings Modal */}
      <Modal show={showCardModal} onHide={handleCloseCard} backdrop="static" dialogClassName="pricing-modal">
        <Modal.Header closeButton>
          <Modal.Title>Card Verification Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="small text-muted">
            Enable specific card address fields that should be mandatory while accepting card information.
            Please ensure these settings are in sync with your payment gateway settings.
          </p>

          <table className="table table-bordered small align-middle">
            <thead className="table-light text-center">
              <tr>
                <th>Field</th>
                <th>Show</th>
                <th>Is Mandatory</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, idx) => (
                <tr key={idx}>
                  <td>{field}</td>
                  <td className="text-center">
                    <Form.Check type="checkbox" defaultChecked />
                  </td>
                  <td className="text-center">
                    <Form.Check type="checkbox" defaultChecked />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Alert variant="warning" className="small mt-3">
            ⚠️ Changes made here will be applied to all pages where card information is collected such as
            the default hosted payment pages, invoice payment page, and request payment method link sent
            to customers.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" size="sm" onClick={handleCloseCard}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CustomerPayments;
