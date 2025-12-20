// Testimonials.jsx
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import Loading from "../../../Loading/Loading";
import UseAxios from "../../../../hooks/UseAxios";

const Testimonials = () => {
    const axiosInstance = UseAxios();

    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ["testimonials"],
        queryFn: async () => {
            const res = await axiosInstance.get("/testimonials");
            return res.data;
        },
    });

    if (isLoading) return <Loading></Loading>;

    return (
        <section className="py-12 bg-base-100">
            <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop
                autoplay={{ delay: 4000 }}
                effect="fade"
                modules={[EffectFade, Autoplay]}
                className="max-w-4xl mx-auto"
            >
                {testimonials.map((t) => (
                    <SwiperSlide key={t._id}>
                        <div className="card shadow-xl p-6 bg-white rounded-lg text-center">
                            <div className="flex flex-col items-center gap-4">
                                <img
                                    src={t.avatar}
                                    alt={t.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <h3 className="text-xl font-semibold">{t.name}</h3>
                                <p className="text-gray-600 italic">"{t.message}"</p>
                                <p className="text-yellow-400 mt-2">
                                    {"⭐".repeat(t.rating)}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;
