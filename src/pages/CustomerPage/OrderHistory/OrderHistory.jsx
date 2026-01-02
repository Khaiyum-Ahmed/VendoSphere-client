import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import UseAxios from "../../../hooks/UseAxios";
import Swal from "sweetalert2";

const OrderHistory = () => {
    const axios = UseAxios();
    const { user } = UseAuth();
    const navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState("");

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders", status, sort, search],
        enabled: !!user?.email,
        queryFn: async () => {
            const params = {
                email: user.email,
                sort,
                search,
            };

            // ✅ Only add status when user selects one
            if (status) {
                params.status = status;
            }

            const res = await axios.get("/orders", { params });
            return res.data;
        },
    });
    console.log("order history details", orders)

    if (isLoading) {
        return <div className="text-center py-20">Loading orders...</div>;
    }

    const handlePay = (order) => {
        console.log("Proceed to payment for", order);
        if (order.status === "paid") {
            Swal.fire({
                icon: "info",
                title: "Already Paid",
                text: "This parcel has already been paid.",
                confirmButtonColor: "#3B82F6",
            });
            return;
        }
        navigate(`/dashboard/customer/payment/${order._id}`);


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
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
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

                                    {/* {order.status === "delivered" ? (
                                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                                            Delivered
                                        </span>
                                    ) : (
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === "paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {order.status === "paid" ? "Paid" : "Unpaid"}
                                        </span>
                                    )} */}
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium capitalize
        ${order.status === "paid" && "bg-green-100 text-green-700"}
        ${order.status === "delivered" && "bg-blue-100 text-blue-700"}
        ${order.status === "shipped" && "bg-yellow-100 text-yellow-700"}
        ${order.status === "pending" && "bg-red-100 text-red-700"}
        `}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td>${order.totalAmount}</td>
                                <td className="space-x-2">
                                    <Link
                                        to={`/dashboard/customer/orders/${order._id}`}
                                        className="btn btn-xs btn-outline"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/reorder/${order._id}`}
                                        className="btn btn-xs btn-primary text-white"
                                    >
                                        Reorder
                                    </Link>
                                    <Link
                                        onClick={() => handlePay(order)}
                                        disabled={order.status !== "pending"}
                                        className={`btn btn-xs text-white ${order.status !== "pending"
                                            ? "btn-success cursor-not-allowed"
                                            : "btn-primary"
                                            }`}
                                    >
                                        {order.status === "pending" ? "Pay" : order.status}
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
                                    to={`/dashboard/customer/orders/${order._id}`}
                                    className="btn btn-sm btn-outline"
                                >
                                    View
                                </Link>
                                <Link
                                    to={`/reorder/${order._id}`}
                                    className="btn btn-sm btn-primary text-white"
                                >
                                    Reorder
                                </Link>
                                <Link
                                    onClick={() => handlePay(order)}
                                    disabled={order.status !== "pending"}
                                    className={`btn btn-xs text-white ${order.status !== "pending"
                                            ? "btn-success cursor-not-allowed"
                                            : "btn-primary"
                                        }`}
                                >
                                    {order.status === "pending" ? "Pay" : order.status}
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
