// import React from "react"
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./containers/Home";
import { Signin } from "./containers/Signin";
import { Signup } from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { Products } from "./containers/Products";
import { Orders } from "./containers/Orders";
import { Category } from "./containers/Category";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "./features/categorySlice";
import { getAllProduct } from "./features/productSlice";
import { NewPage } from "./containers/NewPage/NewPage";
import { getAllOrders } from "./features/orderSlice";

function App() {
  const auth = useSelector((state) => state.authStore);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.isLoggedIn) {
      // console.log("dskjfhsdjkfk");
      if (category.status == "idle") dispatch(getAllCategory());
      if (product.status == "idle") dispatch(getAllProduct());
      if (order.status == "idle") dispatch(getAllOrders());
    }
  }, [auth.isLoggedIn]);
  // const user = localStorage.getItem('user');
  // const {isLoggedIn} = useSelector(state=>state.authStore);
  // if(isLoggedIn){
  //   return (<Navigate to="/"/>)
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Routes allowed only when the user is signed in */}
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/page" element={<NewPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/category" element={<Category />} />
          </Route>

          {/* Publicly allowed routes */}
          <Route path="/signin" element={<Signin />}></Route>
          {/* <Route path="/signup" element={<Signup />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
