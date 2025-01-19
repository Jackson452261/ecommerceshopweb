import { BrowserRouter } from "react-router-dom";
import { SetRoutes } from "./SetRoutes";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar在所有頁面中都會顯示 */}
      <SetRoutes />
      <Footer />  {/* Footer在所有頁面中都會顯示 */}
    </BrowserRouter>
  );
};

export default App;
