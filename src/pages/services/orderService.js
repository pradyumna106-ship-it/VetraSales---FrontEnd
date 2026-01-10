import axios from 'axios';

const API = 'https://vetrasales-backend-production.up.railway.app/api/orders';
const token = localStorage.getItem('token')
export const placeOrder = (orderData) => 
  axios.post(`${API}/create`, orderData,{headers: getAuthHeaders()});

export const getOrdersByUserId = (userId) =>
  axios.get(`${API}/user/userId/${userId}`,{headers: getAuthHeaders()});

export const getOrdersByUsername = (username) =>
  axios.get(`${API}/delivered`,{params:{username}},{headers: getAuthHeaders()});

export const cancelOrder = (orderId) =>
  axios.put(`${API}/${orderId}/cancel`,{headers: getAuthHeaders()});

export const updateOrderStatus = (orderId, status) =>
  axios.put(`${API}/${orderId}/status?status=${status}`,{headers: getAuthHeaders()});

export const getAllOrders = () => axios.get(API,{headers: getAuthHeaders()});

export const getOrderById = (orderId) =>
  axios.get(`${API}/byId?orderId=${orderId}`,{headers: getAuthHeaders()});

export const getSummary = (username) => axios.get(`${API}/getSummary`,{params:{username}},{headers: getAuthHeaders()});



