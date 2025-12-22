import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../Loading/Loading";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

const ManageProducts = () => {
    const axios = UseAxios();
    const { user } = UseAuth();
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);

    /* ================= FETCH PRODUCTS ================= */
    const { data = {}, isLoading } = useQuery({
        queryKey: ["seller-products", user?.email, page],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(
                `/seller/products?email=${user.email}&page=${page}&limit=${ITEMS_PER_PAGE}`
            );
            return res.data;
        },
    });

    const products = data.products || [];
    const totalPages = Math.ceil((data.total || 0) / ITEMS_PER_PAGE);

    /* ================= DELETE PRODUCT ================= */
    const deleteMutation = useMutation({
        mutationFn: async (id) => axios.delete(`/products/${id}`),
        onSuccess: () => {
            toast.success("Product deleted");
            queryClient.invalidateQueries(["seller-products"]);
        },
    });

    /* ================= TOGGLE STATUS ================= */
    const statusMutation = useMutation({
        mutationFn: async ({ id, status }) =>
            axios.patch(`/products/${id}`, { status }),
        onSuccess: () => {
            toast.success("Status updated");
            queryClient.invalidateQueries(["seller-products"]);
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold">Manage Products</h2>

                <Link to="/dashboard/seller/add-product" className="btn btn-primary text-white">
                    + Add Product
                </Link>
            </div>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto rounded-lg border">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.images?.[0]}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>

                                <td className="font-medium">{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>

                                <td>
                                    <button
                                        onClick={() =>
                                            statusMutation.mutate({
                                                id: product._id,
                                                status:
                                                    product.status === "active" ? "inactive" : "active",
                                            })
                                        }
                                        className={`badge cursor-pointer ${product.status === "active"
                                                ? "badge-success"
                                                : "badge-error"
                                            }`}
                                    >
                                        {product.status}
                                    </button>
                                </td>

                                <td className="flex gap-2 justify-center">
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="btn btn-xs btn-outline"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/dashboard/seller/edit-product/${product._id}`}
                                        className="btn btn-xs btn-info text-white"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => deleteMutation.mutate(product._id)}
                                        className="btn btn-xs btn-error text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {!products.length && (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-400">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ================= PAGINATION ================= */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="btn btn-sm"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num + 1)}
                            className={`btn btn-sm ${page === num + 1 ? "btn-primary" : ""
                                }`}
                        >
                            {num + 1}
                        </button>
                    ))}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="btn btn-sm"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
