import { BrowserRouter } from "react-router-dom";
import { SetRoutes } from "./SetRoutes";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider  } from "./components/AuthContext";

const App = () => {
  return (
    <AuthProvider >
    <BrowserRouter>
      <Navbar /> {/* Navbar在所有頁面中都會顯示 */}
      <SetRoutes />
      <Footer />  {/* Footer在所有頁面中都會顯示 */}
    </BrowserRouter>
    </AuthProvider >
  );
};

export default App;
