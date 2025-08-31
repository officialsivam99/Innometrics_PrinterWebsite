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
  TbShieldCheck,
  TbFilter,
  TbSearch,
} from "react-icons/tb";
import { FiEye } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";

import { products } from "./products"; // central products data
import Header from "./header";
import SupportAndTrust from "./SupportAndTrust";
import LegalFooter from "./LegalFooter";

const BLUE = "#245af0";
const TEXT = "#0b1b33";
const MUTED = "#6b7280";
const LINE = "#e7ecf3";

function StarRow({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span
      aria-label={`Rating ${rating} out of 5`}
      style={{ color: "#f59e0b", whiteSpace: "nowrap" }}
    >
      {[...Array(5)].map((_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && half) return <span key={i}>☆</span>;
        return <span key={i} style={{ opacity: 0.25 }}>★</span>;
      })}
    </span>
  );
}

const brandOptions = ["All Brands", "HP", "Canon", "Brother", "Universal"];
const typeOptions = ["All Types", "ink", "toner", "paper"];
const sortOptions = ["Name A–Z", "Price Low–High", "Price High–Low", "Rating"];

export default function InkTonerPaper({ onAddToCart = () => {} }) {
  const navigate = useNavigate();

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
      list = list.filter(
        (p) => (p.brand || "").toLowerCase() === brand.toLowerCase()
      );
    }

    // type filter
    if (type !== "All Types") {
      list = list.filter(
        (p) => (p.type || "").toLowerCase() === type.toLowerCase()
      );
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

  const goToDetail = (id) => navigate(`/product/${id}`);

  return (
    <>
      <Header />
      {/* Scoped styles: same as ProductGallery (no-crop images + aligned rows) */}
      <style>{`
        .pm-card {
          border-radius: 14px;
          border: 1px solid ${LINE};
          box-shadow: 0 6px 18px rgba(16, 38, 76, 0.06);
          overflow: hidden;
          background: #fff;
          min-height: 420px;
          height: 100%;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: box-shadow .2s ease, transform .2s ease;
        }
        .pm-card:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(16,38,76,.12); }

        .pm-image{
          --card-img-ar: 3/2;
          background:#f7fafc;
          display:grid; place-items:center;
          aspect-ratio: var(--card-img-ar);
          padding: 16px;
          position:relative; z-index:0;
          overflow:hidden;
        }
        .pm-image img{
          position: static !important;
          width:100%; height:100%;
          object-fit: contain; object-position:center;
          display:block;
        }
        @media (max-width:575.98px){ .pm-image{ aspect-ratio: 4/3; } }

        .pm-title {
          font-size: 18px;
          color: ${TEXT};
          line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: calc(1.25em * 2);
          margin-bottom: 6px;
        }
        .pm-desc {
          color: #56617a;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: calc(1.1em * 3 + 8px);
          margin-bottom: 8px;
        }
        .pm-compat {
          color: ${MUTED};
          font-size: 12.5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 18px; /* lock height so rows align */
        }
        .pm-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
          margin-bottom: 6px;
          min-height: 28px;
        }
        .pm-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f59e0b;
          min-height: 22px;
        }
        .pm-ship {
          display: flex;
          align-items: center;
          gap: 6px;
          color: ${MUTED};
          min-height: 22px;
        }
        .pm-actions {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

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
                  className="pm-card"
                  onClick={() => goToDetail(p.id)}
                >
                  {/* Image top (no-crop) */}
                  <div className="pm-image">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>

                  {/* Body */}
                  <Card.Body className="d-flex flex-column" style={{ flex: 1 }}>
                    {/* Title & short desc (clamped) */}
                    <div className="pm-title">{p.title}</div>
                    <div className="pm-desc">{p.description}</div>

                    {/* Compatibility (single-line, ellipsis) */}
                    {p.compatibleModels?.length ? (
                      <div className="pm-compat">
                        Compatible: {p.compatibleModels.slice(0, 2).join(", ")}
                        {p.compatibleModels.length > 2 ? " +" : ""}
                      </div>
                    ) : (
                      <div className="pm-compat" />
                    )}

                    {/* Meta: price + type/brand/yield */}
                    <div className="pm-meta">
                      <div style={{ fontWeight: 700, fontSize: 20 }}>
                        ${Number(p.price).toFixed(2)}
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Badge
                          bg="light"
                          text="dark"
                          style={{ border: `1px solid ${LINE}` }}
                        >
                          {(p.type || "supply").toUpperCase()}
                        </Badge>
                        {p.pageYield && (
                          <Badge bg="success" title="Approximate page yield">
                            {p.pageYield}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Rating + Delivery */}
                    <div className="pm-rating">
                      {p.rating ? (
                        <StarRow rating={p.rating} />
                      ) : (
                        <span style={{ height: 16 }} />
                      )}
                      <small style={{ color: MUTED }}>
                        ({p.reviewsCount ?? "—"})
                      </small>
                    </div>
                    <div className="pm-ship">
                      <span>🚚</span>
                      <small>{p.delivery || "Fast shipping"}</small>
                    </div>

                    {/* Actions: EXACTLY like ProductGallery */}
                    <div className="pm-actions">
                      <Button
                        variant="primary"
                        className="flex-grow-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(p);
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="light"
                        style={{ border: `1px solid ${LINE}` }}
                        aria-label="View details"
                        onClick={(e) => e.stopPropagation()}
                        as={Link}
                        to={`/product/${p.id}`}
                      >
                        <FiEye />
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
