import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../Loading/Loading";
import toast from "react-hot-toast";

const SellerOrders = () => {
    const axios = UseAxios();
    const { user } = UseAuth();
    const queryClient = useQueryClient();

    const [statusFilter, setStatusFilter] = useState("");

    /* ================= FETCH ORDERS ================= */
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["seller-orders", user?.email, statusFilter],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(
                `/seller/orders?email=${user.email}&status=${statusFilter}`
            );
            return res.data;
        },
    });

    /* ================= UPDATE STATUS ================= */
    const statusMutation = useMutation({
        mutationFn: async ({ id, status }) =>
            axios.patch(`/orders/${id}`, { status }),
        onSuccess: () => {
            toast.success("Order status updated");
            queryClient.invalidateQueries(["seller-orders"]);
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <h2 className="text-2xl font-bold">Orders Received</h2>

                <select
                    className="select select-bordered w-full md:w-48"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto border rounded-lg">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Products</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td className="font-mono text-xs">
                                    {order._id.slice(0, 8)}...
                                </td>

                                <td>{order.customerName}</td>

                                <td>
                                    {order.items.slice(0, 2).map((item) => (
                                        <p key={item.productId} className="text-sm">
                                            {item.name} × {item.quantity}
                                        </p>
                                    ))}
                                    {order.items.length > 2 && (
                                        <span className="text-xs text-gray-400">
                                            +{order.items.length - 2} more
                                        </span>
                                    )}
                                </td>

                                <td>${order.totalAmount}</td>

                                <td>
                                    <span
                                        className={`badge ${order.status === "pending"
                                                ? "badge-warning"
                                                : order.status === "shipped"
                                                    ? "badge-info"
                                                    : order.status === "delivered"
                                                        ? "badge-success"
                                                        : "badge-error"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            statusMutation.mutate({
                                                id: order._id,
                                                status: e.target.value,
                                            })
                                        }
                                        className="select select-sm select-bordered"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}

                        {!orders.length && (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-400">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerOrders;
