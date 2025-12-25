import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxios from "../../../../../hooks/UseAxios";
import Loading from "../../../../Loading/Loading";

const RelatedProducts = ({ productId }) => {
    const axiosInstance = UseAxios();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["related-products", productId],
        enabled: !!productId,
        queryFn: async () => {
            const res = await axiosInstance.get(`/products/related/${productId}`);
            return res.data;
        },
    });
console.log(products)
    if (isLoading) {
        return <Loading></Loading>;
    }

    if (!products.length) {
        return null;
    }

    return (
        <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Related Products</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((p) => (
                    <Link
                        to={`/product/${p._id}`}
                        key={p._id}
                        className="border border-base-300 rounded hover:shadow-2xl p-4 transition"
                    >
                        <img
                            src={p.images}
                            alt={p.productName}
                            className="w-full h-40 object-cover rounded"
                        />
                        <p className="mt-2 font-medium">{p.name}</p>
                        <p className="text-sm text-gray-500">${p.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
