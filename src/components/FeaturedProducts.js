// src/components/FeaturedProducts.jsx
import React, { useState } from "react";
import { FiTarget, FiZap, FiEye } from "react-icons/fi";
import CartDrawer from "./CartDrawer";

const cardShadow = "0 10px 28px rgba(20, 40, 120, .10)";
const innerShadow = "0 10px 24px rgba(15, 30, 90, .08)";
const border = "1px solid rgba(22, 119, 255, .15)";

const SectionTitle = ({ title, subtitle }) => (
  <div style={{ textAlign: "center", marginBottom: 28 }}>
    <h2
      style={{
        margin: 0,
        fontSize: 36,
        lineHeight: 1.2,
        color: "#0b1b33",
        fontWeight: 800,
      }}
    >
      {title}
    </h2>
    <p
      style={{
        marginTop: 12,
        marginBottom: 0,
        color: "#4b5b77",
        fontSize: 18,
        maxWidth: 820,
        marginInline: "auto",
      }}
    >
      {subtitle}
    </p>
  </div>
);

const OuterCard = ({ children, tint = "blue" }) => {
  const stylesByTint = {
    blue: {
      background:
        "linear-gradient(180deg, rgba(231,243,255,.8) 0%, rgba(222,238,255,.75) 100%)",
      border: "1px solid rgba(59,130,246,.25)",
      boxShadow: cardShadow,
    },
    green: {
      background:
        "linear-gradient(180deg, rgba(230,255,242,.8) 0%, rgba(214,250,234,.75) 100%)",
      border: "1px solid rgba(16,185,129,.22)",
      boxShadow: cardShadow,
    },
  };

  return (
    <div
      style={{
        ...stylesByTint[tint],
        borderRadius: 18,
        padding: 28,
        minHeight: 360,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {children}
    </div>
  );
};

const InnerCard = ({ children }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      boxShadow: innerShadow,
      padding: 28,
      border,
    }}
  >
    {children}
  </div>
);

const IconBadge = ({ tint = "blue", icon }) => {
  const tones =
    tint === "blue"
      ? { bg: "rgba(59,130,246,.12)", fg: "#2563eb" }
      : { bg: "rgba(16,185,129,.12)", fg: "#16a34a" };

  return (
    <div
      style={{
        width: 70,
        height: 70,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        marginInline: "auto",
        background: tones.bg,
      }}
    >
      <div style={{ color: tones.fg, fontSize: 30 }}>{icon}</div>
    </div>
  );
};

const CTAButton = ({ label, tint = "blue", onClick }) => {
  const tones =
    tint === "blue"
      ? { bg: "#2563eb", hover: "#1e4fd8" }
      : { bg: "#16a34a", hover: "#148a3f" };

  return (
    <button
      onClick={onClick}
      style={{
        background: tones.bg,
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "12px 18px",
        fontWeight: 700,
        width: 230,
        cursor: "pointer",
        transition: "background .2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = tones.hover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = tones.bg)}
    >
      {label}
    </button>
  );
};

export default function FeaturedProducts() {
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

  return (
    <section
      style={{
        background: "#f7f9fc",
        padding: "54px 18px",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionTitle
          title="Featured Products for Every Need"
          subtitle="Discover our top-rated printers and supplies, carefully selected for home offices and businesses"
        />

        {/* two cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 28,
          }}
        >
          {/* responsive: 2 columns on ≥ 992px */}
          <style>{`
            @media (min-width: 992px) {
              .fp-grid { 
                grid-template-columns: 1fr 1fr;
              }
            }
          `}</style>

          <div className="fp-grid" style={{ display: "contents" }}>
            {/* Left (Home) */}
            <OuterCard tint="blue">
              <div style={{ textAlign: "center", marginTop: 6 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#0b1b33",
                  }}
                >
                  Best Printer for Home
                </h3>
                <p style={{ marginTop: 8, color: "#4b5b77" }}>
                  Perfect for families and home offices
                </p>
              </div>

              <InnerCard>
                <IconBadge tint="blue" icon={<FiTarget />} />
                <h4
                  style={{
                    textAlign: "center",
                    marginTop: 18,
                    marginBottom: 6,
                    fontSize: 22,
                    color: "#0b1b33",
                    fontWeight: 800,
                  }}
                >
                  Home Printer Collection
                </h4>
                <p
                  style={{
                    textAlign: "center",
                    color: "#52607a",
                    marginTop: 4,
                    marginBottom: 18,
                  }}
                >
                  Reliable, affordable printers for family use
                </p>
                <div style={{ display: "grid", placeItems: "center" }}>
                  <CTAButton
                    tint="blue"
                    label="Browse Home Printers"
                    onClick={onBrowseHome}
                  />
                </div>
              </InnerCard>
            </OuterCard>

            {/* Right (Office) */}
            <OuterCard tint="green">
              <div style={{ textAlign: "center", marginTop: 6 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#0b1b33",
                  }}
                >
                  Best Small Office Printer
                </h3>
                <p style={{ marginTop: 8, color: "#4b5b77" }}>
                  Professional solutions for business productivity
                </p>
              </div>

              <InnerCard>
                <IconBadge tint="green" icon={<FiZap />} />
                <h4
                  style={{
                    textAlign: "center",
                    marginTop: 18,
                    marginBottom: 6,
                    fontSize: 22,
                    color: "#0b1b33",
                    fontWeight: 800,
                  }}
                >
                  Office Printer Solutions
                </h4>
                <p
                  style={{
                    textAlign: "center",
                    color: "#52607a",
                    marginTop: 4,
                    marginBottom: 18,
                  }}
                >
                  High-performance laser printers for business
                </p>
                <div style={{ display: "grid", placeItems: "center" }}>
                  <CTAButton
                    tint="green"
                    label="Browse Office Printers"
                    onClick={onBrowseOffice}
                  />
                </div>
              </InnerCard>
            </OuterCard>
          </div>
        </div>

        <CartDrawer
          show={cartOpen}
          onHide={() => setCartOpen(false)}
          cartItems={cartItems}
          onCheckout={() => alert("Proceeding to checkout...")}
        />
      </div>
    </section>
  );
};
