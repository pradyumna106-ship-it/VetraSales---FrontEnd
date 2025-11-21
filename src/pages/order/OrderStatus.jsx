import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService";

export default function OrderStatus() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(orderId).then(res => {
      setOrder(res.data);
    });
  }, [orderId]);

  if (!order) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Status</h2>
      <p><b>Order ID:</b> {order.id}</p>
      <p><b>Status:</b> {order.status}</p>
      <p><b>Total:</b> ₹{order.total}</p>

      <h3>Items</h3>
      <ul>
        {order.items.map((i, idx) => (
          <li key={idx}>{i.productName} × {i.quantity}</li>
        ))}
      </ul>
    </div>
  );
}
