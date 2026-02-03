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
export const placeOrder = (orderData) => {
  try {
    const res = axios.post(`${API}/create`, orderData,{headers: getHeaders() });
    return res.data;
  } catch(error) {
    console.error(error);
  }
}

// export const getOrdersByUserId = async (userId) => {
//   try {
//      const res = axios.get(`${API}/user/userId/${userId}`,{headers: getHeaders() });
//      return res.data;
//   } catch(error){
//     console.error(error);
//   }
// }
  

export const getOrdersByUsername = async (username) => {
  try {
    const res = await axios.get(`${API}/delivered`,{params:{username}},{headers: getHeaders() });
    return res.data;
  } catch(error) {
    console.error(error);
  }
}
  

export const cancelOrder = async (orderId) =>
  { 
    try {
      const res = await axios.put(`${API}/${orderId}/cancel`,{headers: getHeaders() });
      return res.data;
    } catch (error) {
      console.error(error)
    }
     
  }

export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await axios.put(`${API}/${orderId}/status`,{params: { status }},{headers: getHeaders() });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
  

export const getAllOrders = async () => {
  try {
    const res = await axios.get(API,{headers: getHeaders() });
    return res.data;
  } catch(error) {
    console.error(error);
  }
}

export const getOrderById = async (orderId) =>{
  try {
    const res = await axios.get(`${API}/byId?orderId=${orderId}`,{headers: getHeaders() });
    return res.data;
  } catch(error) {
    console.error(error);
    
  }
}
  

export const getSummary = async (username) => {
  try {
    const res = await axios.get(`${API}/getSummary`,{params:{username}},{headers: getHeaders() });
    return res.data;
  } catch(error) {
    console.error(error);
    
  }
}



