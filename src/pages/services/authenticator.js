import axios from "axios";

export const loginUser = async () => {
    const URL = "https://vetrasales-backend-production.up.railway.app/auth/login";
    
    try {
        loginData = {
            username: 'server',
            password: 'server'
        }
        const response = await axios.post(URL, loginData);
        const token = response.data.jwtToken;
        
        // Set global header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
        
        return { success: true, token };
    } catch (error) {
        console.error('Login error:', error.response?.data);
        return { success: false, error: error.response?.data };
    }
};

// Usage
export const logout = () => {
    // Clear global header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear localStorage
    localStorage.removeItem('token');
    
    // Redirect to login
    window.location.href = '/';
};

export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
    };
};