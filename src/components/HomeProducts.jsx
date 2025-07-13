import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { client } from "../../studio-react_shop/sanity";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

// 🔹 取得產品數據（帶有分頁功能）
const getPaginatedData = async (currentPage, pageSize) => {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const query = `*[_type == "product"] | order(_createdAt desc) [${start}...${end}] {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
  }`;

  const totalQuery = `count(*[_type == "product"])`;
  const data = await client.fetch(query);
  const total = await client.fetch(totalQuery);

  return { data, total };
};

const HomeProduct = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [favorites, setFavorites] = useState({});

  // 🔹 取得產品數據
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPaginatedData(currentPage, pageSize);
      setData(result.data);
      setTotal(result.total);
    };
    fetchData();
  }, [currentPage]);

  // 🔹 取得該使用者的收藏
  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const userRef = doc(db, "favorites", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setFavorites(userSnap.data().favorites || {});
        } else {
          setFavorites({});
        }
      };
      fetchFavorites();
    } else {
      setFavorites({});
    }
  }, [user]);

  // ✅ 收藏功能
  const toggleFavorite = async (product) => {
    if (!user) {
      toast.warn("請先登入才能收藏商品", { position: "top-right", autoClose: 2000 });
      return;
    }

    const userRef = doc(db, "favorites", user.uid);
    let updatedFavorites = { ...favorites };

    try {
      if (favorites[product._id]) {
        delete updatedFavorites[product._id];
        toast.info("已取消收藏", { position: "top-right", autoClose: 2000 });

        if (Object.keys(updatedFavorites).length === 0) {
          await deleteDoc(userRef);
        } else {
          await setDoc(userRef, { favorites: updatedFavorites }, { merge: true });
        }
      } else {
        updatedFavorites[product._id] = {
          id: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          slug: product.slug,
        };

        await setDoc(userRef, { favorites: updatedFavorites }, { merge: true });
        toast.success("已加入收藏", { position: "top-right", autoClose: 2000 });
      }

      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("收藏商品時發生錯誤:", error);
      toast.error("收藏商品時發生錯誤，請稍後再試", { position: "top-right", autoClose: 2000 });
    }
  };

  // ✅ 更新當前頁碼（Pagination 的 `onChange`）
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">最新產品</h2>
        </div>

        {/* 產品列表 */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <div key={product._id} className="relative group">
              {/* 愛心收藏按鈕 */}
              <button
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md z-10"
                onClick={() => toggleFavorite(product)}
              >
                <FaHeart className={`text-xl ${favorites[product._id] ? "text-red-500" : "text-gray-400"}`} />
              </button>

              {/* ✅ 產品點擊後導引到 `ProductDetail` */}
              <Link to={`/product/${product.slug}`}>
                <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md" />
                <p className="mt-2 font-bold">{product.name}</p>
                <p className="text-gray-600">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ 分頁功能 */}
      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange} // **修復 pagination**
        />
      </div>
    </div>
  );
};

export default HomeProduct;
