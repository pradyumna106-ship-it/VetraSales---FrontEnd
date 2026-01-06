import axios from 'axios';

const API = 'https://vetrasales-backend-production.up.railway.app/api/orders';

export const placeOrder = (orderData) => 
  axios.post(`${API}/create`, orderData,{headers: { "Content-Type": "application/json" }});

export const getOrdersByUserId = (userId) =>
  axios.get(`${API}/user/userId/${userId}`);

export const getOrdersByUsername = (username) =>
  axios.get(`${API}/delivered`,{params:{username}},{headers: { "Content-Type": "application/json" }});

export const cancelOrder = (orderId) =>
  axios.put(`${API}/${orderId}/cancel`);

export const updateOrderStatus = (orderId, status) =>
  axios.put(`${API}/${orderId}/status?status=${status}`);

export const getAllOrders = () => axios.get(API);

export const getOrderById = (orderId) =>
  axios.get(`${API}/byId?orderId=${orderId}`);

export const getSummary = (username) => axios.get(`${API}/getSummary`,{params:{username}},{headers: { "Content-Type": "application/json" }});



