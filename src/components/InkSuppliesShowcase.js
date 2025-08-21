// src/components/InkSuppliesShowcase.jsx
import React from "react";
import { FiZap, FiTarget, FiBox } from "react-icons/fi";

/**
 * Props:
 * - items?: [
 *     { title, price, image, ctaLabel, onClick }
 *   ]  // Defaults provided below
 * - onShopFirst?: function
 * - onShopSecond?: function
 */
const InkSuppliesShowcase = ({
  items,
  onShopFirst = () => {},
  onShopSecond = () => {},
}) => {
  const defaults = [
    {
      title: "OfficeJet Pro 8135e Wireless All-in-One Printer",
      price: 234.99,
      image: "https://picsum.photos/seed/ink-1/160/110",
      ctaLabel: "Shop Now",
      onClick: onShopFirst,
    },
    {
      title:
        "HP 67XL High Yield Black Original Ink Cartridge, 3YM57AN#140",
      price: 32.99,
      image: "https://picsum.photos/seed/ink-2/160/110",
      ctaLabel: "Shop Now",
      onClick: onShopSecond,
    },
  ];

  const data = Array.isArray(items) && items.length ? items : defaults;

  return (
    <section
      aria-labelledby="ink-title"
      style={{
        position: "relative",
        background:
          "radial-gradient(1200px 600px at 20% 0%, #8b5cf6 0%, #6d28d9 40%, #5b21b6 75%)",
        padding: "64px 18px 78px",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title + Subtitle */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h2
            id="ink-title"
            style={{
              margin: 0,
              fontWeight: 800,
              fontSize: 36,
              letterSpacing: 0.2,
            }}
          >
            Premium Ink Cartridges & Supplies
          </h2>
          <p
            style={{
              maxWidth: 900,
              margin: "12px auto 0",
              lineHeight: 1.6,
              opacity: 0.95,
              fontSize: 18,
            }}
          >
            Your printer is only as good as what you put in it. That’s why we
            stock the good stuff – quality ink that won’t clog your heads, paper
            that feeds smoothly, and all the little things that keep your
            machine happy and your warranty intact.
          </p>
        </div>

        {/* Layout */}
        <div
          className="ink-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 28,
            alignItems: "stretch",
          }}
        >
          <style>{`
            @media (min-width: 992px) {
              .ink-grid {
                grid-template-columns: 2fr 1fr;
              }
            }
            .blur-card:hover { transform: translateY(-3px); }
            .blur-card {
              transition: transform .18s ease, box-shadow .18s ease;
            }
            .mini-card:hover { transform: translateY(-2px); }
            .mini-card { transition: transform .18s ease, box-shadow .18s ease; }
            .ink-cta:hover { filter: brightness(.95); }
          `}</style>

          {/* Left: Featured ink panel */}
          <div
            className="blur-card"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,.16), rgba(255,255,255,.09))",
              border: "1px solid rgba(255,255,255,.18)",
              boxShadow: "0 20px 48px rgba(0,0,0,.20)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: 18,
              padding: 22,
            }}
          >
            <div
              style={{
                fontWeight: 800,
                fontSize: 22,
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: "rgba(255,255,255,.15)",
                  border: "1px solid rgba(255,255,255,.25)",
                }}
              >
                🖨️
              </span>
              Featured Ink Cartridges
            </div>

            {/* Items */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 18,
              }}
            >
              <style>{`
                @media (min-width: 768px) {
                  .ink-items { grid-template-columns: 1fr 1fr; }
                }
              `}</style>

              <div className="ink-items" style={{ display: "grid", gap: 18 }}>
                {data.map((p, idx) => (
                  <article
                    key={idx}
                    className="mini-card"
                    style={{
                      background: "#fff",
                      color: "#111827",
                      borderRadius: 14,
                      padding: 16,
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 14,
                      alignItems: "center",
                      boxShadow: "0 14px 28px rgba(31,41,55,.18)",
                      border: "1px solid #ede9fe",
                    }}
                  >
                    <div
                      style={{
                        width: 92,
                        height: 68,
                        borderRadius: 10,
                        background: "#f8fafc",
                        display: "grid",
                        placeItems: "center",
                        overflow: "hidden",
                        border: "1px solid #eef2ff",
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>

                    <div style={{ display: "grid", gap: 10 }}>
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 15.5,
                            lineHeight: 1.35,
                          }}
                        >
                          {p.title}
                        </div>
                        <div
                          style={{
                            color: "#7c3aed",
                            fontWeight: 800,
                            marginTop: 4,
                          }}
                        >
                          ${p.price.toFixed(2)}
                        </div>
                      </div>

                      <button
                        className="ink-cta"
                        onClick={p.onClick || (() => {})}
                        style={{
                          background: "#7c3aed",
                          color: "#fff",
                          border: "none",
                          width: "100%",
                          borderRadius: 8,
                          padding: "10px 14px",
                          fontWeight: 800,
                          letterSpacing: 0.2,
                          cursor: "pointer",
                        }}
                      >
                        {p.ctaLabel || "Shop Now"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Feature bullets */}
          <div
            style={{
              display: "grid",
              alignContent: "center",
              gap: 22,
              paddingInline: 8,
            }}
          >
            <FeatureItem
              icon={<FiZap />}
              title="Authentic Quality"
              desc="Original manufacturer cartridges ensure optimal print quality and protect your warranty."
            />
            <FeatureItem
              icon={<FiTarget />}
              title="High Yield Options"
              desc="XL cartridges reduce replacement frequency and lower cost per page."
            />
            <FeatureItem
              icon={<FiBox />}
              title="Fast Delivery"
              desc="Quick shipping ensures you never run out of essential supplies."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: 14,
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: "rgba(255,255,255,.12)",
        border: "1px solid rgba(255,255,255,.25)",
        boxShadow: "0 10px 24px rgba(0,0,0,.18) inset",
        fontSize: 22,
      }}
    >
      {icon}
    </div>

    <div>
      <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>
        {title}
      </div>
      <div style={{ opacity: 0.92, lineHeight: 1.5 }}>{desc}</div>
    </div>
  </div>
);

export default InkSuppliesShowcase;
