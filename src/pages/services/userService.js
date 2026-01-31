import axios from "axios";

const BASE_URL = "http://localhost:9090" + "/api/user";

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${token}`
  };
};

export const getAllUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getAllUser`, { headers: getHeaders() });
    console.log("API response:", res.data); // 👈 DEBUG
    return res.data
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }

}

export const getAllCustomer = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getAllCustomer`, { headers: getHeaders() });
    return res.data
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }

}

export const getAllAdmin = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getAllAdmin`, { headers: getHeaders() });
    return res.data
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }

}
export const searchUser = async (name) => {
  try {
    const res = await axios.get(`${BASE_URL}/searchUser`, {
      params: { name },
      headers: getHeaders()
    });
    console.log("API response:", res.data); // 👈 DEBUG
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }


}
export const deleteUser = (id) => {
  return axios.get(`${BASE_URL}/delete`, {
    params: { id },
    headers: getHeaders()
  });
};

export const signUp = (user) =>
  axios.post(`${BASE_URL}/signUp`, user, {
    headers: { "Content-Type": 'application/json' },
  });

export const signIn = async (login) => {
  try {
    const res = await axios.post(`${BASE_URL}/signIn`, login, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("Full response:", res.data);

    // ✅ Use RES not response
    const token = res.data.jwtToken;
    console.log("token received:", token);

    // ✅ Save token
    localStorage.setItem("token", token);

    // ✅ Return full response data
    return res.data;  // Contains jwtToken, role, username
  } catch (error) {
    console.error("Login error:", error);
    throw error;  // Re-throw for handleSubmit catch
  }
};

export const userData = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/userData`, {
      params: { username },   // ✅ REQUIRED
      headers: getHeaders()
    });
    console.log("API response:", res.data); // 👈 DEBUG
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }
}

export const contact = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/getEmail`, {
      params: { username },   // ✅ REQUIRED
      headers: getHeaders()
    });
    console.log("API response:", res.data); // 👈 DEBUG
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }
}
export const deleteAll = () => axios.get(`${BASE_URL}/deleteAll`, { headers: getHeaders() });
export const updateUser = (user) => axios.post(`${BASE_URL}/updateUser`, user, { headers: getHeaders() });
export const emails = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/emails`, { headers: getHeaders() });
    console.log("API response:", res.data); // 👈 DEBUG
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // prevent undefined
  }
}
export const phones = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/phones`, { headers: getHeaders() });
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
    headers: getHeaders()
  });

