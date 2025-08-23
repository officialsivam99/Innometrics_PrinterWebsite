import React, { useState } from "react";
import { Button, Form, Card, ProgressBar, Alert } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaShoppingCart, FaTruck, FaCreditCard, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const steps = [
  { label: "Cart Review", icon: <FaShoppingCart /> },
  { label: "Shipping Details", icon: <FaTruck /> },
  { label: "Payment Method", icon: <FaCreditCard /> },
  { label: "Order Summary", icon: <FaClipboardList /> },
  { label: "Order Confirmation", icon: <FaCheckCircle /> }
];

export default function CheckoutSteps({ cartItems, onOrderPlaced }) {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({ name: "", address: "", phone: "", pincode: "", type: "Home" });
  const [payment, setPayment] = useState("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Helper: Price breakdown
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingFee = subtotal > 999 ? 0 : 49;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + shippingFee + tax;

  // Helper: Delivery estimate
  const deliveryEstimate = shipping.pincode ? `Delivery by ${['2-4','3-5','4-6'][Number(shipping.pincode.slice(-1))%3]} days` : "Enter PIN for estimate";
  const Stepper = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
      {steps.map((s, idx) => (
        <React.Fragment key={s.label}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: idx === step ? "#245af0" : "#e5e7eb",
                color: idx === step ? "#fff" : "#245af0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                margin: "0 auto 6px",
                boxShadow: idx === step ? "0 2px 8px rgba(36,90,240,0.12)" : "none",
                border: idx < step ? "2px solid #22c55e" : "2px solid #e5e7eb",
                transition: "all .2s"
              }}
            >
              {s.icon}
            </div>
            <div style={{ fontSize: 13, color: idx === step ? "#245af0" : "#64748b", fontWeight: idx === step ? 700 : 500 }}>
              {s.label}
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div style={{ width: 40, height: 2, background: idx < step ? "#22c55e" : "#e5e7eb", margin: "0 4px" }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Step 1: Cart Review
  const CartReview = () => (
    <Card className="mb-4 shadow-sm">
      <Card.Header style={{ background: '#f7f8fb', fontWeight: 700, fontSize: 18 }}>Cart Review</Card.Header>
      <Card.Body>
        {cartItems.length === 0 ? (
          <Alert variant="info">Your cart is empty.</Alert>
        ) : (
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={item.image} alt={item.title} style={{ width: 48, height: 32, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
                  <span style={{ fontWeight: 600 }}>{item.title}</span>
                </div>
                <span style={{ fontWeight: 500 }}>x{item.qty}</span>
                <span style={{ fontWeight: 700, color: '#245af0' }}>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <Button variant="primary" onClick={() => setStep(step + 1)} disabled={cartItems.length === 0} className="w-100">
          Continue to Shipping
        </Button>
      </Card.Body>
    </Card>
  );

  // Step 2: Shipping Details
  const ShippingDetails = () => (
    <Card className="mb-4 shadow-sm">
      <Card.Header style={{ background: '#f7f8fb', fontWeight: 700, fontSize: 18 }}>Shipping Details</Card.Header>
      <Card.Body>
        <Form autoComplete="off">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={shipping.name}
              onChange={e => setShipping(s => ({ ...s, name: e.target.value }))}
              placeholder="Full Name"
              autoFocus={false}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={shipping.address}
              onChange={e => setShipping(s => ({ ...s, address: e.target.value }))}
              placeholder="Delivery Address"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              value={shipping.phone}
              onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))}
              placeholder="Mobile Number"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>PIN Code</Form.Label>
            <Form.Control
              type="text"
              value={shipping.pincode}
              onChange={e => setShipping(s => ({ ...s, pincode: e.target.value.replace(/\D/g,"").slice(0,6) }))}
              placeholder="6-digit PIN"
            />
            <div style={{ color: '#22c55e', fontSize: 13, marginTop: 4 }}>{deliveryEstimate}</div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address Type</Form.Label>
            <Form.Select value={shipping.type} onChange={e => setShipping(s => ({ ...s, type: e.target.value }))}>
              <option>Home</option>
              <option>Work</option>
              <option>Other</option>
            </Form.Select>
          </Form.Group>
        </Form>
        <div className="mb-3" style={{ color: '#64748b', fontSize: 13 }}>
          <span>Shipping options: </span>
          <span style={{ color: '#245af0', fontWeight: 600 }}>Standard (Free over ₹999), Express (+₹99)</span>
        </div>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            if (!shipping.name.trim() || !shipping.address.trim() || !shipping.phone.trim() || !shipping.pincode.trim()) {
              setError("Please fill all shipping details.");
              return;
            }
            setError("");
            setStep((prev) => prev + 1);
          }}
          className="w-100"
        >
          Continue to Payment
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Card.Body>
    </Card>
  );

  // Step 3: Payment Method
  const PaymentMethod = () => (
    <Card className="mb-4 shadow-sm">
      <Card.Header style={{ background: '#f7f8fb', fontWeight: 700, fontSize: 18 }}>Payment Method</Card.Header>
      <Card.Body>
        <Form>
          <Form.Check
            type="radio"
            label={<span><FaCreditCard style={{ marginRight: 8, color: '#245af0' }} />Cash on Delivery (COD)</span>}
            name="payment"
            checked={payment === "COD"}
            onChange={() => setPayment("COD")}
          />
          <Form.Check
            type="radio"
            label={<span><FaCreditCard style={{ marginRight: 8, color: '#245af0' }} />UPI / Net Banking <span style={{ color: '#64748b' }}>(Coming Soon)</span></span>}
            name="payment"
            checked={payment === "UPI"}
            onChange={() => setPayment("UPI")}
            disabled
          />
        </Form>
        <Button variant="primary" onClick={() => setStep(step + 1)} className="w-100">
          Continue to Order Summary
        </Button>
      </Card.Body>
    </Card>
  );

  // Step 4: Order Summary
  const OrderSummary = () => (
    <Card className="mb-4 shadow-sm">
      <Card.Header style={{ background: '#f7f8fb', fontWeight: 700, fontSize: 18 }}>Order Summary</Card.Header>
      <Card.Body>
        <div className="mb-3">
          <strong>Shipping To:</strong>
          <div style={{ color: '#245af0', fontWeight: 600 }}>{shipping.name}, {shipping.address}, {shipping.phone}, {shipping.pincode} ({shipping.type})</div>
        </div>
        <div className="mb-3">
          <strong>Payment:</strong> <span style={{ color: '#22c55e', fontWeight: 600 }}>{payment}</span>
        </div>
        <div className="mb-3">
          <strong>Delivery Estimate:</strong> <span style={{ color: '#10b981', fontWeight: 600 }}>{deliveryEstimate}</span>
        </div>
        <ul className="list-group mb-3">
          {cartItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <OverlayTrigger placement="top" overlay={<Tooltip>{item.title}</Tooltip>}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={item.image} alt={item.title} style={{ width: 36, height: 24, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
                  <span style={{ fontWeight: 600 }}>{item.title}</span>
                </div>
              </OverlayTrigger>
              <span style={{ fontWeight: 500 }}>x{item.qty}</span>
              <span style={{ fontWeight: 700, color: '#245af0' }}>${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mb-3 p-3" style={{ background: '#f7f8fb', borderRadius: 8 }}>
          <div className="d-flex justify-content-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="d-flex justify-content-between"><span>Shipping</span><span>{shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}</span></div>
          <div className="d-flex justify-content-between"><span>Tax (12%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="d-flex justify-content-between fw-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
        <div className="mb-2" style={{ color: '#64748b', fontSize: 13 }}>
          <span>Seller: </span><span style={{ color: '#245af0', fontWeight: 600 }}>Print Mate Online</span>
          <span className="ms-2">| Support: <a href="tel:8335516033" style={{ color: '#22c55e', textDecoration: 'none' }}>833-551-6033</a></span>
        </div>
        <Button variant="success" onClick={() => {
          setOrderPlaced(true);
          setStep(step + 1);
          if (onOrderPlaced) onOrderPlaced({ shipping, payment, cartItems });
        }} className="w-100">
          Place Order
        </Button>
      </Card.Body>
    </Card>
  );

  // Step 5: Order Confirmation
  const OrderConfirmation = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px rgba(16,38,76,.12)', padding: '48px 32px', maxWidth: 420, textAlign: 'center' }}>
        <FaCheckCircle size={64} color="#22c55e" className="mb-3" />
        <h2 className="mb-3" style={{ color: '#245af0', fontWeight: 800 }}>Order Placed Successfully!</h2>
        <p style={{ color: '#64748b', fontSize: 18 }}>Thank you for shopping with Print Mate Online.<br />Your order ID is <span style={{ color: '#245af0', fontWeight: 700 }}>PMO{Math.floor(Math.random()*1000000)}</span></p>
        <div className="mb-3" style={{ color: '#10b981', fontSize: 15, fontWeight: 600 }}>
          You will receive a confirmation call and email soon.<br />For help, call <a href="tel:8335516033" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 700 }}>833-551-6033</a>
        </div>
        <Button variant="primary" size="lg" onClick={() => window.location.href = "/"} className="mt-2">
          Continue Shopping
        </Button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 0" }}>
      <Stepper />
      {step === 0 && <CartReview />}
      {step === 1 && <ShippingDetails />}
      {step === 2 && <PaymentMethod />}
      {step === 3 && <OrderSummary />}
      {step === 4 && <OrderConfirmation />}
    </div>
  );
}
