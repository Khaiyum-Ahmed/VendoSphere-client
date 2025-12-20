import {
   FiCpu,          // Electronics
  FiShoppingBag,  // Fashion
  FiSmartphone,   // Mobiles
  FiWatch,        // Accessories
  FiShoppingCart, // Groceries / General
  FiHeart,        // Beauty
  FiGift,         // Toys
  FiPackage,      // Bags
  FiActivity,     // Shoes
  FiGrid,
} from "react-icons/fi";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../hooks/UseAxios";

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

const CategoriesSection = () => {
  const axiosInstance = UseAxios();

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
      <div className="py-12 text-center font-medium text-gray-500">
        Loading categories...
      </div>
    );
  }

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((cat) => {
          const title = cat.category;
          const lower = title.toLowerCase();
          const slug = lower.replace(/\s+/g, "-");
          const Icon = categoryIcons[lower] || FiGrid;

          return (
            <Link
              key={title}
              to={`/shop?category=${encodeURIComponent(slug)}`}
              className="group"
            >
              <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition">
                  <Icon className="text-3xl text-primary" />
                </div>

                {/* Title */}
                <p className="text-sm md:text-base font-medium text-gray-800 text-center group-hover:text-primary transition">
                  {title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
