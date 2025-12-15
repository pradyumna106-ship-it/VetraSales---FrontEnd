import axios from "axios";

const BASE_URL = "https://vetrasales-notification-service-production.up.railway.app/api/notification";

// -----------------------
//  SEND EMAIL
// -----------------------
export const sendEmail = async (mailData) => {
  try {
    const response = await axios.post(`${BASE_URL}/email`, mailData);
    return response.data; // "Email sent successfully!"
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// -----------------------
//  SEND SMS
// -----------------------
export const sendSMS = async (smsData) => {
  try {
    const response = await axios.post(`${BASE_URL}/sms`, smsData);
    return response.data; // "SMS sent!"
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};
