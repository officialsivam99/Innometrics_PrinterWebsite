import React, { useState } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import {
  FiTruck,
  FiRotateCcw,
  FiAward,
  FiHeadphones,
  FiCheck,
  FiFileText,
  FiSettings,
  FiBox,
} from "react-icons/fi";
// Assuming you have a CSS file for styles

/**
 * Props (all optional, sensible defaults provided):
 * - description: string
 * - highlights: string[]
 * - boxItems: string[]
 * - specs: Record<string, string>
 * - compatibility: string[]
 */
export default function ProductInfoSection({
  description = `Transform your home workspace with America's most trusted printer brand,
featuring advanced color inkjet technology paired with an intuitive print app.
Engineered for professional excellence, this printer delivers office-quality results that
elevate your work-from-home productivity. Complete with integrated fax capability.`,
  highlights = [
    "Print, scan, copy, and fax functionality",
    "Wireless and mobile printing support",
    "Automatic duplex printing",
    "Energy-efficient, eco-friendly operation",
    "Cloud print + USB connectivity",
  ],
  boxItems = [
    "All-in-One Printer",
    "Setup ink cartridges (Black & Color)",
    "Power cord",
    "USB cable",
    "Setup guide",
    "Software CD",
    "Quick start guide",
  ],
  specs = {
    "Print Technology": "Thermal Inkjet",
    "Max Print Resolution": "4800 × 1200 dpi",
    "Black Print Speed": "Up to 20 ppm",
    "Color Print Speed": "Up to 16 ppm",
    "Scanner": "Flatbed + ADF, up to 1200 dpi",
    "Connectivity": "Wi-Fi, Wi-Fi Direct, USB",
    "Mobile Print": "AirPrint, Mopria, HP Smart App",
    "Paper Handling": "250-sheet input, 100-sheet output",
    "Duplex": "Automatic (Print)",
    "Dimensions (W×D×H)": "18.3 × 15.9 × 9.5 in",
    "Weight": "17.6 lb",
  },
  compatibility = [
    "Windows 11/10 (64-bit)",
    "macOS 12+",
    "ChromeOS",
    "iOS / iPadOS",
    "Android",
  ],
}) {
  const [tab, setTab] = useState("overview");

  return (
    <div style={{ background: "#fff" }}>
      <Container style={{ paddingTop: 8, paddingBottom: 40 }}>
        {/* Reassurance tiles */}
        <Row className="g-3 mb-3">
          <Col md={3} sm={6}>
            <InfoTile
              icon={<FiTruck />}
              title="Fast Shipping"
              text="Quick delivery available"
            />
          </Col>
          <Col md={3} sm={6}>
            <InfoTile
              icon={<FiRotateCcw />}
              title="30-Day Returns"
              text="Easy returns policy"
            />
          </Col>
          <Col md={3} sm={6}>
            <InfoTile
              icon={<FiAward />}
              title="1-Year Warranty"
              text="Manufacturer warranty"
            />
          </Col>
          <Col md={3} sm={6}>
            <InfoTile
              icon={<FiHeadphones />}
              title="24/7 Support"
              text="Expert help available"
            />
          </Col>
        </Row>

        {/* Segmented tabs */}
        <div
          style={{
            border: "1px solid #e7ecf3",
            background: "linear-gradient(180deg,#fafcff,#f6f9ff)",
            borderRadius: 14,
            padding: 6,
            display: "flex",
            gap: 6,
            marginBottom: 18,
          }}
        >
          <TabPill
            active={tab === "overview"}
            onClick={() => setTab("overview")}
            icon={<FiFileText />}
          >
            Overview
          </TabPill>
          <TabPill
            active={tab === "specs"}
            onClick={() => setTab("specs")}
            icon={<FiSettings />}
          >
            Specifications
          </TabPill>
          <TabPill
            active={tab === "compat"}
            onClick={() => setTab("compat")}
            icon={<FiBox />}
          >
            Compatibility
          </TabPill>
        </div>

        {tab === "overview" && (
          <Row className="g-4">
            {/* Description + Highlights */}
            <Col lg={7}>
              <h3 className="fw-bold" style={{ color: "#0b1b33" }}>
                Product Description
              </h3>
              <p style={{ color: "#3f4a5f", fontSize: 18, lineHeight: 1.8 }}>
                {description}
              </p>

              <div className="d-grid gap-3 mt-3">
                {highlights.map((h, idx) => (
                  <Callout key={idx} text={h} />
                ))}
              </div>
            </Col>

            {/* What's in the Box */}
            <Col lg={5}>
              <Card
                style={{
                  borderRadius: 14,
                  border: "1px solid #e7ecf3",
                  background: "#f7fbff",
                }}
              >
                <Card.Body>
                  <div
                    className="d-flex align-items-center gap-2 mb-2"
                    style={{ color: "#0b1b33" }}
                  >
                    <FiBox />
                    <h5 className="fw-bold m-0">What&apos;s in the Box</h5>
                  </div>

                  <ul style={{ margin: 0, paddingLeft: 20, color: "#3f4a5f" }}>
                    {boxItems.map((item, i) => (
                      <li key={i} style={{ marginBottom: 10 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {tab === "specs" && (
          <Card
            style={{
              borderRadius: 14,
              border: "1px solid #e7ecf3",
              boxShadow: "0 6px 18px rgba(16,38,76,.05)",
            }}
          >
            <Card.Body>
              <h5 className="fw-bold mb-3" style={{ color: "#0b1b33" }}>
                Technical Specifications
              </h5>
              <div className="spec-grid">
                {Object.entries(specs).map(([k, v]) => (
                  <div key={k} className="spec-row">
                    <div className="spec-key">{k}</div>
                    <div className="spec-val">{v}</div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        )}

        {tab === "compat" && (
          <Card
            style={{
              borderRadius: 14,
              border: "1px solid #e7ecf3",
              boxShadow: "0 6px 18px rgba(16,38,76,.05)",
            }}
          >
            <Card.Body>
              <h5 className="fw-bold mb-3" style={{ color: "#0b1b33" }}>
                Compatibility
              </h5>
              <p style={{ color: "#3f4a5f" }}>
                This printer supports the following operating systems and
                platforms:
              </p>
              <div className="d-flex flex-wrap gap-2">
                {compatibility.map((c, i) => (
                  <Badge key={i} bg="light" text="dark" style={badgeStyle}>
                    {c}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>

      {/* Scoped styles for the table and pills */}
      <style>{css}</style>
    </div>
  );
}

/* ---------- sub-components ---------- */

function InfoTile({ icon, title, text }) {
  return (
    <Card
      style={{
        border: "1px solid #e7ecf3",
        borderRadius: 14,
        background: "#fff",
      }}
    >
      <Card.Body className="d-flex align-items-center gap-3">
        <span style={tileIconStyle}>{icon}</span>
        <div>
          <div className="fw-bold" style={{ color: "#0b1b33" }}>
            {title}
          </div>
          <small style={{ color: "#6b7280" }}>{text}</small>
        </div>
      </Card.Body>
    </Card>
  );
}

function TabPill({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      className="tab-pill"
      aria-pressed={active}
      style={{
        flex: 1,
        borderRadius: 12,
        border: `1px solid ${active ? "#cfe0ff" : "transparent"}`,
        background: active ? "#fff" : "transparent",
        color: active ? "#0b1b33" : "#5b6a82",
        boxShadow: active ? "0 6px 16px rgba(37,99,235,.15)" : "none",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      <span style={{ fontSize: 16, display: "grid", placeItems: "center" }}>
        {icon}
      </span>
      {children}
    </button>
  );
}

function Callout({ text }) {
  return (
    <div
      style={{
        background: "#edf9f1",
        border: "1px solid #d6f0df",
        borderRadius: 12,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          display: "grid",
          placeItems: "center",
          borderRadius: 8,
          background: "#d1fae5",
          color: "#10b981",
          border: "1px solid #a7f3d0",
        }}
      >
        <FiCheck />
      </span>
      <span style={{ color: "#0b1b33", fontWeight: 600 }}>{text}</span>
    </div>
  );
}

/* ---------- styles ---------- */

const tileIconStyle = {
  width: 36,
  height: 36,
  display: "grid",
  placeItems: "center",
  borderRadius: 10,
  background: "rgba(37,99,235,.10)",
  color: "#2563eb",
  border: "1px solid rgba(37,99,235,.18)",
  fontSize: 18,
};

const badgeStyle = {
  border: "1px solid #e7ecf3",
  padding: "8px 10px",
  borderRadius: 10,
  fontWeight: 600,
};

const css = `
  .spec-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    border: 1px solid #e7ecf3;
    border-radius: 12px;
    overflow: hidden;
  }
  .spec-row {
    display: contents;
  }
  .spec-key {
    padding: 14px 16px;
    background: #f8fbff;
    border-bottom: 1px solid #e7ecf3;
    font-weight: 700;
    color: #0b1b33;
  }
  .spec-val {
    padding: 14px 16px;
    border-bottom: 1px solid #e7ecf3;
    color: #44516b;
  }
  .spec-grid .spec-row:last-child .spec-key,
  .spec-grid .spec-row:last-child .spec-val {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    .spec-grid { grid-template-columns: 1fr; }
    .spec-key { border-bottom: none; border-top: 1px solid #e7ecf3; }
    .spec-row:first-child .spec-key { border-top: none; }
  }
`;
