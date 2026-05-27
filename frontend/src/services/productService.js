import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getProducts = () => axios.get(`${BASE_URL}/products`);

export const createProduct = (data) => axios.post(`${BASE_URL}/products`, data);

export const updateProduct = (id, data) =>
  axios.put(`${BASE_URL}/products/${id}`, data);

export const deleteProduct = (id) =>
  axios.delete(`${BASE_URL}/products/${id}`);
