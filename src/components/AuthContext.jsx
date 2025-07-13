// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

// 建立 Context
export const AuthContext = createContext();

// 建立 Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔹 確保 Firebase 驗證完成後才渲染 UI
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // 🔹 Firebase 驗證完成
    })
    return () => unsubscribe(); // 🔹 解除監聽，避免記憶體洩漏
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
  {!loading && children} {/* 🔹 確保驗證完成後才渲染 */}
    </AuthContext.Provider>
  );
};
