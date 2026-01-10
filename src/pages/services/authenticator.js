import axios from "axios";

export const loginUser = async () => {
    const URL = "https://vetrasales-backend-production.up.railway.app/auth/login";

    try {
        const response = await axios.post(
            URL,
            { username: "server", password: "server" },
            { headers: { "Content-Type": "application/json" } }
        );

        const token = response.data.jwtToken;

        console.log("token received:", token);

        // Save token
        localStorage.setItem("token", token);

        // Set global Axios header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        return { success: true, token };

    } catch (error) {
        console.error("Login error:", error.response?.data);
        return { success: false, error: error.response?.data };
    }
};
