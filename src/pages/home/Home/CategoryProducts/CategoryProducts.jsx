import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import UseAxios from "../../../../hooks/UseAxios";

const CategoryProducts = () => {
    const axiosInstance = UseAxios();
    const [searchParams] = useSearchParams();
    const categorySlug = searchParams.get("category");  // e.g. mobiles

    // Convert slug → category name ("mobiles" → "Mobiles")
    const categoryName = categorySlug
        ? categorySlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
        : "";

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["category-products", categorySlug],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/products?category=${categoryName}`
            );
            return res.data;
        },
        enabled: !!categorySlug, // run only if slug exists
    });

    if (!categorySlug) {
        return <div className="text-center py-10">Select a category above 👆</div>;
    }

    if (isLoading) {
        return <div className="text-center py-10">Loading products...</div>;
    }

    return (
        <section className="py-10">
            <h2 className="text-xl font-bold mb-6">
                Products in <span className="text-primary">{categoryName}</span>
            </h2>

            {products.length === 0 && (
                <p className="text-center text-gray-500">
                    No products found in this category.
                </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border rounded-lg p-3 shadow hover:shadow-lg transition"
                    >
                        <img
                            src={product.image}
                            alt={product.productName}
                            className="w-full h-40 object-cover rounded mb-2"
                        />
                        <h3 className="font-semibold">{product.productName}</h3>
                        <p className="text-gray-500 text-sm">{product.brand}</p>
                        <p className="font-bold text-primary">${product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryProducts;
