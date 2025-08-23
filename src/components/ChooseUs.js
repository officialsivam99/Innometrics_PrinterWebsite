// src/components/WhyChoose.jsx
import React from "react";
import { FiZap, FiCheckCircle, FiDollarSign, FiLifeBuoy } from "react-icons/fi";

const Card = ({ tone, icon, title, children }) => {
  const tones = {
    green: { bg: "rgba(16,185,129,.12)", fg: "#10b981", ring: "rgba(16,185,129,.22)" },
    blue:  { bg: "rgba(37,99,235,.12)",  fg: "#2563eb", ring: "rgba(37,99,235,.22)" },
    purple:{ bg: "rgba(124,58,237,.12)", fg: "#7c3aed", ring: "rgba(124,58,237,.22)" },
    orange:{ bg: "rgba(234,88,12,.12)",  fg: "#ea580c", ring: "rgba(234,88,12,.22)" },
  }[tone];

  return (
    <article className="wc-card">
      <div
        className="wc-badge"
        style={{
          background: tones.bg,
          color: tones.fg,
          boxShadow: `0 0 0 6px ${tones.ring}`,
        }}
      >
        {icon}
      </div>
      <h3 className="wc-card-title">{title}</h3>
      <p className="wc-card-text">{children}</p>
    </article>
  );
};

const ChooseUs = () => {
  return (
    <section className="wc-wrap" aria-labelledby="why-choose-title">
      <div className="wc-container">
        <header className="wc-head">
          <h2 id="why-choose-title" className="wc-title">
            Why Choose Print Mate Online?
          </h2>
          <p className="wc-sub">
            Looking for a wireless <strong>home printer</strong> that actually connects without a headache?
            Need an <strong>office printer</strong> that can handle your busiest days? We’ve tested these machines
            ourselves and only stock the ones that really work. Plus genuine <strong>ink cartridges</strong> and all the
            <strong> office supplies</strong> to keep everything running.
          </p>
        </header>

        <div className="wc-grid">
          <Card tone="green" icon={<FiZap size={26} />} title="Fast Delivery">
            When you need it fast, we deliver. Check if your area qualifies for same-day or next-day service.
          </Card>

          <Card tone="blue" icon={<FiCheckCircle size={26} />} title="Authentic Products">
            Real HP products, not knockoffs. Every item comes with the full manufacturer warranty you’d expect.
          </Card>

          <Card tone="purple" icon={<FiDollarSign size={26} />} title="Best Prices">
            Competitive pricing with price-match guarantee and bulk discounts available.
          </Card>

          <Card tone="orange" icon={<FiLifeBuoy size={26} />} title="Expert Support">
            24/7 customer support with HP-certified technicians ready to help you.
          </Card>
        </div>
      </div>

      {/* scoped styles */}
      <style>{`
        .wc-wrap { background:#fff; padding:56px 16px; }
        .wc-container { max-width:1180px; margin:0 auto; }
        .wc-head { text-align:center; margin-bottom:28px; }
        .wc-title { margin:0; font-weight:800; font-size:36px; color:#0b1b33; line-height:1.2; }
        .wc-sub { max-width:980px; margin:12px auto 0; color:#465872; font-size:18px; line-height:1.7; }
        .wc-grid {
          display:grid; gap:22px; grid-template-columns:1fr;
          margin-top:28px;
        }
        @media (min-width: 768px) { .wc-grid { grid-template-columns:1fr 1fr; } }
        @media (min-width: 1200px){ .wc-grid { grid-template-columns:repeat(4,1fr); } }

        .wc-card {
          background:#fff; border:1px solid #e7ecf3; border-radius:16px;
          padding:28px 22px; text-align:center; box-shadow:0 10px 24px rgba(16,38,76,.06);
          transition:transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }
        .wc-card:hover { transform: translateY(-6px); box-shadow:0 14px 34px rgba(16,38,76,.09); border-color:#dfe7f2; }

        .wc-badge {
          width:64px; height:64px; border-radius:50%;
          margin:0 auto 14px; display:grid; place-items:center; font-weight:700;
          border:1px solid rgba(0,0,0,.04);
        }
        .wc-card-title { margin:6px 0 8px; font-size:20px; font-weight:800; color:#0b1b33; }
        .wc-card-text { color:#5a6b86; line-height:1.65; margin:0; }
      `}</style>
    </section>
  );
};

export default ChooseUs;
