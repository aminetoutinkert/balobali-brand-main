import axios from "axios";

// Create an Axios instance with base URL for the backend API
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api", // Dynamic env var for production, fallback to relative
  withCredentials: true, // Important for secure JWT cookies
});

// Product API Service
export const fetchProducts = async () => {
  const { data } = await API.get("/products");
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await API.get(`/products/${id}`);
  return data;
};

export const fetchRecommendedProducts = async () => {
  const { data } = await API.get("/products/recommendations");
  return data;
};

// User Auth API Service
export const loginUser = async (email, password) => {
  const { data } = await API.post("/users/login", { email, password });
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await API.post("/users", userData);
  return data;
};

export const logoutUser = async () => {
  const { data } = await API.post("/users/logout");
  return data;
};

// Order & Payment API Service
export const createOrder = async (orderData) => {
  const { data } = await API.post("/orders", orderData);
  return data;
};

export default API;
