import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 用來抓取 URL 參數
import { client } from "../../studio-react_shop/sanity"; // 確保這是你 sanity 客戶端的正確路徑

const ProductDetail = () => {
  const { slug } = useParams(); // 從 URL 中取得 slug 參數
  const [product, setProduct] = useState(null); // 儲存取得的產品資料
  const [loading, setLoading] = useState(true); // 處理載入狀態

  useEffect(() => {
    const getProductDetail = async () => {
      const query = `*[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        price,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
      }`;
      const data = await client.fetch(query, { slug }); // 根據 slug 查詢產品資料
      setProduct(data); // 設置產品資料
      setLoading(false); // 停止載入
    };

    getProductDetail(); // 呼叫函數來取得產品資料
  }, [slug]); // 當 slug 改變時重新抓取資料

  if (loading) return <div>Loading...</div>; // 如果資料還在載入中，顯示 Loading

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} className="w-full h-auto" />
      </div>
      <div className="product-info">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-xl text-gray-700">{product.categoryName}</p>
        <p className="text-lg text-gray-900">${product.price}</p>
        <p className="text-md text-gray-600 mt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
