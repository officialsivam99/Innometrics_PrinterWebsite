// src/components/ProductDetail.jsx
import React, { useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiZoomIn,
  FiImage,
  FiCheckCircle,
  FiChevronLeft,
} from "react-icons/fi";
import {
  TbPrinter,
  TbScan,
  TbCopy,
  TbDeviceMobile,
  TbCloud,
  TbBolt,
  TbLeaf,
  TbRotateClockwise2,
  TbUsb,
  TbWifi,
  TbDropletHalf2,
  TbDeviceFloppy,
} from "react-icons/tb";

// Info/tabs + related
import ProductInfoSection from "./ProductInfoSection";
import RelatedProducts from "./RelatedProducts";

/* ---------- Helpers ---------- */
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

// BLOG -> Product normalizer
function normalizeBlogItem(item, i = 0) {
  const price = Number(
    (100 + (i % 15) * 7 + (item.userId % 3) * 12 + 0.99).toFixed(2)
  );
  const rating = Number((3.8 + (item.id % 12) / 20).toFixed(1)); // 3.8–4.4
  const reviewsCount = 100 + (item.id % 50);
  const image = `https://picsum.photos/seed/printer-${item.id}/900/620`;
  return {
    id: item.id,
    title: toTitleCase(item.title),
    description: sentenceCase(item.body),
    image,
    images: [
      image,
      `https://picsum.photos/seed/printer-${item.id}-b/900/620`,
      `https://picsum.photos/seed/printer-${item.id}-c/900/620`,
      `https://picsum.photos/seed/printer-${item.id}-d/900/620`,
      `https://picsum.photos/seed/printer-${item.id}-e/900/620`,
      `https://picsum.photos/seed/printer-${item.id}-f/900/620`,
    ],
    price,
    compareAtPrice: price + 25,
    rating,
    reviewsCount,
    stock: 60,
    badge: rating >= 4.7 ? "Best Seller" : undefined,
    features: defaultFeatures,
    // Provide defaults for the info tabs
    highlights: [
      "Print, scan, copy functionality",
      "Wireless & mobile printing support",
      "Automatic duplex printing",
    ],
    boxItems: ["All-in-One Printer", "Power cord", "USB cable", "Setup guide"],
    specs: {
      "Print Technology": "Inkjet",
      Connectivity: "Wi-Fi, USB",
    },
    compatibility: ["Windows 11/10", "macOS 12+"],
    // ✅ default category so RelatedProducts can group properly
    category: "inkjet-printer",
  };
}

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

/* ---------- Default feature icons/text ---------- */
const defaultFeatures = [
  { icon: <TbPrinter />, label: "Print" },
  { icon: <TbScan />, label: "Scan" },
  { icon: <TbCopy />, label: "Copy" },
  { icon: <TbDeviceFloppy />, label: "Fax" },
  { icon: <TbWifi />, label: "Wireless" },
  { icon: <TbDeviceMobile />, label: "Mobile Print" },
  { icon: <TbUsb />, label: "USB Connect" },
  { icon: <TbCloud />, label: "Cloud Print" },
  { icon: <TbBolt />, label: "Fast Speed" },
  { icon: <TbLeaf />, label: "Eco-Friendly" },
  { icon: <TbRotateClockwise2 />, label: "Auto Duplex" },
  { icon: <TbDropletHalf2 />, label: "Ink Efficient" },
];

/**
 * Props:
 * - product?: product object
 * - productId?: id to lookup inside `products`/`blog`
 * - products?: array of product-shaped items
 * - blog?: array (we'll normalize item by id)
 */
const ProductDetail = ({ product, productId, products = [], blog = [] }) => {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const idToUse = productId ?? routeId;

  const resolved = useMemo(() => {
    if (product) return withDefaults(product);
    if (idToUse != null) {
      const fromProducts = products.find(
        (p) => String(p.id) === String(idToUse)
      );
      if (fromProducts) return withDefaults(fromProducts);
      const indexInBlog = blog.findIndex(
        (b) => String(b.id) === String(idToUse)
      );
      if (indexInBlog !== -1)
        return withDefaults(normalizeBlogItem(blog[indexInBlog], indexInBlog));
    }
    return null;
  }, [product, idToUse, products, blog]);

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  if (!resolved) {
    return (
      <div style={{ background: "#fff" }}>
        <Container style={{ paddingTop: 24, paddingBottom: 48 }}>
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            style={{
              paddingLeft: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <FiChevronLeft />
            Back
          </Button>
          <Card
            style={{
              marginTop: 12,
              borderRadius: 14,
              border: "1px solid #e7ecf3",
              background: "#fff",
              padding: 18,
            }}
          >
            <h2 className="fw-bold" style={{ margin: 0, color: "#0b1b33" }}>
              Product not found
            </h2>
            <p style={{ margin: "8px 0 0", color: "#64748b" }}>
              The item you’re looking for doesn’t exist or is unavailable.{" "}
              <Button
                variant="link"
                onClick={() => navigate("/")}
                style={{ paddingLeft: 0 }}
              >
                Go back to products
              </Button>
            </p>
          </Card>
        </Container>
      </div>
    );
  }

  const save = Math.max(0, (resolved.compareAtPrice || 0) - resolved.price);
  const inStock = (resolved.stock ?? 0) > 0;

  return (
    <>
      <div style={{ background: "#fff" }}>
        <Container style={{ paddingTop: 24, paddingBottom: 48 }}>
          {/* Breadcrumb / Back */}
          <div style={{ marginBottom: 12 }}>
            <Button
              variant="link"
              onClick={() => navigate(-1)}
              style={{
                paddingLeft: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                textDecoration: "none",
              }}
            >
              <FiChevronLeft />
              Back to products
            </Button>
          </div>

          <Row className="g-4">
            {/* Left: Image gallery */}
            <Col lg={7}>
              <Card
                style={{
                  borderRadius: 14,
                  border: "1px solid #e7ecf3",
                  boxShadow: "0 10px 24px rgba(16,38,76,.06)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: "#f7fafc",
                    padding: 22,
                    display: "grid",
                    placeItems: "center",
                    minHeight: 440,
                  }}
                >
                  <img
                    key={activeImg}
                    src={resolved.images?.[activeImg] || resolved.image}
                    alt={resolved.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "transform .2s ease",
                    }}
                  />
                </div>

                <Card.Body>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      gap: 12,
                    }}
                  >
                    {(resolved.images || [resolved.image])
                      .slice(0, 6)
                      .map((src, i) => {
                        const active = i === activeImg;
                        return (
                          <button
                            key={i}
                            onClick={() => setActiveImg(i)}
                            className="thumb"
                            style={{
                              background: "#fff",
                              borderRadius: 10,
                              border: `2px solid ${
                                active ? "#2563eb" : "#e7ecf3"
                              }`,
                              padding: 6,
                              display: "grid",
                              placeItems: "center",
                              cursor: "pointer",
                              boxShadow: active
                                ? "0 6px 16px rgba(37,99,235,.2)"
                                : "none",
                            }}
                            aria-label={`Gallery image ${i + 1}`}
                          >
                            <img
                              src={src}
                              alt={`thumb ${i + 1}`}
                              style={{
                                width: "100%",
                                height: 60,
                                objectFit: "contain",
                              }}
                              loading="lazy"
                            />
                          </button>
                        );
                      })}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      marginTop: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button variant="light" style={{ border: "1px solid #e7ecf3" }}>
                      <FiZoomIn style={{ marginRight: 6 }} />
                      Zoom View
                    </Button>
                    <Button variant="light" style={{ border: "1px solid #e7ecf3" }}>
                      <FiImage style={{ marginRight: 6 }} />
                      Full Gallery
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Right: Info */}
            <Col lg={5}>
              <div style={{ marginBottom: 8 }}>
                <h1
                  style={{
                    fontSize: 40,
                    lineHeight: 1.15,
                    fontWeight: 800,
                    color: "#0b1b33",
                    marginBottom: 8,
                  }}
                >
                  {resolved.title}
                </h1>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <StarRow rating={resolved.rating} />{" "}
                    <small style={{ color: "#6b7280" }}>
                      ({resolved.rating}/5) {resolved.reviewsCount} reviews
                    </small>
                  </div>
                  {resolved.badge && (
                    <Badge bg="success" pill style={{ fontWeight: 700 }}>
                      {resolved.badge}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Key features */}
              <Card
                style={{
                  borderRadius: 14,
                  border: "1px solid #e7ecf3",
                  background: "linear-gradient(180deg,#f5f9ff,#f3f8ff)",
                  marginTop: 16,
                  marginBottom: 16,
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      fontWeight: 800,
                      color: "#0b1b33",
                      marginBottom: 12,
                    }}
                  >
                    Key Features
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 12,
                    }}
                  >
                    {(resolved.features || defaultFeatures).map((f, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          background: "#fff",
                          border: "1px solid #e7ecf3",
                          borderRadius: 12,
                          padding: "10px 12px",
                        }}
                      >
                        <span
                          style={{
                            width: 34,
                            height: 34,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: 10,
                            background: "rgba(37,99,235,.10)",
                            color: "#2563eb",
                            border: "1px solid rgba(37,99,235,.2)",
                            fontSize: 18,
                          }}
                        >
                          {f.icon}
                        </span>
                        <span style={{ fontWeight: 700, color: "#0b1b33" }}>
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Purchase panel */}
              <Card
                style={{
                  borderRadius: 14,
                  border: "1px solid #e7ecf3",
                  boxShadow: "0 10px 24px rgba(16,38,76,.06)",
                }}
              >
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 14,
                      flexWrap: "wrap",
                      marginBottom: 6,
                    }}
                  >
                    <div style={{ fontSize: 40, fontWeight: 800 }}>
                      ${resolved.price.toFixed(2)}
                    </div>
                    {resolved.compareAtPrice && (
                      <>
                        <div
                          style={{
                            color: "#64748b",
                            textDecoration: "line-through",
                            fontWeight: 700,
                          }}
                        >
                          ${resolved.compareAtPrice.toFixed(2)}
                        </div>
                        {save > 0 && (
                          <Badge bg="danger" pill style={{ fontWeight: 700 }}>
                            Save ${save.toFixed(0)}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: inStock ? "#16a34a" : "#ef4444",
                      marginBottom: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: inStock ? "#16a34a" : "#ef4444",
                      }}
                    />
                    <small style={{ fontWeight: 700 }}>
                      {inStock
                        ? `In Stock - ${resolved.stock} available`
                        : "Out of stock"}
                    </small>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div style={{ minWidth: 80 }}>Quantity:</div>
                    <InputGroup style={{ width: 140 }}>
                      <Button
                        variant="light"
                        style={{ border: "1px solid #e7ecf3" }}
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        −
                      </Button>
                      <Form.Control
                        value={qty}
                        onChange={(e) => {
                          const v =
                            Number(e.target.value.replace(/\D+/g, "")) || 1;
                          setQty(Math.min(99, Math.max(1, v)));
                        }}
                        style={{ textAlign: "center" }}
                      />
                      <Button
                        variant="light"
                        style={{ border: "1px solid #e7ecf3" }}
                        onClick={() => setQty((q) => Math.min(99, q + 1))}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-100"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                    }}
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </Button>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                      marginTop: 12,
                    }}
                  >
                    <Button variant="light" style={{ border: "1px solid #e7ecf3" }}>
                      <FiHeart style={{ marginRight: 6 }} />
                      Save for Later
                    </Button>
                    <Button variant="light" style={{ border: "1px solid #e7ecf3" }}>
                      <FiShare2 style={{ marginRight: 6 }} />
                      Share
                    </Button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 12,
                      color: "#10b981",
                    }}
                  >
                    <FiCheckCircle />
                    <small>Free returns on defective items • Secure checkout</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Tiny scoped styles for hover/active accents */}
        <style>{`
          .thumb:hover img { transform: scale(1.02); }
        `}</style>
      </div>

      {/* Full information/tabs section */}
      <ProductInfoSection
        product={{
          description: resolved.description,
          highlights:
            resolved.highlights && resolved.highlights.length
              ? resolved.highlights
              : [
                  "Print, scan, copy functionality",
                  "Wireless & mobile printing support",
                  "Automatic duplex printing",
                ],
          boxItems:
            resolved.boxItems && resolved.boxItems.length
              ? resolved.boxItems
              : [
                  "All-in-One Printer",
                  "Setup ink cartridges",
                  "Power cord",
                  "USB cable",
                  "Setup guide",
                  "Software CD",
                  "Quick start guide",
                ],
          specs:
            resolved.specs && Object.keys(resolved.specs).length
              ? resolved.specs
              : {
                  "Print Technology": "Inkjet",
                  "Max Print Resolution": "4800 × 1200 dpi",
                  Connectivity: "Wi-Fi, USB",
                },
          compatibility:
            resolved.compatibility && resolved.compatibility.length
              ? resolved.compatibility
              : ["Windows 11/10", "macOS 12+", "iOS / Android"],
        }}
      />

      {/* ✅ Pass the actual products array here */}
      <RelatedProducts
        products={products}
        currentId={resolved.id}
        currentCategory={resolved.category}
      />
      
    </>
  );
};

/* ensure sane defaults if someone passes a partial product */
function withDefaults(p) {
  return {
    features: defaultFeatures,
    images: p.images && p.images.length ? p.images : [p.image].filter(Boolean),
    stock: p.stock ?? 60,
    rating: p.rating ?? 4.6,
    reviewsCount: p.reviewsCount ?? 128,
    // ensure ProductInfoSection has something
    highlights: p.highlights ?? [],
    boxItems: p.boxItems ?? [],
    specs: p.specs ?? {},
    compatibility: p.compatibility ?? [],
    category: p.category ?? "inkjet-printer", // safe default
    ...p,
  };
}

export default ProductDetail;
