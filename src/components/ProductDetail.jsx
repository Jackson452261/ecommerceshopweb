import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 用於抓取 URL 參數
import { client } from "../../studio-react_shop/sanity"; // 確保這是正確的 Sanity 客戶端路徑
import ImageGallery from "../components/ImageGallery"; // 請確認 ImageGallery 路徑是否正確

import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

// Question 元件，用於折疊/展開內容
const Question = ({ title, children, defaultOpen = false }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className="border-b-[1px] border-b-slate-300"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 py-6"
      >
        <motion.span
          variants={{
            open: {
              color: "rgba(3, 6, 23, 1)",
            },
            closed: {
              color: "rgba(3, 6, 23, 0.8)",
            },
          }}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-left text-lg font-medium"
        >
          {title}
        </motion.span>
        <motion.span
          variants={{
            open: {
              rotate: "180deg",
              color: "rgb(124 58 237)",
            },
            closed: {
              rotate: "0deg",
              color: "#030617",
            },
          }}
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-slate-600"
      >
        <div ref={ref}>{children}</div>
      </motion.div>
    </motion.div>
  );
};

// 主組件
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
               不含運費
              </span>
            </div>

            {/* 產品描述 */}
            <div className="px-4 py-12">
              <div className="mx-auto max-w-3xl">
                <h3 className="mb-4 text-center text-3xl font-semibold">
                  產品描述
                </h3>
                <Question title="特色" defaultOpen>
                  <p>{product.description}</p>
                </Question>

              
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

 



