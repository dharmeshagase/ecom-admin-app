import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "../helpers/axios";
import { api } from "../apiConfig";
// import { loginRequest } from "./constant.actions";
import { authConstant } from "./constants/authConstants";



const initialStateValue = {
    user:null,  
}



export const authSlice = createSlice({
    name: "auth",
    initialState:initialStateValue,
    reducers:{
        loginSuccess:(state,action)=>{
            state.user = action.payload;
            console.log(action.type)
            
        }
    }
})

//export reducers 
export default authSlice.reducer;

//export the action creators
export const {loginSuccess} = authSlice.actions;

export const login = ({ email, password }) => async dispatch => {
    try {
    //   const res = await api.post('/api/auth/login/', { email, password })
    const res = await axios.post(api+'/admin/signin',{email,password})
      dispatch(loginSuccess({email}));
    } catch (e) {
      return console.error(e.message);
    }
  }