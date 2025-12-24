
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useState } from "react";

const AdminManageOrders = () => {
    const axios = UseAxios();
    const QueryClient = useQueryClient();
    const [statusFilter, setStatusFilter] = useState("");

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["admin-orders", statusFilter],
        queryFn: async () => {
            const res = await axios.get(
                `/admin/orders${statusFilter ? `?status=${statusFilter}` : ""}`
            );
            return res.data;
        },
    });
    console.log(orders)

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            axios.patch(`/admin/orders/status/${id}`, { status }),
        onSuccess: () => QueryClient.invalidateQueries(["admin-orders"]),
    });

    const cancelOrder = (id) => {
        Swal.fire({
            title: "Cancel Order?",
            icon: "warning",
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                axios.patch(`/admin/orders/cancel/${id}`).then(() => {
                    QueryClient.invalidateQueries(["admin-orders"]);
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
            <h2 className="text-2xl font-bold">Orders Management</h2>

            {/* FILTER BAR */}
            <div className="flex flex-wrap gap-4">
                <select
                    className="select select-bordered"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>User</th>
                            <th>Seller</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((o) => (
                            <tr key={o._id}>
                                <td>
                                    <Link to={`/admin/orders/${o._id}`} className="link link-primary">
                                        {o._id.slice(0, 8)}...
                                    </Link>
                                </td>
                                <td>{o.userName}</td>
                                <td>
                                    <Link to={`/stores/${o.sellerId}`} className="link">
                                        {o.sellerName}
                                    </Link>
                                </td>
                                <td>${o.totalAmount}</td>
                                <td>
                                    <span className="badge badge-info">{o.status}</span>
                                </td>
                                <td className="space-x-2">
                                    <select
                                        className="select select-xs"
                                        value={o.status}
                                        onChange={(e) =>
                                            statusMutation.mutate({
                                                id: o._id,
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>

                                    <button
                                        onClick={() => cancelOrder(o._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
                {orders.map((o) => (
                    <div key={o._id} className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h3 className="font-semibold">Order #{o._id.slice(0, 6)}</h3>
                            <p>User: {o.userName}</p>
                            <p>Seller: {o.sellerName}</p>
                            <p>Total: ${o.totalAmount}</p>
                            <p>Status: {o.status}</p>

                            <select
                                className="select select-sm mt-2"
                                value={o.status}
                                onChange={(e) =>
                                    statusMutation.mutate({
                                        id: o._id,
                                        status: e.target.value,
                                    })
                                }
                            >
                                <option value="pending">Pending</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                                onClick={() => cancelOrder(o._id)}
                                className="btn btn-sm btn-error mt-2"
                            >
                                Cancel Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminManageOrders;
