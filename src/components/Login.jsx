import { useContext } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // 確保路徑正確
import { FcGoogle } from "react-icons/fc"; // Google Icon

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  

  // Google 登入
  const handleGoogleLogin = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence); // 🔹 設定登入持久化
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
        // **登入後顯示登出按鈕**
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
          登出
        </button>
      ) : (
        // **未登入時顯示 Google 登入按鈕**
        <div className="relative w-full h-screen">
        {/* 使用 transform 置中 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 max-w-sm w-full p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold text-gray-900">Log into Your Account</h2>
          <p className="text-gray-600 text-sm mt-1">Sign in to your account with your social profile</p>
          
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full mt-4 bg-red-500 text-white py-3 rounded-full text-lg font-semibold shadow-md hover:bg-red-600 transition"
          >
            <FcGoogle className="text-2xl bg-white rounded-full p-1" /> 
            Sign in with Google
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default Login;
