// src/pages/office-printer.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import {
  FiHome,
  FiChevronRight,
  FiBox,
  FiSearch,
  FiSliders,
  FiEye,
} from "react-icons/fi";
import { TbBriefcase, TbPrinter, TbNetwork } from "react-icons/tb";
import { OfficeProducts as allOfficeProducts } from "../components/OfficeProducts";
import Header from "./header";
import SupportAndTrust from "./SupportAndTrust";
import LegalFooter from "./LegalFooter";
import CartDrawer from "./CartDrawer";

/* Tiny star row */
function StarRow({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span aria-label={`Rating ${rating} out of 5`} style={{ color: "#f59e0b", whiteSpace: "nowrap" }}>
      {[...Array(5)].map((_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && half) return <span key={i}>☆</span>;
        return <span key={i} style={{ opacity: 0.25 }}>★</span>;
      })}
    </span>
  );
}

export default function OfficePrinters() {
  const navigate = useNavigate();

  // 🔒 Scoped CSS matching ProductGallery
  const styles = `
    .pm-card {
      border-radius: 14px;
      border: 1px solid #e7ecf3;
      box-shadow: 0 6px 18px rgba(16,38,76,.06);
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
      border-bottom: 1px solid #e7ecf3;
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
      color: #0b1b33;
      line-height: 1.25;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: calc(1.25em * 2);
      margin-bottom: 6px;
    }
    .pm-desc {
      color: #6b7280;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: calc(1.1em * 3 + 8px);
      margin-bottom: 8px;
    }
    .pm-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
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
      color: #6b7280;
      min-height: 22px;
    }
    .pm-actions {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `;

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);

  // ✅ Only printers (exclude supplies ink/toner/paper)
  const base = useMemo(
    () =>
      allOfficeProducts.filter((p) => {
        const type = (p.type || "").toLowerCase();
        const isSupply = ["ink", "toner", "paper"].includes(type);
        return !isSupply && !!p.category; // keep items that are actual products with category
      }),
    []
  );

  const sorted = useMemo(() => {
    const data = [...base].filter((p) => {
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
        return data.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "price-desc":
        return data.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "rating-desc":
        return data.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default:
        return data;
    }
  }, [base, query, sort]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setLastAdded(product);
    setCartOpen(true);
  };

  const goToDetail = (id) => navigate(`/product/${id}`);

  return (
    <>
      <Header />
      <style>{styles}</style>
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
              Office Printers
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
              Best Office Printers
            </h1>
            <p style={{ color: "#374151", fontSize: 18, maxWidth: 980 }}>
              Shop high-performance printers built for office productivity. Browse{" "}
              <a href="#laser" style={{ fontWeight: 700 }}>
                laser printers
              </a>
              ,{" "}
              <a href="#multifunction" style={{ fontWeight: 700 }}>
                multifunction inkjets
              </a>
              , and{" "}
              <a href="#network" style={{ fontWeight: 700 }}>
                network-ready solutions
              </a>{" "}
              designed for teams and businesses.
            </p>
            <Row className="g-3 mt-1">
              <Col md={4}>
                <Card style={{ borderRadius: 14, border: "1px solid #e7ecf3", background: "#fff" }}>
                  <Card.Body
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
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
                      <TbPrinter size={20} />
                    </span>
                    <div>
                      <div id="laser" style={{ fontWeight: 800 }}>
                        Laser Precision
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        Crisp text & high-speed printing.
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card style={{ borderRadius: 14, border: "1px solid #e7ecf3", background: "#fff" }}>
                  <Card.Body
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
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
                      <TbBriefcase size={20} />
                    </span>
                    <div>
                      <div id="multifunction" style={{ fontWeight: 800 }}>
                        All-in-One Solutions
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        Print, copy, scan & fax with ease.
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card style={{ borderRadius: 14, border: "1px solid #e7ecf3", background: "#fff" }}>
                  <Card.Body
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                    }}
                  >
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
                      <TbNetwork size={20} />
                    </span>
                    <div>
                      <div id="network" style={{ fontWeight: 800 }}>
                        Network Ready
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        Connect teams via Ethernet & Wi-Fi.
                      </div>
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
              <div style={{ color: "#6b7280" }}>
                Office & business printing solutions
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <InputGroup style={{ width: 260 }}>
                <InputGroup.Text>
                  <FiSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search printers…"
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

          {/* Product Grid (EXACTLY like ProductGallery) */}
          <Row className="g-4">
            {sorted.map((p) => (
              <Col key={p.id} xs={12} sm={6} lg={4} xl={3}>
                <Card className="pm-card" onClick={() => goToDetail(p.id)}>
                  {/* Image top */}
                  <div className="pm-image">
                    <img src={p.image} alt={p.title} loading="lazy" />
                  </div>

                  {/* Body */}
                  <Card.Body style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <div className="pm-title">{p.title}</div>
                    <div className="pm-desc">{p.description}</div>

                    <div className="pm-meta">
                      <div style={{ fontWeight: 700, fontSize: 20 }}>
                        {typeof p.price === "number" ? `$${p.price.toFixed(2)}` : p.price}
                      </div>
                      {p.category && (
                        <Badge bg="light" text="dark" style={{ border: "1px solid #e7ecf3" }}>
                          {p.category.replace("-", " ")}
                        </Badge>
                      )}
                    </div>

                    <div className="pm-rating">
                      <StarRow rating={p.rating} />
                      <small style={{ color: "#6b7280" }}>({p.reviewsCount ?? 0})</small>
                    </div>

                    <div className="pm-ship">
                      <span>🚚</span>
                      <small>{p.delivery || "2–3 business days delivery"}</small>
                    </div>

                    <div className="pm-actions">
                      <Button
                        className="flex-grow-1"
                        variant="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(p);
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="light"
                        style={{ border: "1px solid #e7ecf3" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToDetail(p.id);
                        }}
                        aria-label="View product"
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
                  No matching office printers. Try another search or sort.
                </div>
              </Col>
            )}
          </Row>
        </Container>

        <SupportAndTrust />
        <LegalFooter />
        <CartDrawer
          show={cartOpen}
          onHide={() => setCartOpen(false)}
          cartItems={cartItems}
          onCheckout={() => alert("Proceeding to checkout...")}
        />
      </div>
    </>
  );
}
