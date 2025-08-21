// src/components/LegalFooter.jsx
import React from "react";
import { FiAlertTriangle, FiMapPin } from "react-icons/fi";

const LegalFooter = ({
  company = "Ink & Paper Express",
  year = new Date().getFullYear(),
  address = "1207 Delaware Ave, Suite 3137, Wilmington, DE 19806, United States",
}) => {
  return (
    <section className="lf-wrap" aria-labelledby="legal-title">
      <div className="lf-container">
        {/* Disclaimer card */}
        <article className="lf-card">
          <header className="lf-card-head">
            <span className="lf-icon">
              <FiAlertTriangle />
            </span>
            <h3 id="legal-title">Important Legal Disclaimer</h3>
          </header>

          <div className="lf-grid">
            <p>
              <strong>{company}</strong> is an independent e-commerce retailer.
              We are not affiliated with, endorsed by, or sponsored by HP Inc. or
              any printer manufacturer. We are not an authorized dealer or
              official representative of HP Inc.
              <br />
              <br />
              All product names, logos, and brands mentioned on this website are
              property of their respective owners. Any reference to these names,
              logos, and brands does not imply endorsement.
            </p>

            <p>
              Products sold through our platform are sourced from distributors
              and come with manufacturer warranties. We provide independent retail
              services and customer support.
              <br />
              <br />
              HP, the HP logo, and all related marks are trademarks of HP Inc.
              All trademarks are property of their respective owners.
            </p>
          </div>
        </article>

        {/* Copyright + address */}
        <div className="lf-line" />
        <div className="lf-copy">
          <div>© {year} {company}. All rights reserved.</div>
          <div className="lf-address">
            <FiMapPin />
            <span>{address}</span>
            <span className="lf-dot">•</span>
            <span>Products sourced from distributors</span>
            <span className="lf-dot">•</span>
            <span>Independent retail services</span>
          </div>
        </div>
        <div className="lf-line" />

        {/* Notices */}
        <div className="lf-notes">
          <p>
            <strong>Important Notice:</strong> Product availability, pricing,
            delivery times, and specifications subject to change. Please verify
            current information before purchase. Warranty terms provided by
            manufacturers may vary.
          </p>
          <p>
            Delivery times are estimates and may vary by location, product
            availability, and shipping method. Express delivery options available
            in select service areas only. Price matching and discounts subject to
            verification.
          </p>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .lf-wrap { background:#f7f9fc; padding:28px 16px 36px; }
        .lf-container { max-width:1200px; margin:0 auto; }

        .lf-card {
          background:#fff8ed;
          border:1px solid #facc15;
          border-radius:14px;
          padding:18px 18px 16px;
          box-shadow:0 10px 22px rgba(161,98,7,.08);
        }
        .lf-card-head { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
        .lf-card-head h3 { margin:0; color:#6b4007; font-weight:800; font-size:18px; }
        .lf-icon {
          width:28px; height:28px; border-radius:50%;
          display:grid; place-items:center;
          background:#fde68a; color:#b45309; border:1px solid #f59e0b;
        }

        .lf-grid {
          display:grid; gap:14px; color:#7a4a0a;
          grid-template-columns:1fr;
        }
        @media (min-width: 900px) { .lf-grid { grid-template-columns:1fr 1fr; } }
        .lf-grid p { margin:0; line-height:1.7; }

        .lf-line { border-top:1px solid #e6edf5; margin:18px 0; }

        .lf-copy { color:#0b1b33; display:grid; gap:10px; }
        .lf-address {
          display:flex; flex-wrap:wrap; align-items:center; gap:8px;
          color:#495a75;
        }
        .lf-address svg { opacity:.8; }
        .lf-dot { opacity:.6; margin:0 4px; }

        .lf-notes { color:#54657f; }
        .lf-notes p { margin:8px 0; line-height:1.7; }
      `}</style>
    </section>
  );
};

export default LegalFooter;
