import { useRoutes } from "react-router-dom";
 
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Test from "./components/Test";
import Login from "./components/Login";
 

export const SetRoutes = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/problem", element: <Test /> },
    { path: "/login", element: <Login /> },
    { path: "/product/:slug", element: <ProductDetail /> },
   
  ]);
};
