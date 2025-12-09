// optional icons from react-icons
import { FiCpu, FiShoppingBag, FiPhone, FiHeart } from "react-icons/fi";
import { Link } from "react-router";

const CategoriesSection = () => {
    // Example categories; swap images and slugs as needed
    const categories = [
        {
            id: 1,
            title: "Electronics",
            slug: "electronics",
            // replace with your own image URL
            img: "https://i.ibb.co/7W0Z1G3/category-electronics.jpg",
            Icon: FiCpu,
        },
        {
            id: 2,
            title: "Fashion",
            slug: "fashion",
            img: "https://i.ibb.co/SvCjYxJ/category-fashion.jpg",
            Icon: FiShoppingBag,
        },
        {
            id: 3,
            title: "Mobiles",
            slug: "mobiles",
            img: "https://i.ibb.co/3r1FqWf/category-mobiles.jpg",
            Icon: FiPhone,
        },
        {
            id: 5,
            title: "Accessories",
            slug: "Accessories",
            img: "https://i.ibb.co/2dJPBfr/category-beauty.jpg",
            Icon: FiHeart,
        },
        {
            id: 5,
            title: "Shoes",
            slug: "Shoes",
            img: "https://i.ibb.co/2dJPBfr/category-beauty.jpg",
            Icon: FiShoppingBag,
        },
        {
            id: 6,
            title: "Bags",
            slug: "Bags",
            img: "https://i.ibb.co/2dJPBfr/category-beauty.jpg",
            Icon: FiShoppingBag,
        },
        {
            id: 7,
            title: "Toys",
            slug: "Toys",
            img: "https://i.ibb.co/2dJPBfr/category-beauty.jpg",
            Icon: FiHeart,
        },
        {
            id: 8,
            title: "Pet & supplies",
            slug: "Pet & Supplies",
            img: "https://i.ibb.co/2dJPBfr/category-beauty.jpg",
            Icon: FiHeart,
        },
        // add 1–2 more if desired
    ];

    return (
        <section className="w-full px-4 md:px-8 lg:px-16 py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Shop by category
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map(({ id, title, slug, img, Icon }) => (
                    <Link
                        key={id}
                        to={`/shop?category=${encodeURIComponent(slug)}`}
                        className="group block rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        {/* Image */}
                        <div className="relative w-full h-36 sm:h-40 md:h-44 lg:h-36 xl:h-40">
                            <img
                                src={img}
                                alt={title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {/* optional icon overlay */}
                            {Icon && (
                                <div className="absolute top-2 left-2 bg-white/80 rounded-full p-1 sm:p-2">
                                    <Icon className="text-lg sm:text-xl md:text-2xl" />
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div className="mt-2 text-center">
                            <span className="text-sm sm:text-base md:text-sm lg:text-base font-medium text-gray-800 group-hover:text-primary transition">
                                {title}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;
