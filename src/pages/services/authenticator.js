import axios from "axios";

const loginUser = async (loginData) => {
    const URL = "https://vetrasales-backend-production.up.railway.app/auth/login";
    
    try {
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
export const result = await loginUser({
    username: 'server',
    password: 'server'
});

export const logout = () => {
    // Clear global header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear localStorage
    localStorage.removeItem('token');
    
    // Redirect to login
    window.location.href = '/';
};
