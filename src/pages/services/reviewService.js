import axios from "axios";

const BASE_URL = "https://vetrasales-backend-production.up.railway.app"+"/api/review";

const token = localStorage.getItem('token')
const header = {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}
export const listOfReview = async (productId) => { 
    try {const response = await axios.get(`${BASE_URL}/listOfReview`,{
    params: { productId },
    headers: { "Content-Type": 'application/json', "Authorization": `Bearer ${token}` }
});
    return response.data;} catch (error) {
        console.error("Error fetching products:", error)
    }
};

export const customerReview = async (username) => { 
    try {const response = await axios.get(`${BASE_URL}/customerReviews`,{params: { username }},{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
    return response;
    } catch (error) {
        console.error("Error fetching products:", error)
    }
};
export const deleteReview = (reviewId,username,admin) => axios.delete(`${BASE_URL}/deleteReview`,{reviewId,username,admin},{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
export const deleteAllReviews = () => axios.delete(`${BASE_URL}/deleteAllReviews`,{headers: { "Content-Type": "application/json" }});
export const deleteReviewsByProduct = (productId) => axios.delete(`${BASE_URL}/deleteReviewsByProduct`,{params:{productId}},{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
export const allReviews =  async () => {
    try {
        const res = await axios.get(`${BASE_URL}/allReviews`,{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
        console.log("API response:", res.data); // 👈 DEBUG
        return res.data;
    } catch (error) {
    console.error("Error fetching products:", error);
      return []; // prevent undefined
}
};

export const getRating = async (productId) => {
  try {
    const res = await axios.get(`${BASE_URL}/getRating`,{params:{productId}},{headers: {"Content-Type":'application/json' ,"Authorization":`Bearer ${token}`}});
    console.log("API response:", res.data); // 👈 DEBUG
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}