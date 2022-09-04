import { logout } from "../features/authSlice";
import axios from "axios";
import { api } from "../apiConfig";

let store;

//InjectStore function used to call store variable from the index.js file
//Store cannot be directly imported in this file as it will create a circular dependency problem
export const injectStore = (_store) => {
  store = _store;
};

// const user = JSON.parse(window.localStorage.getItem('user'));
const axiosInstance = axios.create({
  baseURL: api,
  // headers:{
  //     'Authorization': user?`Bearer ${user.token}`:''
  // }
});

//Interceptor for the request api
axiosInstance.interceptors.request.use((req) => {
  const auth = store.getState().authStore;
  // console.log(auth.token);
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

// Interceptor for the response of the api
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status === 500) {
      console.log("Into response interceptor");
      store.dispatch(logout()).then(() => {
        // window.location.reload();
      });
      console.log(status);
    }
    return Promise.reject(error.response);
  }
);

export default axiosInstance;
