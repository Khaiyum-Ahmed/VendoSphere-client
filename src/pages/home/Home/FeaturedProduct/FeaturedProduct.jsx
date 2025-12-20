import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Loading from "../../../Loading/Loading";
import UseAxios from "../../../../hooks/UseAxios";
import FeaturedProductCard from "./FeaturedProductCard/FeaturedProductCard";

const FeaturedProducts = () => {
    const axiosInstance = UseAxios();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["featured-products"],
        queryFn: async () => {
            const res = await axiosInstance.get("/products/featured");
            return res.data;
        },
    });

    if (isLoading) return <Loading></Loading>;

    return (
        <section className="px-4 md:px-8 lg:px-16 py-10">
            <h2 className="text-2xl font-bold mb-6">🔥 Featured Products</h2>

            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={20}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 6 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <FeaturedProductCard product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default FeaturedProducts;
