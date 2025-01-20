import   { useState } from "react";

export default function ImageGallery({ images }) {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {/* 小圖片區域 */}
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, idx) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <img
              src={image} // 假設 `images` 中包含 URL 字串
              alt={`photo-${idx}`}
              width={200}
              height={200}
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      {/* 大圖片區域 */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <img
          src={bigImage} // 顯示選中的大圖
          alt="Main photo"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />

        {/* 標籤 */}
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
