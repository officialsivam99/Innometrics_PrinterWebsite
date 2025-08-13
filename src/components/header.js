import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const BLUE = "#245af0";
  const TEXT = "#111827";
  const MUTED = "#6b7280";
  const LINE = "#e5e7eb";

  const innerWrap = {
    maxWidth: 1220,
    margin: "0 auto",
    padding: "0 20px",
    width: "100%",
  };

  const medium = { fontWeight: 500 };

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* Top promo bar */}
      <div style={{ background: BLUE, color: "#fff", ...medium }}>
        <div
          className="d-flex align-items-center justify-content-between flex-wrap"
          style={{ ...innerWrap, height: 44, fontSize: 14 }}
        >
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <span>✓ Fast shipping on all orders</span>
            <span>✓ 30-day returns</span>
          </div>
          <div className="d-none d-md-flex align-items-center gap-2">
            <span>Support</span>
            📞
            <a
              href="tel:8335516033"
              className="text-white text-decoration-none"
              style={medium}
            >
              833-551-6033
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div style={{ background: "#fff" }}>
        <div
          className="d-flex align-items-center py-3"
          style={{ ...innerWrap, gap: 18, flexWrap: "wrap" }}
        >
          {/* Logo */}
          <a
            href="/"
            className="d-flex align-items-center justify-content-center"
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: BLUE,
              textDecoration: "none",
              color: "#fff",
              ...medium,
            }}
          >
            IPE
          </a>

          {/* Brand */}
          <div className="d-none d-md-block" style={{ marginRight: 10 }}>
            <div style={{ fontSize: 20, color: BLUE, ...medium }}>
              Ink & Paper Express
            </div>
            <div style={{ fontSize: 14, color: MUTED, ...medium }}>
              Fast Printer & Ink to Your Doorstep
            </div>
          </div>

          {/* Search */}
          <form
            className="d-flex align-items-center flex-grow-1 order-3 order-md-0 w-100 w-md-auto"
            style={{
              border: `1px solid ${LINE}`,
              borderRadius: 16,
              padding: "6px 14px",
              flex: "1 1 420px",
              minWidth: 0,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            🔍
            <input
              type="search"
              className="form-control border-0 ms-2"
              placeholder="Search for printers, ink, toner, paper..."
              style={{
                fontSize: 14,
                background: "transparent",
                boxShadow: "none",
                ...medium,
              }}
            />
          </form>

          {/* Actions */}
          <div className="d-flex align-items-center ms-md-3" style={{ gap: 16 }}>
            <button
              className="btn p-0 border-0 bg-transparent"
              style={{ fontSize: 18 }}
            >
              ♡
            </button>
            <button
              className="btn p-0 border-0 bg-transparent"
              style={{ fontSize: 18 }}
            >
              🛒
            </button>
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: TEXT,
                fontSize: 14,
                ...medium,
              }}
            >
              Sign In
            </a>
            <button
              className="border-0"
              style={{
                background: BLUE,
                color: "#fff",
                borderRadius: 10,
                padding: "6px 14px",
                fontSize: 14,
                ...medium,
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div
        style={{
          background: "#f7f8fb",
          borderTop: `1px solid ${LINE}`,
          borderBottom: `1px solid ${LINE}`,
        }}
      >
        <div style={{ ...innerWrap }}>
          <ul
            className="nav justify-content-center gap-4 py-2"
            style={{ fontSize: 14, ...medium }}
          >
            <li className="nav-item">
              <a className="nav-link text-dark p-0" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark p-0" href="#">
                Home Printer
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark p-0" href="#">
                Ink, Toner & Paper
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark p-0" href="#">
                Office Printer
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark p-0" href="#">
                Inkjet Printers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark p-0" href="#">
                Laser Printers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark p-0" href="#">
                More ▼
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
