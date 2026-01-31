import axios from "axios";
const BASE_URL = "vetrasales-backend-production.up.railway.app"+"/api";
const token = localStorage.getItem('token')
const header = {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}
export const addToCart = (cartData) =>
  axios.post(`${BASE_URL}/addToCart`, cartData, {
    headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}
  });

export const updateCartItem = (cartData) =>
  axios.post(`${BASE_URL}/updateCartItem`, cartData, {
    headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}
  });

export const viewCart = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/viewCart`, {
      params: { username },
      headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}
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
    headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}
  });
