import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 用於抓取 URL 參數
import { client } from "../../studio-react_shop/sanity"; // 確保這是正確的 Sanity 客戶端路徑
import ImageGallery from "../components/ImageGallery"; // 請確認 ImageGallery 路徑是否正確
 

const ProductDetail = () => {
  const { slug } = useParams(); // 從 URL 取得 slug 參數
  const [product, setProduct] = useState(null); // 儲存產品資料
  const [loading, setLoading] = useState(true); // 處理載入狀態
  const [error, setError] = useState(null); // 處理錯誤狀態

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        setLoading(true);
        setError(null); // 清除之前的錯誤訊息

        const query = `*[_type == "product" && slug.current == $slug][0] {
          _id,
         "images": images[].asset->url, // 解析圖片 URL
          name,
          price,
          description,
          "slug": slug.current,
          "categoryName": category->name
        }`;

        const data = await client.fetch(query, { slug }); // 使用 Sanity 查詢資料
        if (!data) {
          throw new Error("Product not found");
        }

        setProduct(data); // 設定取得的產品資料
      } catch (err) {
        setError(err.message); // 設置錯誤訊息
      } finally {
        setLoading(false); // 停止載入
      }
    };

    getProductDetail(); // 呼叫函數來取得產品資料
  }, [slug]); // 當 slug 改變時重新抓取資料

  // 處理載入狀態
  if (loading) return <div>Loading...</div>;

  // 處理錯誤狀態
  if (error) return <div>Error: {error}</div>;

  // 如果資料成功載入，渲染產品詳情
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* 圖片畫廊 */}
          <ImageGallery images={product.images} />

          <div className="md:py-8">
            {/* 類別名稱與產品名稱 */}
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {product.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {product.name}
              </h2>
            </div>

            {/* 評價區塊 */}
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              
              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>

            {/* 價格區塊 */}
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${product.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${product.price + 30}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            {/* 產品描述 */}
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
