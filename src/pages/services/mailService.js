import axios from "axios";

const BASE_URL = "https://kong-3d316d3c07inoh561.kongcloud.dev"+"/api/notification";

// -----------------------
//  SEND EMAIL
// -----------------------
// Updated email payload format for your API
export const sendEmail = async (mailData) => {
  try {
    // Transform data to match your API structure
    const payload = {
      receiver: mailData.receiver,  // "user@example.com"
      subject: mailData.subject,
      body: mailData.body,        // Plain text or HTML
    };
    
    const response = await axios.post(`${BASE_URL}/email`, payload,{headers: { "Content-Type": "application/json" }});
    return response.data;
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
    const payload = {
      phoneNo: smsData.phoneNo,  // "user@example.com"
      content: smsData.content,
    };
    const response = await axios.post(`${BASE_URL}/sms`, payload,{headers: { "Content-Type": "application/json" }});
    return response.data; // "SMS sent!"
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};
