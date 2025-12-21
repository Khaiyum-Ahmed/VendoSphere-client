import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router";
import UseAxios from "../../../../hooks/UseAxios";
import {
    FiCpu,
    FiShoppingBag,
    FiSmartphone,
    FiWatch,
    FiHeart,
    FiGift,
    FiPackage,
    FiActivity,
    FiGrid,
} from "react-icons/fi";

/* ================= ICON MAP ================= */
const categoryIcons = {
    electronics: FiCpu,
    fashion: FiShoppingBag,
    mobiles: FiSmartphone,
    accessories: FiWatch,
    shoes: FiActivity,
    bags: FiPackage,
    toys: FiGift,
    beauty: FiHeart,
};

const CategoriesShopSection = () => {
    const axiosInstance = UseAxios();
    const [params, setParams] = useSearchParams();

    /* ================= FETCH CATEGORIES ================= */
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosInstance.get("/categories");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="py-6 text-center text-gray-500 font-medium">
                Loading categories...
            </div>
        );
    }

    const handleCategoryClick = (slug) => {
        if (slug) {
            params.set("category", slug);
        } else {
            params.delete("category");
        }
        setParams(params);
    };

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold border-b pb-2">Categories</h3>

            {categories.map((cat) => {
                const title = cat.category;
                const lower = title.toLowerCase();
                const slug = lower.replace(/\s+/g, "-");
                const Icon = categoryIcons[lower] || FiGrid;

                return (
                    <button
                        key={title}
                        onClick={() => handleCategoryClick(slug)}
                        className="flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-primary/10 transition text-gray-700 hover:text-primary"
                    >
                        <Icon className="text-xl" />
                        <span className="font-medium">{title}</span>
                    </button>
                );
            })}

            {/* Optional: Show All button */}
            <button
                onClick={() => handleCategoryClick(null)}
                className="flex items-center gap-3 w-full px-3 py-2 rounded hover:bg-primary/10 transition text-gray-700 hover:text-primary font-medium"
            >
                <FiGrid className="text-xl" />
                All Products
            </button>
        </div>
    );
};

export default CategoriesShopSection;
