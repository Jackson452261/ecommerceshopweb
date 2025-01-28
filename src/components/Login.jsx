import   { useContext } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // 確保路徑正確

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // Google 登入
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      console.error("Error during Google login:", error.message);
    }
  };

  // 登出
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        // 顯示使用者頭像並調整樣式
        <img
          src={user.photoURL}
          alt="User Avatar"
          className="w-110 h-100 rounded-full border-2 relative top-11 border-gray-300 shadow-lg cursor-pointer hover:scale-105 transition"
          onClick={handleLogout}
        />
      ) : (
        // 只有未登入時才顯示登入按鈕
        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          使用 Google 登入
        </button>
      )}
    </div>
  );
};

export default Login;
