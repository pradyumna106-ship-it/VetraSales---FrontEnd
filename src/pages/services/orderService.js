import axios from 'axios';

const API = 'https://vetrasales-backend-production.up.railway.app'+'/api/orders';
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
export const placeOrder = (orderData) => 
  axios.post(`${API}/create`, orderData,{headers: getHeaders() });

export const getOrdersByUserId = (userId) =>
  axios.get(`${API}/user/userId/${userId}`,{headers: getHeaders() });

export const getOrdersByUsername = (username) =>
  axios.get(`${API}/delivered`,{params:{username}},{headers: getHeaders() });

export const cancelOrder = (orderId) =>
  axios.put(`${API}/${orderId}/cancel`,{headers: getHeaders() });

export const updateOrderStatus = (orderId, status) =>
  axios.put(`${API}/${orderId}/status?status=${status}`,{headers: getHeaders() });

export const getAllOrders = () => axios.get(API,{headers: getHeaders() });

export const getOrderById = (orderId) =>
  axios.get(`${API}/byId?orderId=${orderId}`,{headers: getHeaders() });

export const getSummary = (username) => axios.get(`${API}/getSummary`,{params:{username}},{headers: getHeaders() });



