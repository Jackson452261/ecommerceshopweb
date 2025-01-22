import { useRoutes } from "react-router-dom";
 
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Test from "./components/Test";
 

export const SetRoutes = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/problem", element: <Test /> },
    { path: "/product/:slug", element: <ProductDetail /> },
   
  ]);
};
