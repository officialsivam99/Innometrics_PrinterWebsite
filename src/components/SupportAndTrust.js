
// src/components/SupportAndTrust.jsx
import React from "react";
import {
  FiPhone,
  FiMail,
  FiClock,
  FiUsers,
  FiArrowRight,
  FiShield,
  FiTruck,
  FiStar,
  FiSquare,
  FiHeart,
  FiInfo,
} from "react-icons/fi";

/**
 * Minimal, clean Support + Quick Links + Trust badges section
 * Props allow customizing text/links, but sensible defaults are provided.
 */
const SupportAndTrust = ({
  brand = "Print Mate Online",
  tagline = "Your trusted partner for fast Printer & Ink supplies delivery.",
  happyCopy = "500+ Happy Customers",
  happyNote = "Trusted nationwide",
  phone = "833-551-6033",
  email = "info@printmateonline.com",
  hours = "24/7 Support",
  onRoute = (href) => (window.location.href = href), // simple default router
}) => {
  const groups = [
    {
      title: "Shop",
      tone: "#0ea5e9",
      icon: <FiSquare size={18} />,
      links: [
          { label: "Home Printer", href: "/HomePrinter" },
          { label: "Ink, Toner & Paper", href: "/InkTonerPaper" },
          { label: "Office Printer", href: "/OfficePrinters" },
          { label: "InkJet Printer", href: "/InkJetPrinters" },
      ],
    },
    {
      title: "Support",
      tone: "#10b981",
      icon: <FiHeart size={18} />,
      links: [
        { label: "Order & Tracking", href: "/support/track" },
        { label: "Returns & Exchanges", href: "/support/returns" },
        { label: "Help Center", href: "/support/help" },
        { label: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "Company",
      tone: "#a855f7",
      icon: <FiInfo size={18} />,
      links: [
        { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Refund Policy", href: "/refund" },
      ],
    },
  ];

  const trust = [
    {
      icon: <FiShield />,
      title: "SSL Protected",
      desc: "256-bit encryption",
      hue: "#22c55e",
      bg: "rgba(34,197,94,.08)",
      border: "rgba(34,197,94,.25)",
    },
    {
      icon: <FiTruck />,
      title: "Fast Delivery",
      desc: "2-day shipping available",
      hue: "#3b82f6",
      bg: "rgba(59,130,246,.08)",
      border: "rgba(59,130,246,.25)",
    },
    {
      icon: <FiStar />,
      title: "Quality Assured",
      desc: "Manufacturer warranty",
      hue: "#f59e0b",
      bg: "rgba(245,158,11,.1)",
      border: "rgba(245,158,11,.25)",
    },
  ];

  return (
    <section className="st-wrap" aria-labelledby="st-title">
      <div className="st-container">
        {/* Top: Brand + Contacts */}
        <div className="st-top">
          <div className="st-brand">
            <h2 id="st-title" className="st-title">
              {brand}
            </h2>
            <p className="st-tagline">{tagline}</p>

            <div className="st-happy">
              <span className="st-badge">
                <FiUsers size={18} />
              </span>
              <div className="st-happy-text">
                <strong>{happyCopy}</strong>
                <small>{happyNote}</small>
              </div>
            </div>
          </div>

          <div className="st-contacts">
            <ContactCard
              icon={<FiPhone />}
              title="Call Us Direct"
              accent="#60a5fa"
              primary={
                <a href={`tel:${phone}`} className="st-link">
                  {phone}
                </a>
              }
              note="Quick phone support"
            />
            <ContactCard
              icon={<FiMail />}
              title="Email Support"
              accent="#34d399"
              primary={
                <a href={`mailto:${email}`} className="st-link" style={{ color: "#16a34a" }}>
                  {email}
                </a>
              }
              note="24hr response time"
            />
            <ContactCard
              icon={<FiClock />}
              title="Business Hours"
              accent="#c084fc"
              primary={<span style={{ color: "#8b5cf6", fontWeight: 700 }}>{hours}</span>}
              note="Ready to help"
            />
          </div>
        </div>

        <hr className="st-divider" />

        {/* Bottom: Link groups + trust badges */}
        <div className="st-bottom">
          <div className="st-groups">
            {groups.map((g) => (
              <div key={g.title} className="st-group">
                <div className="st-group-head" style={{ "--tone": g.tone }}>
                  <span className="st-group-icon">{g.icon}</span>
                  <h3>{g.title}</h3>
                </div>

                <nav className="st-links">
                  {g.links.map((l) => (
                    <button
                      key={l.label}
                      onClick={() => onRoute(l.href)}
                      className="st-link-btn"
                      aria-label={l.label}
                    >
                      <span>{l.label}</span>
                      <FiArrowRight />
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <aside className="st-trust">
            {trust.map((t) => (
              <div
                key={t.title}
                className="st-trust-card"
                style={{
                  background: t.bg,
                  borderColor: t.border,
                }}
              >
                <div
                  className="st-trust-icon"
                  style={{
                    color: t.hue,
                    background: "#fff",
                    borderColor: t.border,
                  }}
                >
                  {t.icon}
                </div>
                <div className="st-trust-text">
                  <div className="st-trust-title">{t.title}</div>
                  <div className="st-trust-desc">{t.desc}</div>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
  .st-wrap { background: #fafcff; padding: 48px 16px 56px; }
  .st-link-btn span { min-width: 160px; }
        .st-container { max-width: 1200px; margin: 0 auto; }

        .st-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 960px) {
          .st-top { grid-template-columns: 1fr 1.3fr; align-items: start; }
        }

        .st-brand .st-title {
          margin: 0;
          font-weight: 800;
          font-size: 32px;
          letter-spacing: .2px;
          background: linear-gradient(90deg, #6475ff, #8b5cf6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .st-tagline { color: #4b5b77; margin: 8px 0 16px; max-width: 520px; }

        .st-happy { display: flex; align-items: center; gap: 10px; }
        .st-badge {
          width: 36px; height: 36px; display: grid; place-items: center;
          background: #eef2ff; color: #6366f1; border-radius: 10px; border: 1px solid #e0e7ff;
        }
        .st-happy-text { display: grid; line-height: 1.2; }
        .st-happy-text small { color: #7c8aa5; }

        .st-contacts {
          display: grid; gap: 14px; grid-template-columns: 1fr;
        }
        @media (min-width: 680px) { .st-contacts { grid-template-columns: repeat(3, 1fr); } }

        .st-divider { border: none; border-top: 1px solid #e7ecf3; margin: 24px 0; }

        .st-bottom {
          display: grid; gap: 22px; grid-template-columns: 1fr;
        }
        @media (min-width: 960px) { .st-bottom { grid-template-columns: 2fr 1fr; } }

        .st-groups {
          display: grid; gap: 18px; grid-template-columns: 1fr;
        }
        @media (min-width: 960px) { .st-groups { grid-template-columns: repeat(3, 1fr); } }

        .st-group {
          background: #fff; border: 1px solid #e7ecf3; border-radius: 14px; padding: 16px;
          box-shadow: 0 10px 24px rgba(16,38,76,.05);
        }
        .st-group-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .st-group-head h3 { margin: 0; font-size: 18px; font-weight: 800; color: #0b1b33; }
        .st-group-icon {
          display: grid; place-items: center; width: 28px; height: 28px;
          color: var(--tone); background: rgba(0,0,0,.03); border-radius: 6px;
          border: 1px solid rgba(0,0,0,.05);
        }

        .st-links { display: grid; gap: 8px; margin-top: 8px; }
        .st-link-btn {
          width: 100%; background: #fff; border: 1px solid #e7ecf3; border-radius: 10px;
          display: flex; align-items: center; justify-content: flex-start; gap: 10px; text-align: left;
          padding: 12px 12px; font-weight: 600; color: #0f172a; cursor: pointer;
          transition: border-color .15s ease, transform .15s ease, background .15s ease;
        }
        .st-link-btn:hover { background: #f8fafc; border-color: #dfe7f2; transform: translateY(-2px); }
        .st-link-btn svg { opacity: .7; }

        .st-trust { display: grid; gap: 12px; }
        .st-trust-card {
          display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center;
          border-radius: 12px; border: 1px solid; padding: 12px;
        }
        .st-trust-icon {
          width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center;
          border: 1px solid; font-size: 18px;
        }
        .st-trust-title { font-weight: 800; color: #0b1b33; }
        .st-trust-desc { color: #62708a; font-size: 14px; }

        .st-link { text-decoration: none; color: #2563eb; font-weight: 700; }
        .st-link:hover { text-decoration: underline; }
      `}</style>
    </section>
  );
};

const ContactCard = ({ icon, title, primary, note, accent = "#60a5fa" }) => {
  return (
    <div
      className="st-contact"
      style={{
        background: "#fff",
        border: "1px solid #e7ecf3",
        borderRadius: 14,
        padding: 14,
        boxShadow: "0 10px 24px rgba(16,38,76,.05)",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: "rgba(0,0,0,.03)",
          border: "1px solid rgba(0,0,0,.06)",
          color: accent,
          display: "grid",
          placeItems: "center",
          fontSize: 18,
          marginBottom: 8,
        }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 800, color: "#0b1b33" }}>{title}</div>
      <div style={{ marginTop: 4 }}>{primary}</div>
      <div style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>{note}</div>
    </div>
  );
};

export default SupportAndTrust;
