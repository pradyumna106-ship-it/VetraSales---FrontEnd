import axios from "axios";

const BASE_URL = "https://vetrasales-backend-production.up.railway.app/api/product"
export const addProduct = (productData) => axios.post(`${BASE_URL}/addProduct`, productData,{headers: { "Content-Type": "application/json" }});
export const updateProduct = (productData) => axios.post(`${BASE_URL}/updateProduct`, productData,{headers: { "Content-Type": "application/json" }})
export const getProductById = (productId) => axios.get(`${BASE_URL}/searchProductById`, productId,{headers: { "Content-Type": "application/json" }});
export const searchProduct = (input) => axios.get(`${BASE_URL}/searchProduct?keyword=${input}`,{headers: { "Content-Type": "application/json" }});
export const getAllProducts =()=> axios.get(`${BASE_URL}/getAllProducts`,{headers: { "Content-Type": "application/json" }});
export const addReview = (review) => axios.post(`${BASE_URL}/addReview`, review,{headers: { "Content-Type": "application/json" }});
export const deleteProduct = (productId) => axios.get(`${BASE_URL}/deleteProduct`,productId,{headers: { "Content-Type": "application/json" }});
