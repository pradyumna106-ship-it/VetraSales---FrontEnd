import { sendEmail,sendSMS } from "../services/mailService";
// 1. Welcome Email
export const sendWelcomeEmail = async (userData) => {
  return sendEmail({
    receiver: userData.email,
    subject: "Welcome to VETRA SALES! 🎉",
    body: `Welcome ${userData.name}!\n\nYour account has been created successfully.\nStart shopping now!`
  });
};

// 2. Order Confirmation  
export const sendOrderConfirmation = async (orderData) => {
  return sendEmail({
    receiver: orderData.email,
    subject: `Order #${orderData.orderId} Confirmed`,
    body: `Thank you for your order!\n\nOrder ID: ${orderData.orderId}\nTotal: $${orderData.totalAmount}\n\nWe'll notify you when it ships.`
  });
};

// 3. Payment Success
export const sendPaymentSuccessEmail = async (paymentData) => {
  return sendEmail({
    receiver: paymentData.receiver,
    subject: "Payment Successful - Order Placed!",
    body: `Payment received successfully!\n\nPayment ID: ${paymentData.paymentId}\nAmount: $${paymentData.amount}\n\nYour order is being processed.`
  });
};

export const sendWelcomeSms = async (userData) => {
  return sendSMS({
    phone: userData.phone,
    content: "Welcome to VETRA SALES! 🎉"+ "\n"+
    `Welcome ${userData.name}!\n\nYour account has been created successfully.\nStart shopping now!`
  });
};

// 2. Order Confirmation  
export const sendOrderConfirmationSms = async (orderData) => {
  return sendSMS({
    phone: orderData.phone,
    content: `Order #${orderData.orderId} Confirmed`+ "\n"+
      `Thank you for your order!\n\nOrder ID: ${orderData.orderId}\nTotal: $${orderData.totalAmount}\n\nWe'll notify you when it ships.`
  });
};

// 3. Payment Success
export const sendPaymentSuccessSms = async (paymentData) => {
  return sendSMS({
    phone: paymentData.phone,
    content: "Payment Successful - Order Placed!" + "\n"+
    `Payment received successfully!\n\nPayment ID: ${paymentData.paymentId}\nAmount: $${paymentData.amount}\n\nYour order is being processed.`
  });
};