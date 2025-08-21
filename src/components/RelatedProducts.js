import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";

const RelatedProducts = ({ products = [], currentId, currentCategory }) => {
  const items = useMemo(() => {
    if (!products.length) return [];
    // remove current product
    const others = products.filter((p) => String(p.id) !== String(currentId));
    // prioritize same-category, then fill the rest
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
      <Container style={{ paddingTop: 8, paddingBottom: 48 }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <h2
            className="fw-bold"
            style={{ fontSize: 36, color: "#0b1b33", marginBottom: 6 }}
          >
            You might also like
          </h2>
          <p style={{ color: "#64748b", margin: 0 }}>
            Discover more products from our premium collection
          </p>
        </div>

        <Row className="g-4 mt-2">
          {items.map((p) => (
            <Col key={p.id} xs={12} sm={6} lg={3}>
              <Card
                className="h-100 related-card"
                style={{
                  borderRadius: 16,
                  border: "1px solid #e7ecf3",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(16,38,76,.06)",
                }}
              >
                <div
                  style={{
                    background: "#f7fafc",
                    minHeight: 260,
                    display: "grid",
                    placeItems: "center",
                    padding: 12,
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    loading="lazy"
                  />
                </div>
                <Card.Body>
                  <Card.Title style={{ fontSize: 18, color: "#0b1b33" }}>
                    {p.title}
                  </Card.Title>

                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <div style={{ fontWeight: 800, fontSize: 20 }}>
                      ${p.price?.toFixed ? p.price.toFixed(2) : p.price}
                    </div>

                    <Button
                      as={Link}
                      to={`/product/${p.id}`}
                      variant="primary"
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
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

      <style>{`
        .related-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(16,38,76,.12);
          transition: box-shadow .2s ease, transform .2s ease;
        }
      `}</style>
    </div>
  );
};

export default RelatedProducts;
