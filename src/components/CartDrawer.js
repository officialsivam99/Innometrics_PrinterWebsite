import React from "react";
import { Offcanvas, Button, ListGroup, Image } from "react-bootstrap";

export default function CartDrawer({ show, onHide, cartItems, onCheckout }) {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" backdrop={true}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Added to Cart!</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <ListGroup.Item key={idx} className="d-flex align-items-center gap-3">
                <Image src={item.image} alt={item.title} width={60} height={40} rounded />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{item.title}</div>
                  <div style={{ color: "#6b7280" }}>${item.price.toFixed(2)} &nbsp; Qty: {item.qty}</div>
                  <div style={{ color: "#22c55e" }}>✓ Fast shipping available</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <hr />
        <div className="mb-3">
          <div>Subtotal: <strong>${cartItems.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}</strong></div>
          <div>Shipping: <span style={{ color: '#3b82f6' }}>Calculated</span></div>
          <div>Total: <strong>${cartItems.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2)}</strong></div>
        </div>
        <Button variant="primary" className="w-100 mb-2" onClick={onCheckout}>Proceed to Checkout</Button>
        <Button variant="outline-secondary" className="w-100" onClick={onHide}>Continue Shopping</Button>
        <div className="mt-4" style={{ color: '#22c55e' }}>
          <div>✓ Secure checkout guaranteed</div>
          <div>✓ 30-day easy returns</div>
          <div>✓ Fast & reliable shipping</div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
