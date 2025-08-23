// src/components/InkTonerPaper.jsx
import React, { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  TbDroplet,
  TbPackage,
  TbTruck,
  TbCrown,
  TbShieldCheck,
  TbFilter,
  TbSearch,
} from "react-icons/tb";

import { products } from "./products"; // central products data
import Header from './header';
import SupportAndTrust from './SupportAndTrust';
import LegalFooter from './LegalFooter';

const BLUE = "#245af0";
const TEXT = "#0b1b33";
const MUTED = "#6b7280";
const LINE = "#e7ecf3";

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

const brandOptions = ["All Brands", "HP", "Canon", "Brother", "Universal"];
const typeOptions = ["All Types", "ink", "toner", "paper"];
const sortOptions = ["Name A–Z", "Price Low–High", "Price High–Low", "Rating"];

export default function InkTonerPaper({ onAddToCart = () => {} }) {
  // 🔹 Filter only Ink/Toner/Paper products from global products
  const supplyProducts = useMemo(
    () =>
      products.filter((p) =>
        ["ink", "toner", "paper"].includes((p.type || "").toLowerCase())
      ),
    []
  );

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("All Brands");
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("Name A–Z");

  const filtered = useMemo(() => {
    let list = [...supplyProducts];

    // search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.compatibleModels?.some((m) => m.toLowerCase().includes(q))
      );
    }

    // brand filter
    if (brand !== "All Brands") {
      list = list.filter((p) => (p.brand || "").toLowerCase() === brand.toLowerCase());
    }

    // type filter
    if (type !== "All Types") {
      list = list.filter((p) => (p.type || "").toLowerCase() === type.toLowerCase());
    }

    // sort
    switch (sort) {
      case "Price Low–High":
        list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "Price High–Low":
        list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      case "Rating":
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        list.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    return list;
  }, [supplyProducts, query, brand, type, sort]);

  return (
    <>
      <Header />
      <div style={{ background: "#f6f8fb" }}>
        {/* ---------- HERO HEADER ---------- */}
        <Container style={{ paddingTop: 28 }}>
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: 18,
              background:
                "linear-gradient(180deg, rgba(36,90,240,.06), rgba(36,90,240,.03))",
            }}
          >
            <Card.Body style={{ padding: "28px 22px" }}>
              <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
                <div style={{ maxWidth: 840 }}>
                  <div style={{ color: MUTED, marginBottom: 6 }}>
                    Home <span style={{ color: "#9ca3af" }}>›</span>{" "}
                    <span style={{ color: BLUE, fontWeight: 600 }}>
                      Ink, Toner & Paper
                    </span>
                  </div>
                  <h1
                    className="fw-bold"
                    style={{ fontSize: 38, color: TEXT, marginBottom: 10 }}
                  >
                    Ink, Toner & Paper
                  </h1>
                  <p style={{ color: "#475569", marginBottom: 0, maxWidth: 820 }}>
                    Keep your printer performing at its best with genuine ink,
                    toner, and premium paper. Choose high-yield cartridges, reliable toner,
                    and bright paper — all with fast shipping and trusted quality.
                  </p>
                </div>

                <div className="d-grid gap-3" style={{ minWidth: 260 }}>
                  <FeatureChip
                    icon={<TbShieldCheck />}
                    title="Genuine Quality"
                    text="Original cartridges to protect your warranty"
                  />
                  <FeatureChip
                    icon={<TbPackage />}
                    title="XL Yield Options"
                    text="Reduce replacement frequency and cost per page"
                  />
                  <FeatureChip
                    icon={<TbTruck />}
                    title="Fast Delivery"
                    text="2-day shipping available in most areas"
                  />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>

        {/* ---------- TOOLBAR / FILTERS ---------- */}
        <Container style={{ paddingTop: 18, paddingBottom: 6 }}>
          <Card className="border-0" style={{ borderRadius: 16 }}>
            <Card.Body className="py-3">
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <Badge
                  bg="light"
                  text="dark"
                  className="d-inline-flex align-items-center"
                  style={{ border: `1px solid ${LINE}`, padding: "10px 14px" }}
                >
                  <TbFilter style={{ marginRight: 8 }} />
                  {filtered.length} Products
                </Badge>

                <InputGroup style={{ maxWidth: 360 }}>
                  <InputGroup.Text>
                    <TbSearch />
                  </InputGroup.Text>
                  <Form.Control
                    value={query}
                    placeholder="Search by model, color, cartridge #..."
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </InputGroup>

                <Form.Select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  style={{ maxWidth: 200 }}
                >
                  {brandOptions.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </Form.Select>

                <Form.Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{ maxWidth: 180 }}
                >
                  {typeOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Form.Select>

                <div className="ms-auto" />

                <Form.Select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  style={{ maxWidth: 200 }}
                >
                  {sortOptions.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Form.Select>
              </div>
            </Card.Body>
          </Card>
        </Container>

        {/* ---------- PRODUCT GRID ---------- */}
        <Container style={{ paddingBottom: 42, paddingTop: 6 }}>
          <Row className="g-4">
            {filtered.map((p) => (
              <Col key={p.id} xs={12} sm={6} lg={4} xl={3}>
                <Card
                  className="h-100 border-0 shadow-sm d-flex flex-column"
                  style={{ borderRadius: 14, overflow: "hidden", minHeight: 420, display: "flex" }}
                >
                  <div
                    style={{
                      background: "#f7fafc",
                      minHeight: 180,
                      display: "grid",
                      placeItems: "center",
                      padding: 14,
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{ width: "100%", height: "auto", objectFit: "contain" }}
                      loading="lazy"
                    />
                  </div>

                  <Card.Body className="d-flex flex-column" style={{ flex: 1, minHeight: 200 }}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <Badge
                        bg="light"
                        text="dark"
                        style={{ border: `1px solid ${LINE}` }}
                      >
                        {p.type ? p.type.toUpperCase() : "SUPPLY"}
                      </Badge>
                      {p.pageYield && (
                        <Badge bg="success" title="Approximate page yield">
                          {p.pageYield}
                        </Badge>
                      )}
                    </div>

                    <Card.Title style={{ fontSize: 16, color: TEXT }}>
                      {p.title}
                    </Card.Title>
                    <Card.Text style={{ color: "#56617a", fontSize: 14 }}>
                      {p.description}
                    </Card.Text>

                    {p.compatibleModels?.length ? (
                      <small style={{ color: MUTED }}>
                        Compatible: {p.compatibleModels.slice(0, 2).join(", ")}
                        {p.compatibleModels.length > 2 ? " +" : ""}
                      </small>
                    ) : null}

                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <div style={{ fontWeight: 800, fontSize: 18 }}>
                        ${Number(p.price).toFixed(2)}
                      </div>
                      <div style={{ color: MUTED, fontSize: 12 }}>
                        {p.delivery || "Fast shipping"}
                      </div>
                    </div>

                    {p.rating ? (
                      <div className="mt-1" style={{ color: "#f59e0b" }}>
                        <StarRow rating={p.rating} />{" "}
                        <small style={{ color: MUTED }}>
                          ({p.reviewsCount ?? "—"})
                        </small>
                      </div>
                    ) : (
                      <div style={{ height: 20 }} />
                    )}

                    <div className="d-flex gap-2 mt-auto">
                      <Button
                        variant="primary"
                        className="flex-grow-1"
                        onClick={() => onAddToCart(p)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="light"
                        style={{ border: `1px solid ${LINE}` }}
                        title="Details"
                      >
                        ⓘ
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}

            {filtered.length === 0 && (
              <Col xs={12}>
                <Card
                  className="border-0"
                  style={{
                    borderRadius: 12,
                    padding: 22,
                    textAlign: "center",
                    background: "#fff",
                    border: `1px dashed ${LINE}`,
                  }}
                >
                  No supplies found. Try a different search, brand, or type.
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </div>

      <SupportAndTrust />
      <LegalFooter />
    </>
  );
}

/* ------------ Small Feature Chip used in the header ------------- */
function FeatureChip({ icon, title, text }) {
  return (
    <div
      className="d-flex align-items-center gap-3"
      style={{
        padding: "10px 12px",
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${LINE}`,
        minWidth: 250,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          display: "grid",
          placeItems: "center",
          borderRadius: 10,
          background: "rgba(36,90,240,.10)",
          color: BLUE,
          border: `1px solid rgba(36,90,240,.2)`,
          fontSize: 18,
        }}
      >
        {icon || <TbDroplet />}
      </div>
      <div>
        <div style={{ fontWeight: 700, color: TEXT }}>{title}</div>
        <div style={{ color: MUTED, fontSize: 13 }}>{text}</div>
      </div>
    </div>
  );
}
