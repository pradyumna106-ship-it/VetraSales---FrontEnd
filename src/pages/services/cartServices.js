import axios from "axios";

const BASE_URL = "https://vetrasales-backend-production.up.railway.app/api";
export const addToCart = (cartData) => axios.post(`${BASE_URL}/addToCart`,cartData,{headers: { "Content-Type": "application/json" }});
export const updateCartItem = (cartData) => axios.post(`${BASE_URL}/updateCartItem`,cartData,{headers: { "Content-Type": "application/json" }});
export const viewCart = (username) => axios.get(`${BASE_URL}/viewCart`,username,{headers: { "Content-Type": "application/json" }});
export const removeItem = (prod_id) => axios.get(`${BASE_URL}/removeItem`,prod_id,{headers: { "Content-Type": "application/json" }});