import axios from "axios";

const BASE_URL = "https://vetrasales-backend-production.up.railway.app/api/user";

export const getAllUser = async ()=>{
    try {
        const res = await axios.get(`${BASE_URL}/getAllUser`,{headers: { "Content-Type": "application/json" }});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
    
}

export const getAllCustomer = async ()=>{
    try {
        const res = await axios.get(`${BASE_URL}/getAllCustomer`,{headers: { "Content-Type": "application/json" }});
        return res.data
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
    
}

export const getAllAdmin = async ()=>{
    try {
        const res = await axios.get(`${BASE_URL}/getAllAdmin`,{headers: { "Content-Type": "application/json" }});
        return res.data
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
    
}
export const searchUser = async (name) => {
    try {
        const res = await axios.get(`${BASE_URL}/searchUser`,{param:{name}},{headers: { "Content-Type": "application/json" }});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
    

}
export const deleteUser = (id) => {
  return axios.get(`${BASE_URL}/delete`, {
    params: { id }
  },{headers: { "Content-Type": "application/json" }});
};

export const signUp = (user) =>
  axios.post(`${BASE_URL}/signUp`, user, {
    headers: { "Content-Type": "application/json" },
  });

export const signIn = (login) => axios.post(`${BASE_URL}/signIn`,login,{headers: { "Content-Type": "application/json" }});
export const userData = async (username) => {
    try {
        const res = await axios.get(`${BASE_URL}/userData`,{
        params: { username },   // ✅ REQUIRED
      },{headers: { "Content-Type": "application/json" }});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
}

export const contact = async (username) => {
    try {
        const res = await axios.get(`${BASE_URL}/getEmail`,{
        params: { username },   // ✅ REQUIRED
      },{headers: { "Content-Type": "application/json" }});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
}
export const deleteAll = () => axios.get(`${BASE_URL}/deleteAll`,{headers: { "Content-Type": "application/json" }});
export const updateUser = (user) => axios.post(`${BASE_URL}/updateUser`,user,{headers: { "Content-Type": "application/json" }});
export const emails = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/emails`,{headers: { "Content-Type": "application/json" }});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data;
        } catch (error) {
            console.error("Error fetching products:", error);
        return []; // prevent undefined
    }
}
export const phones = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/phones`,{headers: { "Content-Type": "application/json" }});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
}

export const toggleStatus = (id) =>
  axios.get(`${BASE_URL}/userStatus`, {
    params: { id },
    headers: { "Content-Type": "application/json" }
  });
