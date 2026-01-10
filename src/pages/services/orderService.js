import axios from 'axios';

const API = 'https://vetrasales-backend-production.up.railway.app/api/orders';
const token = localStorage.getItem('token')
const header = {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}
export const placeOrder = (orderData) => 
  axios.post(`${API}/create`, orderData,{headers: header});

export const getOrdersByUserId = (userId) =>
  axios.get(`${API}/user/userId/${userId}`,{headers: header});

export const getOrdersByUsername = (username) =>
  axios.get(`${API}/delivered`,{params:{username}},{headers: header});

export const cancelOrder = (orderId) =>
  axios.put(`${API}/${orderId}/cancel`,{headers: header});

export const updateOrderStatus = (orderId, status) =>
  axios.put(`${API}/${orderId}/status?status=${status}`,{headers: header});

export const getAllOrders = () => axios.get(API,{headers: header});

export const getOrderById = (orderId) =>
  axios.get(`${API}/byId?orderId=${orderId}`,{headers: header});

export const getSummary = (username) => axios.get(`${API}/getSummary`,{params:{username}},{headers: header});



