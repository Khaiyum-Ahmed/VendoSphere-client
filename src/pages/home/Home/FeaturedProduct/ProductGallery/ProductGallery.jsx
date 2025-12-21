import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReactImageMagnify from "react-image-magnify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ProductGallery = ({ images = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="h-[420px] flex items-center justify-center bg-gray-100 rounded-lg">
        No image available
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        className="rounded-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="cursor-zoom-in"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            >
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: `product-${index}`,
                    isFluidWidth: true,
                    src: img,
                  },
                  largeImage: {
                    src: img,
                    width: 1200,
                    height: 1200,
                  },
                  enlargedImageContainerDimensions: {
                    width: "150%",
                    height: "150%",
                  },
                  hoverDelayInMs: 200,
                  hoverOffDelayInMs: 200,
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default ProductGallery;
