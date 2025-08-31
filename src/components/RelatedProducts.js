// src/components/RelatedProducts.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";

const RelatedProducts = ({ products = [], currentId, currentCategory }) => {
  const items = useMemo(() => {
    if (!products.length) return [];
    const others = products.filter((p) => String(p.id) !== String(currentId));
    const scored = others.map((p) => ({
      ...p,
      _score: p.category === currentCategory ? 1 : 0,
    }));
    scored.sort((a, b) => b._score - a._score);
    return scored.slice(0, 4);
  }, [products, currentId, currentCategory]);

  if (!items.length) return null;

  return (
    <div style={{ background: "#fff" }}>
      <style>{`
        .rp-card {
          border-radius: 16px;
          border: 1px solid #e7ecf3;
          overflow: hidden;
          box-shadow: 0 6px 18px rgba(16,38,76,.06);
          min-height: 380px;
          display: flex;
          flex-direction: column;
          transition: box-shadow .2s ease, transform .2s ease;
        }
        .rp-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(16,38,76,.12);
        }
        .rp-image {
          background: #f7fafc;
          height: 200px;     /* fixed height */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }
        .rp-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .rp-title {
          font-size: 18px;
          color: #0b1b33;
          line-height: 1.25;
          margin-top: 10px;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: calc(1.25em * 2); /* reserve consistent height */
        }
        .rp-actions {
          margin-top: auto; /* push to bottom */
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 40px;
        }
      `}</style>

      <Container style={{ paddingTop: 8, paddingBottom: 48 }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h2 className="fw-bold" style={{ fontSize: 36, color: "#0b1b33", marginBottom: 6 }}>
            You might also like
          </h2>
          <p style={{ color: "#64748b", margin: 0 }}>
            Discover more products from our premium collection
          </p>
        </div>

        <Row className="g-4 mt-2">
          {items.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={3}>
              <Card className="rp-card h-100">
                {/* --- Image --- */}
                <div className="rp-image">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>

                {/* --- Body --- */}
                <Card.Body className="d-flex flex-column">
                  {/* Title below image */}
                  <div className="rp-title">{p.title}</div>

                  {/* Price + Button pinned bottom */}
                  <div className="rp-actions">
                    <div style={{ fontWeight: 800, fontSize: 20 }}>
                      {typeof p.price === "number" ? `$${p.price.toFixed(2)}` : p.price}
                    </div>

                    <Button
                      as={Link}
                      to={`/product/${p.id}`}
                      variant="primary"
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                      aria-label={`View ${p.title}`}
                    >
                      <FiShoppingCart />
                      View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default RelatedProducts;
