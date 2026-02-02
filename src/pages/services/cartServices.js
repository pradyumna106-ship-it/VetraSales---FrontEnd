import axios from "axios";
const BASE_URL = "https://vetrasales-backend-production.up.railway.app"+"/api";
const getHeaders = () => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
export const addToCart = (cartData) =>
  axios.post(`${BASE_URL}/addToCart`, cartData, {
    headers: getHeaders() 
  });

export const updateCartItem = (cartData) =>
  axios.post(`${BASE_URL}/updateCartItem`, cartData, {
    headers: getHeaders() 
  });

export const viewCart = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/viewCart`, {
      params: { username },
      headers: getHeaders() 
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const removeItem = (prod_id) =>
  axios.get(`${BASE_URL}/removeItem`, {
    params: { prod_id },
    headers: getHeaders() 
  });
