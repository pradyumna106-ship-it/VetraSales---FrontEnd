import axios from "axios";

const BASE_URL = "https://vetrasales-backend-production.up.railway.app/api/user";

export const getAllUser = async ()=>{
    const response = await axios.get(`${BASE_URL}/getAllUser`,{headers: { "Content-Type": "application/json" }});
    return response.data
}
export const searchUser = (name) => axios.get(`${BASE_URL}/searchUser`,name,{headers: { "Content-Type": "application/json" }});
export const deleteUser = (id) => axios.get(`${BASE_URL}/delete`,id,{headers: { "Content-Type": "application/json" }});
export const signUp = (user) => axios.post(`${BASE_URL}/signUp`,user,{headers: { "Content-Type": "application/json" }});
export const signIn = (login) => axios.post(`${BASE_URL}/signIn`,login,{headers: { "Content-Type": "application/json" }});
export const userData = (username) => axios.get(`${BASE_URL}/userData`,username,{headers: { "Content-Type": "application/json" }});
export const deleteAll = () => axios.get(`${BASE_URL}/deleteAll`,{headers: { "Content-Type": "application/json" }});
export const updateUser = (user) => axios.post(`${BASE_URL}/updateUser`,user,{headers: { "Content-Type": "application/json" }});
export const emails = () => axios.get(`${BASE_URL}/emails`,{headers: { "Content-Type": "application/json" }});
export const phones = () => axios.get(`${BASE_URL}/phones`,{headers: { "Content-Type": "application/json" }});