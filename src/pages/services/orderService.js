import axios from 'axios';

const API = 'https://vetrasales-backend-production.up.railway.app/api/orders';
const token = localStorage.getItem('token')
export const placeOrder = (orderData) => 
  axios.post(`${API}/create`, orderData,{headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }});

export const getOrdersByUserId = (userId) =>
  axios.get(`${API}/user/userId/${userId}`,{headers: {"Authorization": `Bearer ${token}`}});

export const getOrdersByUsername = (username) =>
  axios.get(`${API}/delivered`,{params:{username}},{headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }});

export const cancelOrder = (orderId) =>
  axios.put(`${API}/${orderId}/cancel`,{headers: {"Authorization": `Bearer ${token}`}});

export const updateOrderStatus = (orderId, status) =>
  axios.put(`${API}/${orderId}/status?status=${status}`,{headers: {"Authorization": `Bearer ${token}`}});

export const getAllOrders = () => axios.get(API,{headers: {"Authorization": `Bearer ${token}`}});

export const getOrderById = (orderId) =>
  axios.get(`${API}/byId?orderId=${orderId}`,{headers: {"Authorization": `Bearer ${token}`}});

export const getSummary = (username) => axios.get(`${API}/getSummary`,{params:{username}},{headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }});



