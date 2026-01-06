import axios from "axios";
import { placeOrder } from "./orderService";
import { sendOrderConfirmation,sendPaymentSuccessEmail,sendOrderConfirmationSms,sendPaymentSuccessSms } from "../notification/notification";
export const makePayment = async (totalAmount, onNavigate,request,phone,email) => {
  try {
    // ✅ Convert to paise
    const amountInPaise = Math.round(totalAmount * 100);

    if (amountInPaise > 10000000) {
      alert("❌ Order amount exceeds Razorpay limit of ₹1,00,000.");
      return;
    }

    // ✅ Create Razorpay order
    const { data: order } = await axios.post(
      "/create-order",
      null,
      { params: { amount: amountInPaise } }
    );

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_90lAmUtfOQvFlI",
      amount: order.amount,
      currency: order.currency,
      name: "Vetra Sales",
      description: "Test Transaction",
      order_id: order.id,

      handler: function (response) {
        alert(`✅ Payment successful: ${response.razorpay_payment_id}`);
        onNavigate("order-confirmation");
        placeOrder(request)
        sendPaymentSuccessEmail({
          email: email,
          paymentId: 1,
          amount: order.amount
        })
        sendOrderConfirmation({
          email: email,
          orderId: order.id,
          totalAmount: order.amount
        })
        sendPaymentSuccessSms({
          phone: phone,
          paymentId: 1,
          amount: order.amount
        })
        sendOrderConfirmationSms({
          phone: phone,
          orderId: order.id,
          totalAmount: order.amount
        })
      },

      prefill: {
        name: localStorage.getItem("username"),
        email: email,
      },

      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);

    razor.on("payment.failed", function (response) {
      console.error(response.error);
      alert(`❌ Payment failed: ${response.error.description}`);
    });

    razor.open();

  } catch (error) {
    console.error("Error in payment process:", error);
    alert("Failed to initiate payment");
  }
};
