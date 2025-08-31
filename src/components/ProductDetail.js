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
import { useParams, useNavigate, useLocation } from "react-router-dom";
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

import ProductInfoSection from "./ProductInfoSection";
import RelatedProducts from "./RelatedProducts";
import Header from "./header";
import SupportAndTrust from "./SupportAndTrust";
import LegalFooter from "./LegalFooter";
import CartDrawer from "./CartDrawer";
import CheckoutSteps from "./CheckoutSteps";

/* ---------- Tiny helpers ---------- */
const formatMoney = (n, currency = "INR", locale = "en-IN") =>
  new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(n ?? 0);

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

/* ---------- BLOG -> Product normalizer ---------- */
function normalizeBlogItem(item, i = 0) {
  const price = Number(
    (100 + (i % 15) * 7 + (item.userId % 3) * 12 + 0.99).toFixed(2)
  );
  const rating = Number((3.8 + (item.id % 12) / 20).toFixed(1));
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
    category: "inkjet-printer",
  };
}

function StarRow({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span aria-label={`Rating ${rating} out of 5`} style={{ color: "#f59e0b", whiteSpace: "nowrap" }}>
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

const ProductDetail = ({ product, productId, products = [], blog = [] }) => {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const idToUse = productId ?? routeId;

  const resolved = useMemo(() => {
    // 1) If parent passed a product prop, use it
    if (product) return withDefaults(product);

    // 2) If the list page sent the product in router state, prefer that
    const stateProduct = location.state?.product;
    if (stateProduct) return withDefaults(stateProduct);

    // 3) Lookup by id inside provided products/blog as a fallback
    if (idToUse != null) {
      const fromProducts = products.find((p) => String(p.id) === String(idToUse));
      if (fromProducts) return withDefaults(fromProducts);
      const indexInBlog = blog.findIndex((b) => String(b.id) === String(idToUse));
      if (indexInBlog !== -1)
        return withDefaults(normalizeBlogItem(blog[indexInBlog], indexInBlog));
    }
    return null;
  }, [product, idToUse, products, blog, location.state]);

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleAddToCart = (prod, count = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === prod.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].qty = Math.min(99, updated[idx].qty + count);
        return updated;
      }
      return [...prev, { ...prod, qty: Math.max(1, count) }];
    });
    setLastAdded(prod);
    setCartOpen(true);
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  if (!resolved) {
    return (
      <div style={{ background: "#fff" }}>
        <Container style={{ paddingTop: 24, paddingBottom: 48 }}>
          <Button
            variant="link"
            onClick={() => navigate(-1)}
            style={{ paddingLeft: 0, display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <FiChevronLeft />
            Back
          </Button>
          <Card style={{ marginTop: 12, borderRadius: 14, border: "1px solid #e7ecf3", background: "#fff", padding: 18 }}>
            <h2 className="fw-bold" style={{ margin: 0, color: "#0b1b33" }}>
              Product not found
            </h2>
            <p style={{ margin: "8px 0 0", color: "#64748b" }}>
              The item you’re looking for doesn’t exist or is unavailable.{" "}
              <Button variant="link" onClick={() => navigate("/")} style={{ paddingLeft: 0 }}>
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
      <Header />

      {/* Scoped CSS */}
      <style>{`
        .pd-title {
          font-size: 40px; line-height: 1.15; font-weight: 800; color: #0b1b33; margin-bottom: 8px;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .pd-img-wrap { background:#f7fafc; padding:22px; display:grid; place-items:center; min-height: 480px; }
        @media (max-width: 991.98px){ .pd-img-wrap{ min-height: 360px; } }
        .pd-thumbs { display:grid; grid-template-columns: repeat(6, 1fr); gap:12px; }
        @media (max-width: 575.98px){ .pd-thumbs{ display:flex; overflow-x:auto; gap:10px; padding-bottom:6px; } }
        .pd-thumb-btn { background:#fff; border-radius:10px; padding:6px; display:grid; place-items:center; cursor:pointer; }
        .pd-thumb-btn img { width:100%; height:60px; object-fit:contain; }
        .pd-sticky { position: sticky; top: 24px; }
        .thumb:hover img { transform: scale(1.02); }
      `}</style>

      <div style={{ background: "#fff" }}>
        <Container style={{ paddingTop: 24, paddingBottom: 48 }}>
          {/* Breadcrumb / Back */}
          <div style={{ marginBottom: 12 }}>
            <Button
              variant="link"
              onClick={() => navigate(-1)}
              style={{ paddingLeft: 0, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}
            >
              <FiChevronLeft />
              Back to products
            </Button>
          </div>

          <Row className="g-4">
            {/* Left: Image gallery */}
            <Col lg={7}>
              <Card style={{ borderRadius: 14, border: "1px solid #e7ecf3", boxShadow: "0 10px 24px rgba(16,38,76,.06)", overflow: "hidden" }}>
                <div className="pd-img-wrap">
                  <img
                    key={activeImg}
                    src={resolved.images?.[activeImg] || resolved.image}
                    alt={resolved.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform .2s ease" }}
                  />
                </div>

                <Card.Body>
                  <div className="pd-thumbs" role="listbox" aria-label="Product image thumbnails">
                    {(resolved.images || [resolved.image]).slice(0, 6).map((src, i) => {
                      const active = i === activeImg;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveImg(i)}
                          className="pd-thumb-btn thumb"
                          style={{
                            border: `2px solid ${active ? "#2563eb" : "#e7ecf3"}`,
                            boxShadow: active ? "0 6px 16px rgba(37,99,235,.2)" : "none",
                          }}
                          aria-label={`Select image ${i + 1}`}
                          aria-pressed={active}
                        >
                          <img src={src} alt={`Thumbnail ${i + 1}`} loading="lazy" />
                        </button>
                      );
                    })}
                  </div>

                  <div style={{ display: "flex", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
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
              <div className="pd-sticky">
                <div style={{ marginBottom: 8 }}>
                  <h1 className="pd-title">{resolved.title}</h1>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
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
                    <div style={{ fontWeight: 800, color: "#0b1b33", marginBottom: 12 }}>
                      Key Features
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
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
                            aria-hidden="true"
                          >
                            {f.icon}
                          </span>
                          <span style={{ fontWeight: 700, color: "#0b1b33" }}>{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>

                {/* Purchase panel */}
                <Card style={{ borderRadius: 14, border: "1px solid #e7ecf3", boxShadow: "0 10px 24px rgba(16,38,76,.06)" }}>
                  <Card.Body>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 6 }}>
                      <div style={{ fontSize: 40, fontWeight: 800 }}>
                        {formatMoney(resolved.price)}
                      </div>
                      {resolved.compareAtPrice && (
                        <>
                          <div style={{ color: "#64748b", textDecoration: "line-through", fontWeight: 700 }}>
                            {formatMoney(resolved.compareAtPrice)}
                          </div>
                          {save > 0 && (
                            <Badge bg="danger" pill style={{ fontWeight: 700 }}>
                              Save {formatMoney(save)}
                            </Badge>
                          )}
                        </>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: inStock ? "#16a34a" : "#ef4444", marginBottom: 10 }}>
                      <span
                        style={{ width: 10, height: 10, borderRadius: "50%", background: inStock ? "#16a34a" : "#ef4444" }}
                        aria-hidden="true"
                      />
                      <small style={{ fontWeight: 700 }}>
                        {inStock ? `In Stock - ${resolved.stock} available` : "Out of stock"}
                      </small>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <label htmlFor="qty" style={{ minWidth: 80, margin: 0 }}>Quantity:</label>
                      <InputGroup style={{ width: 160 }}>
                        <Button
                          variant="light"
                          style={{ border: "1px solid #e7ecf3" }}
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          aria-label="Decrease quantity"
                        >
                          −
                        </Button>
                        <Form.Control
                          id="qty"
                          inputMode="numeric"
                          value={qty}
                          onChange={(e) => {
                            const v = Number((e.target.value || "").replace(/\D+/g, "")) || 1;
                            setQty(Math.min(99, Math.max(1, v)));
                          }}
                          style={{ textAlign: "center" }}
                          aria-live="polite"
                        />
                        <Button
                          variant="light"
                          style={{ border: "1px solid #e7ecf3" }}
                          onClick={() => setQty((q) => Math.min(99, q + 1))}
                          aria-label="Increase quantity"
                        >
                          +
                        </Button>
                      </InputGroup>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                      onClick={() => handleAddToCart(resolved, qty)}
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </Button>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                      <Button variant="light" style={{ border: "1px solid #e7ecf3" }}>
                        <FiHeart style={{ marginRight: 6 }} />
                        Save for Later
                      </Button>
                      <Button variant="light" style={{ border: "1px solid #e7ecf3" }}>
                        <FiShare2 style={{ marginRight: 6 }} />
                        Share
                      </Button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, color: "#10b981" }}>
                      <FiCheckCircle />
                      <small>Free returns on defective items • Secure checkout</small>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Info/tabs */}
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

      <RelatedProducts
        products={products}
        currentId={resolved.id}
        currentCategory={resolved.category}
      />
      <SupportAndTrust />
      <LegalFooter />

      <CartDrawer
        show={cartOpen}
        onHide={() => setCartOpen(false)}
        cartItems={cartItems}
        onCheckout={handleCheckout}
      />

      {checkoutOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#f7f8fb", zIndex: 9999, overflowY: "auto" }}>
          <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "row", alignItems: "stretch", justifyContent: "center" }}>
            {/* Left: Steps and forms */}
            <div style={{ flex: 2, minWidth: 0, padding: "48px 32px 48px 64px", background: "#fff", boxShadow: "0 0 32px rgba(16,38,76,.08)", borderRadius: "0 24px 24px 0", position: "relative" }}>
              <button
                style={{ position: "absolute", top: 32, right: 32, background: "none", border: "none", fontSize: 22, color: "#245af0", cursor: "pointer" }}
                onClick={() => setCheckoutOpen(false)}
                aria-label="Close checkout"
              >✕</button>
              <h2 className="fw-bold mb-4" style={{ color: "#245af0" }}>Checkout</h2>
              <CheckoutSteps cartItems={cartItems} onOrderPlaced={() => setCheckoutOpen(false)} />
            </div>
            {/* Right: Order summary sidebar */}
            <div style={{ flex: 1, minWidth: 340, maxWidth: 420, background: "#f7f8fb", borderLeft: "1px solid #e5e7eb", padding: "48px 32px", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <h4 style={{ color: "#245af0", fontWeight: 700, marginBottom: 24 }}>Order Summary</h4>
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item d-flex align-items-center gap-3" style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 8 }}>
                    <img src={item.image} alt={item.title} style={{ width: 48, height: 32, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700 }}>{item.title}</div>
                      <div style={{ color: "#64748b" }}>Qty: {item.qty}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: "#245af0" }}>
                      {formatMoney(item.price * item.qty)}
                    </div>
                  </li>
                ))}
              </ul>
              {(() => {
                const sub = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
                const ship = sub > 999 ? 0 : 49;
                const tax = Math.round(sub * 0.12);
                const total = sub + ship + tax;
                return (
                  <div className="mb-3 p-3" style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb' }}>
                    <div className="d-flex justify-content-between"><span>Subtotal</span><span>{formatMoney(sub)}</span></div>
                    <div className="d-flex justify-content-between"><span>Shipping</span><span>{ship ? formatMoney(ship) : 'Free'}</span></div>
                    <div className="d-flex justify-content-between"><span>Tax (12%)</span><span>{formatMoney(tax)}</span></div>
                    <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>{formatMoney(total)}</span></div>
                  </div>
                );
              })()}
              <div className="mb-2" style={{ color: '#64748b', fontSize: 13 }}>
                <span>Seller: </span><span style={{ color: '#245af0', fontWeight: 600 }}>Print Mart Online</span>
                <span className="ms-2">| Support: <a href="tel:8335516033" style={{ color: '#22c55e', textDecoration: 'none' }}>833-551-6033</a></span>
              </div>
              <div style={{ marginTop: 32, color: '#64748b', fontSize: 13 }}>
                <div>✓ Secure checkout guaranteed</div>
                <div>✓ 30-day easy returns</div>
                <div>✓ Fast & reliable shipping</div>
              </div>
            </div>
          </div>
        </div>
      )}
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
    highlights: p.highlights ?? [],
    boxItems: p.boxItems ?? [],
    specs: p.specs ?? {},
    compatibility: p.compatibility ?? [],
    category: p.category ?? "inkjet-printer",
    ...p,
  };
}

export default ProductDetail;
