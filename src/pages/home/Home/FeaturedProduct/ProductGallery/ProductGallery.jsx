import { useState } from "react";

const ProductGallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  if (!images.length) {
    return (
      <div className="h-[420px] flex items-center justify-center bg-gray-100 rounded">
        No image available
      </div>
    );
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="relative flex gap-4">
      {/* ========== THUMBNAILS ========== */}
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            onMouseEnter={() => setActiveIndex(i)}
            className={`w-16 h-16 border rounded overflow-hidden cursor-pointer
              ${activeIndex === i ? "border-orange-500" : "border-gray-200"}
            `}
          >
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* ========== MAIN IMAGE ========== */}
      <div
        className="relative w-[420px] h-[420px] border border-base-300 rounded overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={images[activeIndex]}
          className="w-full h-full object-contain"
        />
      </div>

      {/* ========== ZOOM PANEL (ONLY ON HOVER) ========== */}
      {isHovering && (
        <div className="hidden lg:block absolute left-[520px] top-0 w-[650px] h-[500px] border border-base-300 rounded-xl bg-white shadow-xl z-50 overflow-hidden">
          <div
            className="w-full h-full bg-no-repeat"
            style={{
              backgroundImage: `url(${images[activeIndex]})`,
              backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
              backgroundSize: "200%",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
