import axios from 'axios';

const token = localStorage.getItem('token')
const header = {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}

const BASE_URL = "https://vetrasales-backend-production.up.railway.app"+"/api/product"
export const addProduct = (prod) => axios.post(`${BASE_URL}/addProduct`, prod,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
export const updateProduct = (prodDto) => axios.post(`${BASE_URL}/updateProduct`, prodDto,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}})
export const getProductById = async (productId) => {
  
    try {
      const res = await axios.get(`${BASE_URL}/searchProductById`, productId,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
      console.log("API response:", res.data); // 👈 DEBUG
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }

}
export const searchProduct = async (input) => {
  try {
    const res = await axios.get(`${BASE_URL}/searchProduct?keyword=${input}`,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
    console.log("API response:", res.data); // 👈 DEBUG
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }
}

export const getByAdmin = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/getByAdmin`,{params:{id}},{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
    console.log("API products:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }
}
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getAllProducts`,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
    console.log("API response:", res.data); // 👈 DEBUG
    return res.data; // ✅ THIS IS THE KEY FIX
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }
};

export const addReview = async (review) => {
  try {
    const res = await axios.post(`${BASE_URL}/addReview`, review,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
     console.log("API response:", res.data); // 👈 DEBUG
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }
}
export const deleteProduct = (productId) => axios.get(`${BASE_URL}/deleteProduct`,{params:{productId}},{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});

