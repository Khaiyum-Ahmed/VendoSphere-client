import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../Loading/Loading";
import SellerProductRow from "../SellerProductRow/SellerProductRow";

const ITEMS_PER_PAGE = 10;

const SellerProducts = () => {
    const axiosSecure = UseAxios();
    const { user } = UseAuth();
    const [page, setPage] = useState(1);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["seller-products", user?.email, page],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/seller/products?email=${user.email}&page=${page}&limit=${ITEMS_PER_PAGE}`
            );
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const { products = [], totalPages = 1 } = data || {};

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Products</h2>

            {/* TABLE */}
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>category</th>
                            <th>Price</th>
                            <th>Discount </th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <SellerProductRow
                                key={product._id}
                                product={product}
                                refetch={refetch}
                                page={page}
                                setPage={setPage}
                                productsLength={products.length}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        className="btn btn-sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num + 1)}
                            className={`btn btn-sm ${page === num + 1 ? "btn-primary text-white" : ""
                                }`}
                        >
                            {num + 1}
                        </button>
                    ))}

                    <button
                        className="btn btn-sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SellerProducts;
