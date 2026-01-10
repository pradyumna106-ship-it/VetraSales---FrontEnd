import axios from "axios";
import { useState } from "react";
const [token,setToken] = useState('')
export const loginUser = async () => {
    const URL = "https://vetrasales-backend-production.up.railway.app/auth/login";
    
    try {
        const response = await axios.post(URL, {username:'server', password: 'server'},{headers:{"Content-Type": "application/json"}});
        setToken(response.data.jwtToken);
        console.log("token recived:",token)
        // Set global header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return { success: true, token };
    } catch (error) {
        console.error('Login error:', error.response?.data);
        return { success: false, error: error.response?.data };
    }
};


export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
    };
};