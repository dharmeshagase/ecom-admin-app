import axios from "../helpers/axios";

const getAllOrders = () => {
  return axios.get("order/getAllOrders").then((response) => {
    return response.data;
  });
};

const updateOrder = (payload) => {
  return axios.post("order/update", payload).then((response) => {
    return response.data;
  });
};

const orderService = {
  getAllOrders,
  updateOrder,
};

export default orderService;
