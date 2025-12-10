
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaShoppingBag, FaHeart, FaClock, FaCheckCircle } from "react-icons/fa";
import UseAuth from "../../../hooks/UseAuth";
import UseAxios from "../../../hooks/UseAxios";

const CustomerDashboard = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxios();

    // Fetch customer stats
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["customer-stats", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/customer-stats?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Fetch recent orders
    const { data: recentOrders = [] } = useQuery({
        queryKey: ["recent-orders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/recent-orders?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) {
        return <div className="text-center py-20">Loading dashboard...</div>;
    }

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="card bg-primary text-white shadow-xl p-5">
                    <div className="flex items-center gap-4">
                        <FaShoppingBag size={32} />
                        <div>
                            <p className="text-lg">Total Orders</p>
                            <h2 className="text-2xl font-bold">{stats.totalOrders || 0}</h2>
                        </div>
                    </div>
                </div>

                <div className="card bg-warning text-black shadow-xl p-5">
                    <div className="flex items-center gap-4">
                        <FaClock size={32} />
                        <div>
                            <p className="text-lg">Pending</p>
                            <h2 className="text-2xl font-bold">{stats.pendingOrders || 0}</h2>
                        </div>
                    </div>
                </div>

                <div className="card bg-success text-white shadow-xl p-5">
                    <div className="flex items-center gap-4">
                        <FaCheckCircle size={32} />
                        <div>
                            <p className="text-lg">Delivered</p>
                            <h2 className="text-2xl font-bold">{stats.deliveredOrders || 0}</h2>
                        </div>
                    </div>
                </div>

                <div className="card bg-pink-500 text-white shadow-xl p-5">
                    <div className="flex items-center gap-4">
                        <FaHeart size={32} />
                        <div>
                            <p className="text-lg">Wishlist</p>
                            <h2 className="text-2xl font-bold">{stats.wishlistCount || 0}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>

                {recentOrders.length === 0 ? (
                    <p className="text-gray-500">No orders found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id.slice(-6)}</td>
                                        <td>${order.total}</td>
                                        <td className="capitalize">{order.status}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={`/dashboard/customer/order/${order._id}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerDashboard;
