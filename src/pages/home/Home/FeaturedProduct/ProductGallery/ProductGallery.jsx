import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const ProductGallery = ({ images = [] }) => {
    // console.log(images)
    if (!images.length) {
        return (
            <div className="h-[420px] flex items-center justify-center bg-gray-100 rounded-lg">
                No image available
            </div>
        );
    }

    return (
        <Swiper spaceBetween={5} slidesPerView={1}>
          <div className="w-1/2 ">
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={img}
                        alt="product"
                        className="w-[600px] h-fit object-cover rounded-lg"
                    />
                </SwiperSlide>
            ))}
          </div>
        </Swiper>
    );
};

export default ProductGallery;
