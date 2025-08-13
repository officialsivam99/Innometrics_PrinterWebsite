import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => {
  // === replace with your two hero images ===
  const slides = [
    "https://images.unsplash.com/photo-1587307307189-0354b351e9e1?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1664298787350-7f9785603c7e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goTo = (i) => setIndex(i);

  const start = () => {
    stop();
    timerRef.current = setInterval(next, 5000);
  };
  const stop = () => timerRef.current && clearInterval(timerRef.current);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* ====== SLIDES (hero) ====== */}
      <section
        onMouseEnter={stop}
        onMouseLeave={start}
        style={{
          position: "relative",
          width: "100%",
          height: "80vh",
          overflow: "hidden",
        }}
      >
        {/* Slides */}
        <div style={{ position: "absolute", inset: 0 }}>
          {slides.map((src, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "opacity 800ms ease",
                opacity: i === index ? 1 : 0,
              }}
            />
          ))}
          {/* dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(rgba(0,0,0,.45), rgba(0,0,0,.45))",
            }}
          />
        </div>

        {/* Centered content */}
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center"
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            color: "#fff",
            padding: "0 16px",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              lineHeight: 1.1,
              fontWeight: 800,
              marginBottom: 16,
            }}
          >
            Complete Office Solutions
          </h1>

          <h2 style={{ fontSize: "32px", fontWeight: 600, marginBottom: 16 }}>
            Professional Printing Solutions
          </h2>

          <p
            style={{
              maxWidth: 980,
              fontSize: "22px",
              lineHeight: 1.5,
              fontWeight: 500,
              marginBottom: 28,
            }}
          >
            Discover the latest OfficeJet Pro printers with wireless connectivity,
            mobile printing, and ultra-high quality output for your business
            needs.
          </p>

          <button
            className="btn"
            style={{
              background: "#ffffff",
              color: "#111827",
              borderRadius: 10,
              padding: "12px 22px",
              fontWeight: 700,
              boxShadow: "0 6px 12px rgba(0,0,0,.2)",
            }}
          >
            Explore Pro Series
          </button>
        </div>

        {/* Arrows */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          style={{
            position: "absolute",
            top: "50%",
            left: 16,
            transform: "translateY(-50%)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: 0,
            background: "rgba(255,255,255,.35)",
            color: "#fff",
            fontSize: 28,
            lineHeight: 1,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            zIndex: 3,
          }}
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          style={{
            position: "absolute",
            top: "50%",
            right: 16,
            transform: "translateY(-50%)",
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: 0,
            background: "rgba(255,255,255,.35)",
            color: "#fff",
            fontSize: 28,
            lineHeight: 1,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            zIndex: 3,
          }}
        >
          ›
        </button>

        {/* Dots */}
        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            zIndex: 3,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: 0,
                background: i === index ? "#fff" : "rgba(255,255,255,.6)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </section>

      {/* ====== BLUE PROMO (inside Hero) ====== */}
      <section
        style={{
          background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
          color: "#fff",
          textAlign: "center",
          padding: "64px 20px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 44, fontWeight: 800, marginBottom: 18 }}>
            Best Printer for Home &amp; Office
          </h2>

          <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 28 }}>
            Whether you're printing family photos at home or handling daily business
            documents, we've got the HP printers and supplies you need. From wireless
            home models to heavy-duty office machines, plus all the ink and paper to
            keep them running smoothly.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3">
            <button
              className="btn"
              style={{
                background: "#fff",
                color: "#2563eb",
                fontWeight: 600,
                borderRadius: 8,
                padding: "12px 20px",
                minWidth: 220,
              }}
            >
              Shop Home Printers
            </button>
            <button
              className="btn"
              style={{
                background: "#fff",
                color: "#2563eb",
                fontWeight: 600,
                borderRadius: 8,
                padding: "12px 20px",
                minWidth: 220,
              }}
            >
              Browse Office Solutions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
