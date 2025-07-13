import { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "./AuthContext";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const Navbar = () => {
  return (
    <div className="bg-gray-50">
      <FlipNav />
      <div className="h-72" />
    </div>
  );
};

const FlipNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white p-4 border-b-[1px] border-gray-200 flex items-center justify-between relative">
      <NavLeft />
      <NavRight />
      
      {/* 手機版選單按鈕 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex flex-col gap-1 p-2"
      >
        <span className="w-6 h-0.5 bg-gray-600"></span>
        <span className="w-6 h-0.5 bg-gray-600"></span>
        <span className="w-6 h-0.5 bg-gray-600"></span>
      </button>

      {/* 手機版選單 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-50"
          >
            <div className="flex flex-col p-4 space-y-4">
              <MobileNavLink to="/" text="首頁" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/problem" text="問與答Q&A" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/community" text="Community" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/pricing" text="Pricing" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/company" text="關於我" onClick={() => setIsOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLeft = () => {
  return (
    <div className="flex items-center gap-6">
      <NavLink to="/" text="首頁" />
      <NavLink to="/problem" text="問與答Q&A" />
      <NavLink to="/community" text="Community" />
      <NavLink to="/pricing" text="Pricing" />
      <NavLink to="/company" text="關於我" />
    </div>
  );
};

const NavLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="hidden lg:block h-[30px] overflow-hidden font-medium"
    >
      <motion.div whileHover={{ y: -30 }}>
        <span className="flex items-center h-[30px] text-gray-500">{text}</span>
        <span className="flex items-center h-[30px] text-indigo-600">
          {text}
        </span>
      </motion.div>
    </Link>
  );
};

// 手機版選單連結元件
const MobileNavLink = ({ to, text, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors"
    >
      {text}
    </Link>
  );
};

const NavRight = () => {
  const { user, setUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (user) {
      toast.success("🎉 登入成功！", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("🎉 登出成功！", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("登出錯誤:", error.message);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-md whitespace-nowrap"
        >
          登出
        </motion.button>
      ) : (
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-medium rounded-md whitespace-nowrap"
          >
            登入
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;