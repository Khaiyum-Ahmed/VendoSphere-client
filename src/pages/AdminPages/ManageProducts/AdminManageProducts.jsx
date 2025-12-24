import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";

const AdminManageProducts = () => {
    const axios = UseAxios();
    const qc = useQueryClient();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["admin-products"],
        queryFn: async () => (await axios.get("/admin/products")).data,
    });

    console.log(products)

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            axios.patch(`/admin/products/status/${id}`, { status }),
        onSuccess: () => qc.invalidateQueries(["admin-products"]),
    });

    const deleteProduct = (id) => {
        Swal.fire({
            title: "Force Remove Product?",
            text: "This product will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
        }).then((res) => {
            if (res.isConfirmed) {
                axios.delete(`/admin/products/${id}`).then(() => {
                    qc.invalidateQueries(["admin-products"]);
                });
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Products Management</h2>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p._id}>
                                <td>
                                    <Link
                                        to={`/product/${p._id}`}
                                        className="link link-primary"
                                    >
                                        {p._id.slice(0, 8)}...
                                    </Link>
                                </td>
                                <td>{p.name}</td>
                                <td>
                                    {p.sellerId ? (
                                        <Link
                                            to={`/stores/${p.sellerId}`}
                                            className="link link-secondary"
                                        >
                                            {p.sellerName}
                                        </Link>
                                    ) : (
                                        "Unknown"
                                    )}
                                </td>
                                <td>{p.category}</td>
                                <td>
                                    ${p.price}
                                    {p.discount > 0 && (
                                        <span className="ml-1 text-sm text-red-500">
                                            (-{p.discount}%)
                                        </span>
                                    )}
                                </td>
                                <td>{p.stock || 0}</td>
                                <td>
                                    <span className="badge badge-info">{p.status}</span>
                                </td>
                                <td className="space-x-2">
                                    {p.status !== "active" && (
                                        <button
                                            onClick={() =>
                                                statusMutation.mutate({
                                                    id: p._id,
                                                    status: "active",
                                                })
                                            }
                                            className="btn btn-xs btn-success"
                                        >
                                            Approve
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            statusMutation.mutate({
                                                id: p._id,
                                                status: "inactive",
                                            })
                                        }
                                        className="btn btn-xs btn-warning"
                                    >
                                        Inactivate
                                    </button>

                                    <button
                                        onClick={() => deleteProduct(p._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
                {products.map((p) => (
                    <div key={p._id} className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h3 className="font-semibold">{p.productName}</h3>
                            <p>Seller: {p.sellerName}</p>
                            <p>Category: {p.category}</p>
                            <p>Price: ${p.price}</p>
                            <p>Status: {p.status}</p>

                            <div className="flex gap-2 pt-3">
                                <button
                                    onClick={() =>
                                        statusMutation.mutate({
                                            id: p._id,
                                            status: "active",
                                        })
                                    }
                                    className="btn btn-sm btn-success flex-1"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => deleteProduct(p._id)}
                                    className="btn btn-sm btn-error flex-1"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminManageProducts;
