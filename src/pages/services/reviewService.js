import axios from "axios";

const BASE_URL = "https://vetrasales-backend-production.up.railway.app/api/review";

export const listOfReview = (productId) => axios.get(`${BASE_URL}/listOfReview`,productId,{headers: { "Content-Type": "application/json" }});
export const deleteReview = (reviewId,username,admin) => axios.delete(`${BASE_URL}/deleteReview`,{reviewId,username,admin},{headers: { "Content-Type": "application/json" }});
export const deleteAllReviews = () => axios.delete(`${BASE_URL}/deleteAllReviews`,{headers: { "Content-Type": "application/json" }});
export const deleteReviewsByProduct = (productId) => axios.delete(`${BASE_URL}/deleteReviewsByProduct`,{headers: { "Content-Type": "application/json" }});
export const allReviews = () => axios.get(`${BASE_URL}/allReviews`,{headers: { "Content-Type": "application/json" }});