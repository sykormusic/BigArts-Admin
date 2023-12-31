import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const getOrderById = async (id) => {
  const response = await axios.get(
    `${base_url}user/get-order-by-id/${id}`,
    config
  );

  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}user/get-month-wise-order-income`,
    config
  );

  return response.data;
};

const getYearlyStats = async () => {
  const response = await axios.get(`${base_url}user/get-yearly-orders`, config);

  return response.data;
};

const updateOrderStatus = async (data) => {
  const response = await axios.put(
    `${base_url}user/order/update-order/${data.id}`,
    data,
    config
  );

  return response.data;
};

const getTotalOrders = async () => {
  const response = await axios.get(`${base_url}user/get-total-orders`, config);
  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  getOrderById,
  updateOrderStatus,
  getMonthlyOrders,
  getYearlyStats,
  getTotalOrders,
};

export default authService;
