import { FiCpu, FiShoppingBag, FiPhone, FiHeart } from "react-icons/fi";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../hooks/UseAxios";

// Map category names to icons
const categoryIcons = {
    electronics: FiCpu,
    fashion: FiShoppingBag,
    mobiles: FiPhone,
    accessories: FiHeart,
    shoes: FiShoppingBag,
    bags: FiShoppingBag,
    toys: FiHeart,
    "pet & supplies": FiHeart,
    beauty: FiHeart,
};

const CategoriesSection = () => {
    const axiosInstance = UseAxios();

    // Fetch CATEGORIES from backend
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosInstance.get("/categories");
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

    return (
        <section className="w-full px-4 md:px-8 lg:px-16 py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Shop by Category ({categories.length})
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((cat) => {
                    const title = cat.category;
                    const lower = title.toLowerCase();
                    const slug = lower.replace(/\s+/g, "-");
                    const Icon = categoryIcons[lower] || FiShoppingBag;

                    // Pick first product image if available
                    const img =
                        cat.products && cat.products.length > 0
                            ? cat.products[0].images?.[0]
                            : null;

                    return (
                        <Link
                            key={title}
                            to={`/shop?category=${encodeURIComponent(slug)}`}
                            className="group block rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            {/* Category image or fallback icon */}
                            <div className="relative w-full h-36 sm:h-40 md:h-44 lg:h-36 xl:h-40 bg-gray-100 rounded-lg overflow-hidden">

                                {img ? (
                                    <img
                                        src={img}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full w-full">
                                        <Icon className="text-5xl text-gray-700" />
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <div className="mt-2 text-center">
                                <span className="text-sm sm:text-base md:text-base font-medium text-gray-800 group-hover:text-primary transition">
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
