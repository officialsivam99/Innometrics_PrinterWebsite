// src/components/ProductGallary.js
import React, { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import CartDrawer from "./CartDrawer";

/* ----------------- Helpers ----------------- */

function normalizeBlogToProducts(blog = []) {
  const cats = ["home-printer", "office-printer", "inkjet-printer"];
  return blog.slice(0, 40).map((item, i) => {
    const price = Number(
      (100 + (i % 15) * 7 + (item.userId % 3) * 12 + 0.99).toFixed(2)
    );
    const rating = (3.8 + (item.id % 12) / 20).toFixed(1);
    const reviewsCount = 100 + (item.id % 50);
    const category = cats[(item.userId - 1) % cats.length];
    const image = `https://picsum.photos/seed/printer-${item.id}/700/460`;
    return {
      id: item.id,
      title: toTitleCase(item.title),
      description: sentenceCase(item.body)?.slice(0, 135) + "…",
      image,
      price,
      rating: Number(rating),
      reviewsCount,
      category,
    };
  });
}

function toTitleCase(str = "") {
  return str
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

function sentenceCase(str = "") {
  const s = str.replace(/\n+/g, " ").trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function StarRow({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span aria-label={`Rating ${rating} out of 5`} style={{ whiteSpace: "nowrap" }}>
      {[...Array(5)].map((_, i) => {
        if (i < full) return <span key={i}>★</span>;
        if (i === full && half) return <span key={i}>☆</span>;
        return (
          <span key={i} style={{ opacity: 0.35 }}>
            ★
          </span>
        );
      })}
    </span>
  );
}

/* ----------------- Main Component ----------------- */

const ProductGallery = ({ products, blog, title, subtitle }) => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);

  // Prefer real `products`; else normalize from your `blog`
  const data = useMemo(() => {
    if (Array.isArray(products) && products.length) return products;
    if (Array.isArray(blog) && blog.length) return normalizeBlogToProducts(blog);
    return [];
  }, [products, blog]);

  const [query, setQuery] = useState("");
  const allCategories = useMemo(() => {
    const set = new Set(data.map((p) => p.category).filter(Boolean));
    return ["All Categories", ...Array.from(set)];
  }, [data]);

  const [selectedCat, setSelectedCat] = useState("All Categories");

  const filtered = useMemo(() => {
    return data.filter((p) => {
      const passQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase());
      const passCat = selectedCat === "All Categories" || p.category === selectedCat;
      return passQuery && passCat;
    });
  }, [data, query, selectedCat]);

  const goToDetail = (id) => navigate(`/product/${id}`);

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

  return (
    <div style={{ background: "#f6f8fb" }}>
      {/* Card layout helpers for consistent heights */}
      <style>{`
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
        }
        .pm-image {
          background: #f7fafc;
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 210px;           /* fixed image area for consistency */
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
          min-height: 28px;        /* lock meta-row height */
        }
        .pm-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #f59e0b;
          min-height: 22px;        /* lock rating-row height */
        }
        .pm-ship {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          min-height: 22px;        /* lock shipping-row height */
        }
        .pm-actions {
          margin-top: auto;        /* push actions to bottom */
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      <Container style={{ paddingTop: 28, paddingBottom: 48 }}>
        <header
          style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}
        >
          <div style={{ flex: "1 1 420px" }}>
            <h2
              className="fw-bold"
              style={{ fontSize: 34, color: "#0b1b33", marginBottom: 6 }}
            >
              {title || "Best Laser Printer & Ink Cartridge Deals"}
            </h2>
            <p style={{ color: "#44516b", marginBottom: 0 }}>
              {subtitle ||
                "Shop the best printer for home and best small office printer models with genuine ink cartridges and complete office supply solutions"}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              flex: "1 1 420px",
              justifyContent: "flex-end",
            }}
          >
            <InputGroup style={{ maxWidth: 360 }}>
              <InputGroup.Text>🔎</InputGroup.Text>
              <Form.Control
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>

            <Form.Select
              style={{ maxWidth: 220 }}
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
            >
              {allCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
          </div>
        </header>

        <Row className="g-4 mt-2">
          {filtered.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={4} xl={3}>
              <Card
                className="pm-card"
                onClick={() => goToDetail(p.id)}
              >
                <div className="pm-image">
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    loading="lazy"
                  />
                </div>

                <Card.Body style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <div className="pm-title">{p.title}</div>

                  <div className="pm-desc">{p.description}</div>

                  <div className="pm-meta">
                    <div style={{ fontWeight: 700, fontSize: 20 }}>
                      ${p.price?.toFixed?.(2) ?? p.price}
                    </div>
                    <Badge bg="light" text="dark" style={{ border: "1px solid #e7ecf3" }}>
                      {p.category}
                    </Badge>
                  </div>

                  <div className="pm-rating">
                    <StarRow rating={p.rating} />
                    <small style={{ color: "#6b7280" }}>({p.reviewsCount})</small>
                  </div>

                  <div className="pm-ship">
                    <span>🚚</span>
                    <small>2–3 business days delivery</small>
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

          {filtered.length === 0 && (
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
                No products found. Try a different search or category.
              </div>
            </Col>
          )}
        </Row>
      </Container>

      <CartDrawer
        show={cartOpen}
        onHide={() => setCartOpen(false)}
        cartItems={cartItems}
        onCheckout={() => alert("Proceeding to checkout...")}
      />
    </div>
  );
};

export default ProductGallery;
