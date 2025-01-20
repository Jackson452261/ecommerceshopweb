import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // React Router 的 Link
import { client } from "../../studio-react_shop/sanity"; // 確保這是你 sanity 客戶端的正確路徑

 
const getData = async () => {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
    }`;

  const data = await client.fetch(query); // 從 Sanity 擷取資料
  return data;
};

const HomeProduct = () => {
  const [data, setData] = useState([]); // 使用 useState 來儲存資料

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(); // 擷取資料
      setData(result); // 將資料設置到 state
    };

    fetchData(); // 在組件掛載時執行資料擷取
  }, []); // 空的依賴陣列表示只在組件首次掛載時執行

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
    </div>
  );
};

export default HomeProduct;
