import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import UseAxios from "../../../../hooks/UseAxios";

const CategoryProducts = () => {
    const axiosInstance = UseAxios();
    const [searchParams] = useSearchParams();
    const categorySlug = searchParams.get("category"); // e.g. "electronics"

    // Normalize slug → lowercase category
    const categoryKey = categorySlug?.replace(/-/g, " ").toLowerCase();

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosInstance.get("/categories");
            return res.data;
        },
        enabled: !!categorySlug,
    });

    

    if (isLoading) {
        return <div className="text-center py-10">Loading products...</div>;
    }

    // Find specific category document
    const categoryData = categories.find(
        (cat) => cat.category.toLowerCase() === categoryKey
    );

    const products = categoryData?.products || [];

    return (
        <section className="py-10">
            <h2 className="text-xl font-bold mb-6">
                Products in{" "}
                <span className="text-primary capitalize">{categoryKey}</span>
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
                        {/* product image */}
                        <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded mb-2"
                        />

                        <h3 className="font-semibold">{product.name}</h3>

                        <p className="text-gray-500 text-sm capitalize">
                            {product.specifications?.brand}
                        </p>

                        <p className="font-bold text-primary">${product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryProducts;
