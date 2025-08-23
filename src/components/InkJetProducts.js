// src/components/inkjetProducts.js
import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import CartDrawer from "./CartDrawer";
import { FiEye } from "react-icons/fi";

export let InkJetProducts = [
  {
    id: 1,
    title: "HP OfficeJet Pro 9015e All-in-One Printer",
    description:
      "Smart, fast, and efficient wireless color inkjet printer for home office and small business needs.",
    image:
      "https://hp.widen.net/content/abxnm7602o/webp/abxnm7602o.png?w=573&h=430&dpi=72&color=ffffff00",
    images: [
      "https://hp.widen.net/content/abxnm7602o/webp/abxnm7602o.png?w=573&h=430&dpi=72&color=ffffff00",
      "https://images.hp.com/is/image/hp/officejetpro-9015e-1?$large$",
      "https://images.hp.com/is/image/hp/officejetpro-9015e-2?$large$",
      "https://images.hp.com/is/image/hp/officejetpro-9015e-3?$large$",
      "https://images.hp.com/is/image/hp/officejetpro-9015e-4?$large$",
    ],
    price: 229.99,
    rating: 4.5,
    reviewsCount: 2100,
    category: "inkjet-printer",
    delivery: "2–4 business days delivery",
    highlights: [
      "Fast color prints for home office",
      "Auto 2-sided printing & scanning",
      "Robust ADF for multi-page jobs",
      "Wi-Fi + USB + Cloud print",
      "Low cost per page with XL cartridges",
    ],
    boxItems: [
      "OfficeJet Pro printer",
      "Setup cartridges",
      "Power cord",
      "USB cable",
      "Setup guide / documentation",
    ],
    specs: {
      "Print Technology": "Color Inkjet",
      "Max Print Resolution": "4800 × 1200 dpi",
      "Black Print Speed": "Up to 22 ppm",
      "Color Print Speed": "Up to 18 ppm",
      Scanner: "Flatbed + 35-sheet ADF",
      Connectivity: "Wi-Fi, Wi-Fi Direct, USB, Ethernet",
      "Mobile Print": "AirPrint, Mopria, HP Smart App",
      "Paper Handling": "250-sheet input, 60-sheet output",
      Duplex: "Auto (Print/Scan)",
      "Dimensions": "17.3 × 13.5 × 10.9 in",
      Weight: "20.3 lb",
    },
    compatibility: ["Windows 11/10", "macOS 12+", "ChromeOS", "iOS / Android"],
  },
  {
    id: 2,
    title: "HP DeskJet 2755e Wireless Color Inkjet Printer",
    description:
      "Affordable wireless color printer for everyday home printing, scanning, and copying needs.",
    image:
      "https://owp.klarna.com/product/640x640/3044149769/HP-DeskJet-4222e-All-in-One-Drucker.jpg?ph=true",
    images: [
      "https://owp.klarna.com/product/640x640/3044149769/HP-DeskJet-4222e-All-in-One-Drucker.jpg?ph=true",
      "https://images.hp.com/is/image/hp/deskjet-2755e-1?$large$",
      "https://images.hp.com/is/image/hp/deskjet-2755e-2?$large$",
    ],
    price: 84.99,
    rating: 4.3,
    reviewsCount: 1800,
    category: "inkjet-printer",
    delivery: "2–4 business days delivery",
    highlights: [
      "Budget-friendly color printing",
      "Flatbed scan & copy",
      "Wireless + mobile printing",
      "Compact and easy to set up",
      "Ideal for schoolwork & home docs",
    ],
    boxItems: [
      "All-in-One Printer",
      "Setup cartridges",
      "Power cord",
      "USB cable",
      "Setup guide / documentation",
    ],
    specs: {
      "Print Technology": "Color Inkjet",
      "Max Print Resolution": "4800 × 1200 dpi",
      "Black Print Speed": "Up to 7.5 ppm",
      "Color Print Speed": "Up to 5.5 ppm",
      Scanner: "Flatbed up to 1200 dpi",
      Connectivity: "Wi-Fi, Wi-Fi Direct, USB",
      "Mobile Print": "AirPrint, Mopria, HP Smart App",
      "Paper Handling": "60-sheet input, 25-sheet output",
      Duplex: "Manual",
      "Dimensions": "16.7 × 11.9 × 6.1 in",
      Weight: "7.5 lb",
    },
    compatibility: ["Windows 11/10", "macOS 12+", "ChromeOS", "iOS / Android"],
  },
  {
    id: 3,
    title: "HP ENVY Inspire 7955e All-in-One Printer",
    description:
      "Versatile and family-friendly inkjet printer designed for daily home use, with wireless and mobile printing.",
    image:
      "https://hp.widen.net/content/muwpvnq8dp/webp/muwpvnq8dp.png?w=573&h=430&dpi=72&color=ffffff00",
    images: [
      "https://hp.widen.net/content/muwpvnq8dp/webp/muwpvnq8dp.png?w=573&h=430&dpi=72&color=ffffff00",
      "https://images.hp.com/is/image/hp/envy-7955e-1?$large$",
      "https://images.hp.com/is/image/hp/envy-7955e-2?$large$",
    ],
    price: 159.99,
    rating: 4.4,
    reviewsCount: 200,
    category: "inkjet-printer",
    delivery: "2–4 business days delivery",
    highlights: [
      "All-in-One color inkjet for families",
      "Borderless photo printing",
      "Wireless + mobile printing",
      "Smart app guided setup",
      "Auto 2-sided printing",
    ],
    boxItems: [
      "All-in-One Printer",
      "Setup cartridges (Black & Color)",
      "Power cord",
      "USB cable",
      "Setup guide",
    ],
    specs: {
      "Print Technology": "Color Inkjet",
      "Max Print Resolution": "4800 × 1200 dpi",
      "Black Print Speed": "Up to 15 ppm",
      "Color Print Speed": "Up to 10 ppm",
      Scanner: "Flatbed up to 1200 dpi",
      Connectivity: "Wi-Fi, Wi-Fi Direct, USB",
      "Mobile Print": "AirPrint, Mopria, HP Smart App",
      "Paper Handling": "125-sheet input, 25-sheet output",
      Duplex: "Automatic (Print)",
      "Dimensions": "18.1 × 14.2 × 9.2 in",
      Weight: "15.1 lb",
    },
    compatibility: ["Windows 11/10", "macOS 12+", "ChromeOS", "iOS / Android"],
  },
];

export default function InkJetProductsPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);
  const [sort, setSort] = useState("name-asc");

  const sorted = InkJetProducts.sort((a, b) => {
    if (sort === "name-asc") {
      return a.title.localeCompare(b.title);
    }
    if (sort === "name-desc") {
      return b.title.localeCompare(a.title);
    }
    if (sort === "price-asc") {
      return a.price - b.price;
    }
    if (sort === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });

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
    <div style={{ background: "#f6f8fb" }}>
      <div className="py-4 text-center">
        <h1 className="fw-bold">Inkjet Printers</h1>
        <p className="text-muted">
          Explore our range of inkjet printers, perfect for home and office use.
        </p>
      </div>
      <Row className="g-4">
        {sorted.map((p) => (
          <Col key={p.id} xs={12} sm={6} lg={4} xl={3}>
            <Card
              style={{
                borderRadius: 14,
                border: "1px solid #e7ecf3",
                background: "#fff",
                boxShadow: "0 6px 18px rgba(16,38,76,.06)",
                height: "100%",
                display: "flex",
              }}
            >
              <div style={{ position: "relative", paddingTop: "100%" }}>
                <Card.Img
                  variant="top"
                  src={p.image}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    objectFit: "contain",
                    borderRadius: "14px 14px 0 0",
                  }}
                />
              </div>
              <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                <Card.Title className="fw-bold" style={{ fontSize: "1.125rem" }}>
                  {p.title}
                </Card.Title>
                <Card.Text className="text-muted" style={{ flexGrow: 1 }}>
                  {p.description}
                </Card.Text>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fw-bold" style={{ fontSize: "1.125rem" }}>
                      ${p.price.toFixed(2)}
                    </span>
                    <span className="text-muted" style={{ fontSize: "0.875rem" }}>
                      {" "}
                      - {p.rating} ({p.reviewsCount} reviews)
                    </span>
                  </div>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(p);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <CartDrawer
        show={cartOpen}
        onHide={() => setCartOpen(false)}
        cartItems={cartItems}
        onCheckout={() => alert("Proceeding to checkout...")}
      />
    </div>
  );
}
