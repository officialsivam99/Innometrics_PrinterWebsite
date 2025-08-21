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

/* ----------------- Helpers ----------------- */

function normalizeBlogToProducts(blog = []) {
  const cats = ["home-printer", "office-printer", "inkjet-printer"];
  return blog.slice(0, 40).map((item, i) => {
    const price = Number(
      (100 + (i % 15) * 7 + (item.userId % 3) * 12 + 0.99).toFixed(2)
    );
    const rating = (3.8 + ((item.id % 12) / 20)).toFixed(1);
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

  return (
    <div style={{ background: "#f6f8fb" }}>
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
                onClick={() => goToDetail(p.id)}
                style={{
                  borderRadius: 14,
                  border: "1px solid #e7ecf3",
                  boxShadow: "0 6px 18px rgba(16, 38, 76, 0.06)",
                  overflow: "hidden",
                  background: "#fff",
                  height: "100%",
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    background: "#f7fafc",
                    padding: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 210,
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    loading="lazy"
                  />
                </div>

                <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                  <Card.Title style={{ fontSize: 18, color: "#0b1b33" }}>
                    {p.title}
                  </Card.Title>
                  <Card.Text style={{ color: "#56617a", minHeight: 56 }}>
                    {p.description}
                  </Card.Text>

                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div style={{ fontWeight: 700, fontSize: 20 }}>
                      ${p.price?.toFixed?.(2) ?? p.price}
                    </div>
                    <Badge bg="light" text="dark" style={{ border: "1px solid #e7ecf3" }}>
                      {p.category}
                    </Badge>
                  </div>

                  <div
                    className="d-flex align-items-center gap-2"
                    style={{ color: "#f59e0b" }}
                  >
                    <StarRow rating={p.rating} />
                    <small style={{ color: "#6b7280" }}>({p.reviewsCount})</small>
                  </div>

                  <div
                    className="d-flex align-items-center mt-2"
                    style={{ color: "#6b7280" }}
                  >
                    <span style={{ marginRight: 6 }}>🚚</span>
                    <small>2–3 business days delivery</small>
                  </div>

                  <div className="d-flex align-items-center gap-2 mt-3">
                    <Button
                      className="flex-grow-1"
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        goToDetail(p.id);
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="light"
                      style={{ border: "1px solid #e7ecf3" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToDetail(p.id);
                      }}
                      aria-label="More info"
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
    </div>
  );
};

export default ProductGallery;
