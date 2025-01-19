import { useRoutes } from "react-router-dom";
 
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
 

export const SetRoutes = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/product/:slug", element: <ProductDetail /> },
   
  ]);
};
