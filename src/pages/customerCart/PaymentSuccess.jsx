import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data passed after payment
  const { orderId, paymentId, items, total } = location.state || {};
  const back = () => {
    navigate('/view_cart_page');
  };
  return (
    <div style={{ padding: "30px", color: "black", fontFamily: "Arial" }}>
      <button onClick={back}>Back</button>
      <h2>✅ Payment Successful!</h2>

      <p><b>Order ID:</b> {orderId}</p>
      <p><b>Status:</b> PAID</p>

      <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead style={{ background: "#1e3a8a", color: "white" }}>
          <tr>
            <th style={{ padding: "10px" }}>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {items?.map((item, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#d1fae5" : "#a7f3d0" }}>
              <td style={{ padding: "10px" }}>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "20px" }}>
        <b>Total Paid:</b> ₹{total}
      </h3>

      <button
        onClick={() => navigate("/customer_page")}
        style={{
          padding: "10px 20px",
          background: "#60a5fa",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          marginTop: "15px"
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}
