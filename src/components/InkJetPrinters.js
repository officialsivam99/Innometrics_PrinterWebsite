// src/pages/inkjet-printer.jsx
import React, { useMemo, useState } from "react";
import Header from "./header";
import SupportAndTrust from "./SupportAndTrust";
import LegalFooter from "./LegalFooter";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  FiHome,
  FiChevronRight,
  FiBox,
  FiSearch,
  FiSliders,
  FiArrowRight,
} from "react-icons/fi";
import { TbDroplet, TbScan, TbWifi } from "react-icons/tb";

// ⬇️ Use the InkJetProducts dataset
import { InkJetProducts as inkjetData } from "../components/InkJetProducts";

/* Tiny star row */
function StarRow({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span aria-label={`Rating ${rating} out of 5`} style={{ color: "#f59e0b" }}>
      {[...Array(5)].map((_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && half) return <span key={i}>☆</span>;
        return (
          <span key={i} style={{ opacity: 0.25 }}>
            ★
          </span>
        );
      })}
    </span>
  );
}

export default function InkjetPrinter() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");

  // ⬇️ Use the provided array as-is (already inkjet-only)
  const base = useMemo(() => [...inkjetData], []);

  const sorted = useMemo(() => {
    const data = base.filter((p) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });

    switch (sort) {
      case "name-asc":
        return data.sort((a, b) => a.title.localeCompare(b.title));
      case "price-asc":
        return data.sort((a, b) => a.price - b.price);
      case "price-desc":
        return data.sort((a, b) => b.price - a.price);
      case "rating-desc":
        return data.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:
        return data;
    }
  }, [base, query, sort]);

  return (
    <>
      <Header />
      <div style={{ background: "#f6f8fb" }}>
        <Container style={{ paddingTop: 20, paddingBottom: 36 }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#6b7280",
              marginBottom: 10,
            }}
          >
            <FiHome />
            <Link to="/" style={{ textDecoration: "none" }}>
              Home
            </Link>
            <FiChevronRight />
            <span style={{ color: "#0b1b33", fontWeight: 600 }}>
              Inkjet Printers
            </span>
          </div>

          {/* Hero / Intro */}
          <div
          style={{
            border: "1px solid #dbe7ff",
            background:
              "linear-gradient(135deg, rgba(210,227,255,.45), rgba(210,227,255,.25))",
            borderRadius: 18,
            padding: "28px 28px 24px",
            boxShadow: "0 8px 22px rgba(16,38,76,.06)",
            marginBottom: 22,
          }}
        >
          <h1
            style={{
              fontWeight: 800,
              fontSize: 44,
              color: "#0b1b33",
              marginBottom: 12,
            }}
          >
            Best Inkjet Printers
          </h1>

          <p style={{ color: "#374151", fontSize: 18, maxWidth: 980 }}>
            High-quality color prints for documents and photos. Explore{" "}
            <a href="#allinone" style={{ fontWeight: 700 }}>
              all-in-one inkjets
            </a>
            ,{" "}
            <a href="#wireless" style={{ fontWeight: 700 }}>
              wireless models
            </a>{" "}
            and{" "}
            <a href="#photos" style={{ fontWeight: 700 }}>
              photo-ready options
            </a>{" "}
            ideal for home and small office use.
          </p>

          <Row className="g-3 mt-1">
            <Col md={4}>
              <Card style={{ borderRadius: 14, border: "1px solid #e7ecf3", background: "#fff" }}>
                <Card.Body style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 12,
                      background: "rgba(59,130,246,.12)",
                      color: "#2563eb",
                    }}
                  >
                    <TbDroplet size={20} />
                  </span>
                  <div>
                    <div id="photos" style={{ fontWeight: 800 }}>Vibrant Color</div>
                    <div style={{ color: "#6b7280" }}>Crisp text & rich photos with dye/pigment inks.</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card style={{ borderRadius: 14, border: "1px solid #e7ecf3", background: "#fff" }}>
                <Card.Body style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 12,
                      background: "rgba(16,185,129,.12)",
                      color: "#10b981",
                    }}
                  >
                    <TbScan size={20} />
                  </span>
                  <div>
                    <div id="allinone" style={{ fontWeight: 800 }}>All-in-One</div>
                    <div style={{ color: "#6b7280" }}>Print, scan & copy in one compact device.</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card style={{ borderRadius: 14, border: "1px solid #e7ecf3", background: "#fff" }}>
                <Card.Body style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 12,
                      background: "rgba(168,85,247,.12)",
                      color: "#8b5cf6",
                    }}
                  >
                    <TbWifi size={20} />
                  </span>
                  <div>
                    <div id="wireless" style={{ fontWeight: 800 }}>Wireless Ready</div>
                    <div style={{ color: "#6b7280" }}>Easy setup via Wi-Fi, AirPrint & Mopria.</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Toolbar */}
        <div
          style={{
            border: "1px solid #e7ecf3",
            background: "#fff",
            borderRadius: 14,
            padding: 12,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 34,
                height: 34,
                display: "grid",
                placeItems: "center",
                borderRadius: 10,
                background: "rgba(37,99,235,.10)",
                color: "#2563eb",
              }}
            >
              <FiBox />
            </span>
            <div style={{ fontWeight: 700 }}>{sorted.length} Products</div>
            <div style={{ color: "#6b7280" }}>Inkjet printers for home & office</div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <InputGroup style={{ width: 260 }}>
              <InputGroup.Text>
                <FiSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search inkjet printers…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>

            <InputGroup style={{ width: 190 }}>
              <InputGroup.Text>
                <FiSliders />
              </InputGroup.Text>
              <Form.Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="name-asc">Name A–Z</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating-desc">Top Rated</option>
              </Form.Select>
            </InputGroup>
          </div>
        </div>

        {/* Product Grid */}
        <Row className="g-4">
          {sorted.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={4} xl={3}>
              <Card
                style={{
                  borderRadius: 14,
                  border: "1px solid #e7ecf3",
                  background: "#fff",
                  boxShadow: "0 6px 18px rgba(16,38,76,.06)",
                  height: "100%",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    background: "#f7fafc",
                    padding: 16,
                    display: "grid",
                    placeItems: "center",
                    minHeight: 180,
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "contain",
                    }}
                    loading="lazy"
                  />
                </div>

                <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    {p.category && (
                      <Badge
                        bg="light"
                        text="dark"
                        style={{ border: "1px solid #e7ecf3" }}
                      >
                        {p.category.replace("-", " ")}
                      </Badge>
                    )}
                    <div style={{ fontWeight: 800, fontSize: 18 }}>
                      ${p.price.toFixed(2)}
                    </div>
                  </div>

                  <div style={{ fontWeight: 700, color: "#0b1b33" }}>
                    {p.title}
                  </div>
                  <div style={{ color: "#6b7280", marginTop: 4, minHeight: 44 }}>
                    {p.description}
                  </div>

                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ marginTop: 8 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <StarRow rating={p.rating} />
                      <small style={{ color: "#6b7280" }}>
                        ({p.reviewsCount})
                      </small>
                    </div>
                    <small style={{ color: "#6b7280" }}>🚚 {p.delivery}</small>
                  </div>

                  <div className="mt-3">
                    <Link
                      to={`/product/${p.id}`}
                      className="btn btn-primary w-100"
                    >
                      View Details <FiArrowRight style={{ marginLeft: 6 }} />
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {sorted.length === 0 && (
            <Col xs={12}>
              <div
                style={{
                  background: "#fff",
                  border: "1px dashed #c9d3e0",
                  borderRadius: 12,
                  padding: 24,
                  textAlign: "center",
                }}
              >
                No matching inkjet printers. Try another search or sort.
              </div>
            </Col>
          )}
        </Row>
      </Container>
      <SupportAndTrust />
      <LegalFooter />
    </div>
    </>
  );
}
