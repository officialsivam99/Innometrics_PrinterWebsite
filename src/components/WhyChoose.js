import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const WhyChoose = () => {
  const TEXT = "#111827";
  const MUTED = "#4b5563";

  const wrap = { maxWidth: 1200, margin: "0 auto", padding: "0 20px" };
  const medium = { fontWeight: 500 };

  const IconTarget = ({ color = "#2563eb" }) => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  );

  const IconBolt = ({ color = "#16a34a" }) => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="none" />
    </svg>
  );

  const IconCube = ({ color = "#7c3aed" }) => (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2">
      <path d="M12 2l8 4-8 4-8-4 8-4z" />
      <path d="M4 6v8l8 4 8-4V6" />
      <path d="M12 10v8" />
    </svg>
  );

  const Feature = ({ bg, icon, title, children }) => (
    <div className="text-center px-3 px-md-4">
      <div
        className="d-inline-flex align-items-center justify-content-center mb-3"
        style={{
          width: 92,
          height: 92,
          borderRadius: "50%",
          background: bg,
        }}
      >
        {icon}
      </div>
      <h4 style={{ color: TEXT, fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{title}</h4>
      <p style={{ color: MUTED, fontSize: 16, lineHeight: 1.8, ...medium }}>
        {children}
      </p>
    </div>
  );

  return (
    <section style={{ background: "#fff", padding: "64px 0 32px" }}>
      <div style={wrap}>
        {/* Heading & intro */}
        <div className="text-center mb-4 mb-md-5">
          <h2
            style={{
              color: TEXT,
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: ".2px",
              marginBottom: 16,
            }}
          >
            Why Choose Ink &amp; Paper Express?
          </h2>
          <p
            style={{
              color: MUTED,
              fontSize: 18,
              lineHeight: 1.8,
              maxWidth: 1000,
              margin: "0 auto",
              ...medium,
            }}
          >
            Every family and business has different printing needs. That's why we
            stock everything from compact home inkjets to powerful office laser
            printers. Our team knows printers inside and out, so we can help you
            find exactly what works for your situation and budget.
          </p>
        </div>

        {/* Features */}
        <div className="row gy-5 gx-4 justify-content-center" style={{ marginTop: 24 }}>
          <div className="col-12 col-md-6 col-lg-4">
            <Feature
              bg="rgba(37,99,235,.12)" // soft blue
              icon={<IconTarget color="#2563eb" />}
              title="Perfect for Families"
            >
              Printers that won't break the bank but still handle everything
              from homework assignments to holiday cards with ease.
            </Feature>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <Feature
              bg="rgba(16,185,129,.12)" // soft green
              icon={<IconBolt color="#16a34a" />}
              title="Built for Business"
            >
              When deadlines matter and you can't afford printer problems,
              these workhorses keep your office running without missing a beat.
            </Feature>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <Feature
              bg="rgba(124,58,237,.12)" // soft purple
              icon={<IconCube color="#7c3aed" />}
              title="Everything You Need"
            >
              No more running to different stores. Get your ink, paper, and all
              those little office extras in one place, delivered right to your
              door.
            </Feature>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
