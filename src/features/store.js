import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import pageReducer from "./pageSlice";
import orderReducer from "./orderSlice";
import thunk from "redux-thunk";
const store = configureStore(
  {
    reducer: {
      authStore: authReducer,
      messageStore: messageReducer,
      category: categoryReducer,
      product: productReducer,
      page: pageReducer,
      order: orderReducer,
    },
  },
  applyMiddleware(thunk)
);
export default store;
