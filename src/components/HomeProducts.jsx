import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // React Router 的 Link
import { Pagination } from "antd"; // Ant Design 的 Pagination
import { client } from "../../studio-react_shop/sanity"; // 確保這是你 sanity 客戶端的正確路徑

// 分頁查詢函數
const getPaginatedData = async (currentPage, pageSize) => {
  const start = (currentPage - 1) * pageSize; // 起始索引
  const end = start + pageSize; // 結束索引

  const query = `*[_type == "product"] | order(_createdAt desc) [${start}...${end}] {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url
  }`;

  const totalQuery = `count(*[_type == "product"])`; // 獲取產品總數
  const data = await client.fetch(query);
  const total = await client.fetch(totalQuery);

  return { data, total };
};

const HomeProduct = () => {
  const [data, setData] = useState([]); // 當前頁面的數據
  const [total, setTotal] = useState(0); // 總數據數量
  const [currentPage, setCurrentPage] = useState(1); // 當前頁碼
  const pageSize = 4; // 每頁顯示數量

  // 每次頁碼變動時重新獲取數據
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPaginatedData(currentPage, pageSize);
      setData(result.data);
      setTotal(result.total);
    };

    fetchData();
  }, [currentPage]); // 當 currentPage 改變時觸發

  // 處理分頁切換
  const handlePageChange = (page) => {
    setCurrentPage(page); // 更新當前頁碼
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Adidas最新產品
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageUrl}
                  alt="Product image"
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 分頁元件 */}
    <div className="flex justify-center">
      <Pagination
        current={currentPage} // 當前頁碼
        pageSize={pageSize} // 每頁顯示數量
        total={total} // 總數據數量
        onChange={handlePageChange} // 頁碼變動時觸發
        className="mt-8 text-center"/>
    </div>
    </div>
  );
};

export default HomeProduct;
