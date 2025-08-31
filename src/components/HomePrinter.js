// src/pages/home-printer.jsx
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomePrinterGuide from "./HomePrinterGuide";
import Header from "./header";
import SupportAndTrust from "./SupportAndTrust";
import LegalFooter from "./LegalFooter";
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
import { TbWifi, TbAdjustmentsBolt, TbRocket } from "react-icons/tb";
// 🔁 Your dataset
import { products as allProducts } from "./products";
// 🛒 Cart drawer (adjust path if your CartDrawer lives elsewhere)
import CartDrawer from "../components/CartDrawer";

/* tiny star row (same visual language) */
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

export default function HomePrinter() {
  const navigate = useNavigate();

  // 🔒 Scoped CSS: mirror ProductGallery card look/feel
  const styles = `
    .pm-card {
      border-radius: 14px;
      border: 1px solid #e7ecf3;
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

    .pm-image {
      background: #f7fafc;
      padding: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 210px; /* fixed image area for consistency */
    }
    .pm-image img {
      width: 100%;
      height: 100%;
      object-fit: contain; /* show full image, no crop */
      display: block;
    }

    .pm-title {
      font-size: 18px;
      color: #0b1b33;
      line-height: 1.25;
      display: -webkit-box;
      -webkit-line-clamp: 2;   /* clamp to 2 lines */
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: calc(1.25em * 2); /* consistent title block height */
      margin-bottom: 6px;
    }
    .pm-desc {
      color: #56617a;
      display: -webkit-box;
      -webkit-line-clamp: 3;   /* clamp to 3 lines */
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: calc(1.1em * 3 + 8px); /* consistent description block height */
      margin-bottom: 8px;
    }
    .pm-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      min-height: 28px; /* lock meta-row height */
    }
    .pm-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #f59e0b;
      min-height: 22px; /* lock rating-row height */
    }
    .pm-ship {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #6b7280;
      min-height: 22px; /* lock shipping-row height */
    }
    .pm-actions {
      margin-top: auto; /* push actions to bottom */
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `;

  // Treat these categories as “home printer” relevant
  const HOME_CATS = new Set(["home-printer", "inkjet-printer"]);

  // Pull relevant items
  const base = useMemo(
    () => allProducts.filter((p) => HOME_CATS.has(p.category)),
    []
  );

  // 🔎 UI state
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");

  // 🛒 cart state (same UX as ProductGallery)
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);

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

  // 🔃 Sorting logic
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
              Home Printer
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
              Best Home Printers
            </h1>

            <p style={{ color: "#374151", fontSize: 18, maxWidth: 980 }}>
              Discover the perfect household printer for your home office needs.
              Browse our collection of{" "}
              <a href="#wireless" style={{ fontWeight: 700 }}>
                wireless all-in-one printers
              </a>
              ,{" "}
              <a href="#compact" style={{ fontWeight: 700 }}>
                compact inkjet models
              </a>
              , and{" "}
              <a href="#reliable" style={{ fontWeight: 700 }}>
                reliable home office solutions
              </a>{" "}
              with fast shipping and expert support.
            </p>

            {/* Feature highlights */}
            <Row className="g-3 mt-1">
              <Col md={4}>
                <Card
                  style={{
                    borderRadius: 14,
                    border: "1px solid #e7ecf3",
                    background: "#fff",
                  }}
                >
                  <Card.Body
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
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
                      <TbWifi size={20} />
                    </span>
                    <div>
                      <div id="wireless" style={{ fontWeight: 800 }}>
                        Wireless & Compact
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        Space-saving designs perfect for home offices.
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card
                  style={{
                    borderRadius: 14,
                    border: "1px solid #e7ecf3",
                    background: "#fff",
                  }}
                >
                  <Card.Body
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
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
                      <TbAdjustmentsBolt size={20} />
                    </span>
                    <div>
                      <div style={{ fontWeight: 800 }}>All-in-One</div>
                      <div style={{ color: "#6b7280" }}>
                        Print, scan & copy in one convenient device.
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card
                  style={{
                    borderRadius: 14,
                    border: "1px solid #e7ecf3",
                    background: "#fff",
                  }}
                >
                  <Card.Body
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
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
                      <TbRocket size={20} />
                    </span>
                    <div>
                      <div id="reliable" style={{ fontWeight: 800 }}>
                        Easy Setup
                      </div>
                      <div style={{ color: "#6b7280" }}>
                        Quick wireless setup for household use.
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
                Home & household printing solutions
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
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

          {/* Product grid — EXACT same card stack as ProductGallery */}
          <Row className="g-4">
            {sorted.map((p) => (
              <Col key={p.id} xs={12} sm={6} lg={4} xl={3}>
                <Card
                  className="pm-card"
                  onClick={() => goToDetail(p.id)}
                >
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
                      <Badge bg="light" text="dark" style={{ border: "1px solid #e7ecf3" }}>
                        {p.category?.replace("-", " ") || "home printer"}
                      </Badge>
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
                  No matching printers. Try another search or sort.
                </div>
              </Col>
            )}
          </Row>
        </Container>

        <HomePrinterGuide />
        <SupportAndTrust />
        <LegalFooter />
      </div>

      {/* 🛒 Same Cart Drawer experience as ProductGallery */}
      <CartDrawer
        show={cartOpen}
        onHide={() => setCartOpen(false)}
        cartItems={cartItems}
        onCheckout={() => alert("Proceeding to checkout...")}
      />
    </>
  );
}
