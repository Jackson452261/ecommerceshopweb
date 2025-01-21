import  { useEffect, useState } from 'react';
import { client, urlFor } from '../../studio-react_shop/sanity'; // 保留對 Sanity 的連結
 

const Hero = () => {
  const [data, setData] = useState(null);

  // 獲取數據
  useEffect(() => {
    async function getData() {
      const query = "*[_type == 'heroImage'][0]";
      const result = await client.fetch(query);
      setData(result);
    }
    getData();
  }, []);

  // 當數據尚未加載時，顯示載入狀態
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        {/* 文字部分 */}
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Adidas
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
             販售同步日本最新鞋款、潮流服飾。
          </p>
        </div>

        {/* 圖片部分 */}
        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <img
              src={urlFor(data.image1).url()}
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              width={400}
              height={500}
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <img
              src={urlFor(data.image2).url()}
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      {/* 三個 Link 部分 */}
    
    </section>
  );
};

export default Hero;
