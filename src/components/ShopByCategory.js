import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ShopByCategory = () => {
  const BLUE = "#2563eb";
  const BLUE_DARK = "#1d4ed8";
  const TEXT = "#0f172a";
  const MUTED = "#6b7280";
  const LINE = "#e5e7eb";
  const wrap = { maxWidth: 1200, margin: "0 auto", padding: "0 20px" };

  // Icons (white)
  const Cube = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <path d="M12 2l8 4-8 4-8-4 8-4z" />
      <path d="M4 6v8l8 4 8-4V6" />
      <path d="M12 10v8" />
    </svg>
  );
  const Home = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <path d="M3 12l9-9 9 9" />
      <path d="M5 10v10h14V10" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
  const Droplet = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <path d="M12 2C9.5 6 6 9.5 6 14a6 6 0 0 0 12 0c0-4.5-3.5-8-6-12z" />
    </svg>
  );
  const Printer = () => (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
      <rect x="6" y="9" width="12" height="8" />
      <path d="M6 13h12" />
      <rect x="8" y="2" width="8" height="5" />
      <path d="M8 17h8v5H8z" />
    </svg>
  );

  // Single card
  const CategoryCard = ({ icon, title, subtitle }) => {
    const [hover, setHover] = useState(false);
    const borderColor = hover ? BLUE : LINE;
    const borderWidth = hover ? 2 : 1;
    const shadow = hover ? "0 10px 22px rgba(37,99,235,.18)" : "0 8px 18px rgba(0,0,0,.04)";

    return (
      <div
        className="h-100"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          border: `${borderWidth}px solid ${borderColor}`, // blue outline ONLY on hover
          borderRadius: 6,                                   // 🤏 हल्की rounding
          background: "#fff",
          padding: "32px 28px",
          boxShadow: shadow,
          transition: "border-color .15s, box-shadow .15s",
        }}
      >
        {/* round icon bubble */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${BLUE} 0%, ${BLUE_DARK} 100%)`,
            boxShadow: "0 18px 28px rgba(37,99,235,.25)",
            display: "grid",
            placeItems: "center",
            margin: "0 auto 18px",
          }}
        >
          {icon}
        </div>

        <div className="text-center">
          <div style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 8 }}>
            {title}
          </div>
          <div style={{ fontSize: 16, color: MUTED, marginBottom: 16 }}>
            {subtitle}
          </div>
          <a href="#" className="text-decoration-none" style={{ color: BLUE, fontWeight: 700 }}>
            Shop Now <span style={{ fontSize: 18 }}>›</span>
          </a>
        </div>
      </div>
    );
  };

  return (
    <section style={{ background: "#f7f8fb", padding: "56px 0 64px" }}>
      <div style={wrap}>
        <div className="text-center" style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: TEXT, marginBottom: 12 }}>
            Shop by Category
          </h2>
          <p
            style={{
              fontSize: 18,
              color: MUTED,
              maxWidth: 1050,
              margin: "0 auto",
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            Looking for a workhorse <strong>laser printer</strong> that can handle your busiest days?
            Or maybe a simple <strong>home printer</strong> that connects to your WiFi without drama?
            We’ve sorted everything into clear categories so you can find what you need fast — plus
            all the <strong>office supplies</strong> to keep things running.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-3">
            <CategoryCard icon={<Cube />} title="All Products" subtitle="Browse all products" />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <CategoryCard icon={<Home />} title="Home Printer" subtitle="Cables & More" />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <CategoryCard icon={<Droplet />} title="INK, TONER & PAPER" subtitle="Cables & More" />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <CategoryCard icon={<Printer />} title="Office Printer" subtitle="Cables & More" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
