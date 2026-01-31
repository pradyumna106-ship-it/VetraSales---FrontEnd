import axios from 'axios';

const API = 'https://kong-3d316d3c07inoh561.kongcloud.dev'+'/api/orders';
const token = localStorage.getItem('token')
const header = {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}
export const placeOrder = (orderData) => 
  axios.post(`${API}/create`, orderData,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});

export const getOrdersByUserId = (userId) =>
  axios.get(`${API}/user/userId/${userId}`,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});

export const getOrdersByUsername = (username) =>
  axios.get(`${API}/delivered`,{params:{username}},{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});

export const cancelOrder = (orderId) =>
  axios.put(`${API}/${orderId}/cancel`,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});

export const updateOrderStatus = (orderId, status) =>
  axios.put(`${API}/${orderId}/status?status=${status}`,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});

export const getAllOrders = () => axios.get(API,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});

export const getOrderById = (orderId) =>
  axios.get(`${API}/byId?orderId=${orderId}`,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});

export const getSummary = (username) => axios.get(`${API}/getSummary`,{params:{username}},{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});



