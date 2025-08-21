// src/components/HomePrinterGuide.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaWifi, FaCubes, FaLayerGroup } from "react-icons/fa";

const HomePrinterGuide = () => {
  const BLUE = "#245af0";
  const TEXT = "#111827";
  const MUTED = "#6b7280";

  return (
    <Container className="my-5">
      {/* --- How to Choose Section --- */}
      <Row className="mb-5">
        <Col>
          <Card
            className="p-4 shadow-sm border-0"
            style={{ borderRadius: "16px" }}
          >
            <h3 style={{ color: TEXT, fontWeight: 700, marginBottom: "20px" }}>
              How to Choose the Best Home Printer
            </h3>
            <Row>
              <Col md={6}>
                <h6 style={{ fontWeight: 600, marginBottom: "12px" }}>
                  Consider Your Printing Needs
                </h6>
                <ul className="list-unstyled" style={{ lineHeight: "1.8" }}>
                  <li>
                    <span style={{ color: BLUE, fontWeight: 600 }}>• Volume:</span>{" "}
                    How many pages do you print monthly?
                  </li>
                  <li>
                    <span style={{ color: BLUE, fontWeight: 600 }}>• Type:</span>{" "}
                    Documents, photos, or both?
                  </li>
                  <li>
                    <span style={{ color: BLUE, fontWeight: 600 }}>• Features:</span>{" "}
                    Need scanning and copying capabilities?
                  </li>
                </ul>
              </Col>

              <Col md={6}>
                <h6 style={{ fontWeight: 600, marginBottom: "12px" }}>
                  Printer Technology
                </h6>
                <ul className="list-unstyled" style={{ lineHeight: "1.8" }}>
                  <li>
                    <span style={{ color: "green", fontWeight: 600 }}>● Inkjet:</span>{" "}
                    Great for photos and color documents
                  </li>
                  <li>
                    <span style={{ color: "green", fontWeight: 600 }}>● Laser:</span>{" "}
                    Fast, efficient for text documents
                  </li>
                  <li>
                    <span style={{ color: "green", fontWeight: 600 }}>
                      ● All-in-One:
                    </span>{" "}
                    Print, scan, copy in one device
                  </li>
                </ul>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* --- Popular Features Section --- */}
      <Row>
        <Col>
          <Card
            className="p-4 shadow-sm border-0"
            style={{ borderRadius: "16px", background: "#f8fbff" }}
          >
            <h3 style={{ color: TEXT, fontWeight: 700, marginBottom: "30px" }}>
              Popular Home Printer Features
            </h3>

            <Row className="g-4">
              <Col md={4}>
                <Card
                  className="h-100 border-0 shadow-sm p-3 text-center"
                  style={{ borderRadius: "14px" }}
                >
                  <FaWifi size={32} color={BLUE} style={{ marginBottom: "12px" }} />
                  <h6 style={{ fontWeight: 600 }}>Wireless Connectivity</h6>
                  <p style={{ fontSize: "14px", color: MUTED }}>
                    Print from anywhere at home using WiFi, mobile apps, or cloud
                    services.
                  </p>
                </Card>
              </Col>

              <Col md={4}>
                <Card
                  className="h-100 border-0 shadow-sm p-3 text-center"
                  style={{ borderRadius: "14px" }}
                >
                  <FaCubes
                    size={32}
                    color="green"
                    style={{ marginBottom: "12px" }}
                  />
                  <h6 style={{ fontWeight: 600 }}>Compact Design</h6>
                  <p style={{ fontSize: "14px", color: MUTED }}>
                    Space-saving printers that fit perfectly in home offices and
                    small spaces.
                  </p>
                </Card>
              </Col>

              <Col md={4}>
                <Card
                  className="h-100 border-0 shadow-sm p-3 text-center"
                  style={{ borderRadius: "14px" }}
                >
                  <FaLayerGroup
                    size={32}
                    color="purple"
                    style={{ marginBottom: "12px" }}
                  />
                  <h6 style={{ fontWeight: 600 }}>Multi-Function</h6>
                  <p style={{ fontSize: "14px", color: MUTED }}>
                    Print, scan, copy, and sometimes fax—all in one convenient
                    device.
                  </p>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePrinterGuide;
