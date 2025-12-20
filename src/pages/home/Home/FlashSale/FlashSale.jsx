import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../hooks/UseAxios";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Loading from "../../../Loading/Loading";

const FlashSale = () => {
    const axiosInstance = UseAxios();
    const { data: products = [], isLoading } = useQuery({
        queryKey: ["flash-sale-products"],
        queryFn: async () => {
            const res = await axiosInstance.get("/products/flash-sale");
            return res.data;
        },
    });

    // Countdown timer (example: countdown to today 23:59:59)
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            const difference = endOfDay - now;
            if (difference <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const hours = Math.floor(difference / (1000 * 60 * 60));
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ hours, minutes, seconds });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading) return <Loading></Loading>;

    return (
        <section className="py-10 px-4 md:px-8 lg:px-16">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">⚡ Flash Sale</h2>
                <p className="text-red-500 font-semibold">
                    {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
                </p>
            </div>

            <Swiper
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 6 },
                }}
                navigation
                modules={[Navigation]}
            >
                {products.map((product) => (
                    <SwiperSlide key={product._id}>
                        <Link to={`/product/${product._id}`} className="block bg-white rounded shadow hover:shadow-lg transition overflow-hidden">
                            <img
                                src={product.images}
                                alt={product.productName}
                                className="w-full h-36 object-cover"
                            />
                            <div className="p-2 text-center">
                                <p className="text-sm font-medium">{product.productName}</p>
                                <p className="text-red-500 font-bold">
                                    $ {product.price - (product.discount || 0)}
                                    {product.discount > 0 && (
                                        <span className="line-through text-gray-400 ml-2">
                                            $ {product.price}
                                        </span>
                                    )}
                                </p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mt-4 text-right">
                <Link to="/shop?flash=true" className="btn btn-outline">
                    See All Deals
                </Link>
            </div>
        </section>
    );
};

export default FlashSale;
