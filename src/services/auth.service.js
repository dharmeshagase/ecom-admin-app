import axios from "../helpers/axios";


const login = (email, password) => {
  return axios
    .post("/admin/signin", {
      email,
      password,
    })
    .then((response) => {
      // console.log(response)
      if (response.data.token) {
        window.localStorage.setItem("user", JSON.stringify(response.data));
      }
      // console.log(response.data);
      return response.data;
    });
};

const logout = () => {
  return axios.post('/admin/signout').then((response)=>{
    window.localStorage.removeItem("user");
    console.log(response.data);
    return response.data;
  });
  
};

const signup =  (user)=>{
  // console.log(user)
  return axios.post(
    '/admin/signup',
    {
      firstName:user.firstname,
      lastName: user.lastname,
      email: user.email,
      password: user.password
    }
  ).then((response)=>{
    return response.data;
  });
}
const authService = {
  login,
  logout,
  signup,
};
export default authService;