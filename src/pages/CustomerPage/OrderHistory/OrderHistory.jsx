import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import UseAxios from "../../../hooks/UseAxios";

const OrderHistory = () => {
    const axios = UseAxios();
    const { user } = UseAuth();

    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState("");

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders", status, sort, search],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(
                `/orders?email=${user.email}&status=${status}&sort=${sort}&search=${search}`
            );
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="text-center py-20">Loading orders...</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Order History</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <input
                    type="text"
                    placeholder="Search Order ID"
                    className="input input-bordered"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="select select-bordered"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                </select>

                <select
                    className="select select-bordered"
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
                <table className="table hidden md:table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <span className="badge badge-outline">{order.status}</span>
                                </td>
                                <td>${order.totalAmount}</td>
                                <td className="space-x-2">
                                    <Link
                                        to={`/account/orders/${order._id}`}
                                        className="btn btn-xs btn-outline"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/reorder/${order._id}`}
                                        className="btn btn-xs btn-primary"
                                    >
                                        Reorder
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Mobile Cards */}
                <div className="grid gap-4 md:hidden">
                    {orders.map((order) => (
                        <div key={order._id} className="card bg-base-100 shadow p-4">
                            <p><strong>ID:</strong> {order._id}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Total:</strong> ${order.totalAmount}</p>

                            <div className="flex gap-2 mt-2">
                                <Link
                                    to={`/account/orders/${order._id}`}
                                    className="btn btn-sm btn-outline"
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/reorder/${order._id}`}
                                    className="btn btn-sm btn-primary"
                                >
                                    Reorder
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;
