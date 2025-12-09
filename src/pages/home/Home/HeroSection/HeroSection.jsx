import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";

const HeroSection = () => {
    const slides = [
        {
            id: 1,
            title: "Big Winter Sale — Up to 50% Off!",
            subtitle: "Grab your favorite products at unbelievable prices!",
            img: "https://i.ibb.co.com/Y4PFBqV8/top-view-shocked-female-builder-uniform-wearing-hard-hat-holding-sale-icon-pointing-up-right-side-is.avif",
        },
        {
            id: 2,
            title: "New Arrivals are Here!",
            subtitle: "Explore the latest products added to our store.",
            img: "https://i.ibb.co.com/Ps9Jtw2S/istockphoto-2007737872-612x612.jpg",
        },
        {
            id: 3,
            title: "Become a Seller on VendoSphere!",
            subtitle: "Start earning by selling to thousands of customers.",
            img: "https://i.ibb.co.com/FLgj2bhW/How-to-Become-an-e-Commerce-Seller-7-Tips-from-Experts.png",
        },
    ];

    return (
        <div className="w-full h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden my-10">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="w-full h-full bg-cover bg-center relative flex items-center"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/50"></div>

                            {/* Text Content */}
                            <Motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="relative z-0 text-white max-w-lg px-6 md:px-12"
                            >
                                <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg leading-tight">
                                    {slide.title}
                                </h1>

                                <p className="text-base md:text-xl mb-6 font-light drop-shadow-lg">
                                    {slide.subtitle}
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        to="/shop"
                                        className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition text-center"
                                    >
                                        🛒 Shop Now
                                    </Link>

                                    <Link
                                        to="become-seller"
                                        className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition text-center"
                                    >
                                        💼 Become a Seller
                                    </Link>
                                </div>
                            </Motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSection;
