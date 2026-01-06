import axios from "axios";

const BASE_URL = "https://vetrasales-backend-production.up.railway.app/api";

export const addToCart = (cartData) =>
  axios.post(`${BASE_URL}/addToCart`, cartData, {
    headers: { "Content-Type": "application/json" },
  });

export const updateCartItem = (cartData) =>
  axios.post(`${BASE_URL}/updateCartItem`, cartData, {
    headers: { "Content-Type": "application/json" },
  });

export const viewCart = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/viewCart`, {
      params: { username },
      headers: { "Content-Type": "application/json" },
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
    headers: { "Content-Type": "application/json" },
  });
