import { FiCpu, FiShoppingBag, FiPhone, FiHeart } from "react-icons/fi";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../hooks/UseAxios";

// Map category names to icons
const categoryIcons = {
    Electronics: FiCpu,
    Fashion: FiShoppingBag,
    Mobiles: FiPhone,
    Accessories: FiHeart,
    Shoes: FiShoppingBag,
    Bags: FiShoppingBag,
    Toys: FiHeart,
    "Pet & Supplies": FiHeart,
    Beauty: FiHeart,
};

const CategoriesSection = () => {
    const axiosInstance = UseAxios();

    // Fetch all products
    const { data: products = [], isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await axiosInstance.get("/products")
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="py-10 text-center text-lg font-semibold">
                Loading Categories...
            </div>
        );
    }

    // Extract unique categories from products
    const categories = Array.from(
        new Map(
            products.map((p) => [p.category, { title: p.category, img: p.image }])
        ).values()
    );

    return (
        <section className="w-full px-4 md:px-8 lg:px-16 py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Shop by category {categories.length}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => {
                    const { title, img } = category;
                    const Icon = categoryIcons[title] || null;
                    const slug = title.toLowerCase().replace(/\s+/g, "-");

                    return (
                        <Link
                            key={title}
                            to={`/shop?category=${encodeURIComponent(slug)}`}
                            className="group block rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            {/* Category product image */}
                            <div className="relative w-full h-36 sm:h-40 md:h-44 lg:h-36 xl:h-40 bg-gray-100 rounded-lg overflow-hidden">
                                {img ? (
                                    <img
                                        src={img}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    Icon && (
                                        <div className="flex items-center justify-center h-full w-full">
                                            <Icon className="text-5xl text-gray-700" />
                                        </div>
                                    )
                                )}
                            </div>

                            {/* Title */}
                            <div className="mt-2 text-center">
                                <span className="text-sm sm:text-base md:text-sm lg:text-base font-medium text-gray-800 group-hover:text-primary transition">
                                    {title}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoriesSection;
