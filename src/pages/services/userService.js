import axios from "axios";

const BASE_URL = "https://vetrasales-backend-production.up.railway.app/api/user";
const token = localStorage.getItem('token')
export const getAllUser = async ()=>{
    try {
        const res = await axios.get(`${BASE_URL}/getAllUser`,{headers: getAuthHeaders()});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
    
}

export const getAllCustomer = async ()=>{
    try {
        const res = await axios.get(`${BASE_URL}/getAllCustomer`,{headers: getAuthHeaders()});
        return res.data
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
    
}

export const getAllAdmin = async ()=>{
    try {
        const res = await axios.get(`${BASE_URL}/getAllAdmin`,{headers: getAuthHeaders()});
        return res.data
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
    
}
export const searchUser = async (name) => {
    try {
        const res = await axios.get(`${BASE_URL}/searchUser`,{param:{name}},{headers: getAuthHeaders()});
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
  },{headers: getAuthHeaders()});
};

export const signUp = (user) =>
  axios.post(`${BASE_URL}/signUp`, user, {
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
  });

export const signIn = async (login) => {
    try {
      const res = await axios.post(`${BASE_URL}/signIn`,login,{headers: getAuthHeaders()});
      console.log(res.data)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }
export const userData = async (username) => {
    try {
        const res = await axios.get(`${BASE_URL}/userData`,{
        params: { username },   // ✅ REQUIRED
      },{headers: getAuthHeaders()});
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
      },{headers: getAuthHeaders()});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // prevent undefined
  }
}
export const deleteAll = () => axios.get(`${BASE_URL}/deleteAll`,{headers: getAuthHeaders()});
export const updateUser = (user) => axios.post(`${BASE_URL}/updateUser`,user,{headers: getAuthHeaders()});
export const emails = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/emails`,{headers: getAuthHeaders()});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data;
        } catch (error) {
            console.error("Error fetching products:", error);
        return []; // prevent undefined
    }
}
export const phones = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/phones`,{headers: getAuthHeaders()});
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
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
  });
