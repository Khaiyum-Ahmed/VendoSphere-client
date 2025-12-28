import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
    FaShoppingBag,
    FaHeart,
    FaClock,
    FaCheckCircle,
    FaTruck,
    FaMoneyBillWave,
    FaUser,
    FaBell,
} from "react-icons/fa";
import UseAuth from "../../../hooks/UseAuth";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../Loading/Loading";

const CustomerDashboard = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxios();

    /* ================= STATS ================= */
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["customer-stats", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/customer-stats?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    /* ================= RECENT ORDERS ================= */
    const { data: recentOrders = [] } = useQuery({
        queryKey: ["recent-orders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/recent-orders?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
console.log(recentOrders)
    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-8 space-y-10">
            {/* Greeting */}
            <div>
                <h2 className="text-3xl font-bold">
                    Hello, {user?.displayName || "Customer"} 👋
                </h2>
                <p className="text-gray-500">
                    Welcome back! Here’s a quick overview of your account.
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaShoppingBag />} />
                <StatCard title="Pending" value={stats.pendingOrders} icon={<FaClock />} />
                <StatCard title="Shipped" value={stats.shippedOrders} icon={<FaTruck />} />
                <StatCard title="Delivered" value={stats.deliveredOrders} icon={<FaCheckCircle />} />
                <StatCard title="Wishlist" value={stats.wishlistCount} icon={<FaHeart />} />
                <StatCard title="Total Spent" value={`$${stats.totalSpent || 0}`} icon={<FaMoneyBillWave />} />
            </div>

            {/* Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Shortcut to="/dashboard/customer/orders" label="My Orders" icon={<FaShoppingBag />} />
                <Shortcut to="/dashboard/customer/wishlist" label="Wishlist" icon={<FaHeart />} />
                <Shortcut to="/dashboard/customer/profile" label="Profile Settings" icon={<FaUser />} />
            </div>

            {/* Notifications (Optional) */}
            {stats.notifications?.length > 0 && (
                <div className="card bg-base-100 shadow p-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <FaBell /> Notifications
                    </h3>
                    <ul className="mt-3 space-y-2">
                        {stats.notifications.map((n, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                                • {n}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Recent Orders */}
            <div>
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
                                        <td>${order.totalAmount}</td>
                                        <td className="capitalize">{order.status}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={`/dashboard/customer/orders/${order._id}`}
                                                className="btn btn-primary btn-xs"
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

/* ================= REUSABLE COMPONENTS ================= */

const StatCard = ({ title, value, icon }) => (
    <div className="card bg-base-100 shadow p-4 flex flex-row items-center gap-4">
        <div className="text-3xl text-primary">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-xl font-bold">{value || 0}</h3>
        </div>
    </div>
);

const Shortcut = ({ to, label, icon }) => (
    <Link to={to} className="card bg-base-100 shadow hover:shadow-lg transition p-5 flex items-center gap-4">
        <div className="text-2xl text-primary">{icon}</div>
        <h3 className="font-semibold">{label}</h3>
    </Link>
);

export default CustomerDashboard;
