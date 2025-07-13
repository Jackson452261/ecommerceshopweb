import { BrowserRouter } from "react-router-dom";
import { SetRoutes } from "./SetRoutes";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider  } from "./components/AuthContext";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <AuthProvider >
    <BrowserRouter>
      <Navbar /> {/* Navbar在所有頁面中都會顯示 */}
      <ToastContainer />
      <SetRoutes />
      <Footer />  {/* Footer在所有頁面中都會顯示 */}
    </BrowserRouter>
    </AuthProvider >
  );
};

export default App;
