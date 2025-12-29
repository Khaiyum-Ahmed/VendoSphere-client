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
} from "react-icons/fa";
import UseAuth from "../../../hooks/UseAuth";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../Loading/Loading";

const CustomerDashboard = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxios();

    /* ================= FETCH ALL ORDERS ================= */
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ["orders", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        },
    });

    console.log("all order history ", orders)
    if (isLoading) return <Loading />;

    /* ================= CALCULATE STATS ================= */
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const paidOrders = orders.filter(o => o.status === "paid").length;
    const shippedOrders = orders.filter(o => o.status === "shipped").length;
    const deliveredOrders = orders.filter(o => o.status === "delivered").length;

    const totalSpent = orders
        .filter(o => o.status === "paid" || o.status === "delivered")
        .reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);

    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    /* ================= NOTIFICATIONS ================= */
    const notifications = orders
        .filter(order =>
            ["paid", "shipped", "delivered"].includes(order.status)
        )
        .slice(0, 5)
        .map(order => {
            if (order.status === "paid") {
                return `💳 Your order #${order._id.slice(-6)} has been paid successfully.`;
            }
            if (order.status === "shipped") {
                return `🚚 Your order #${order._id.slice(-6)} has been shipped.`;
            }
            if (order.status === "delivered") {
                return `📦 Your order #${order._id.slice(-6)} has been delivered.`;
            }
            return null;
        })
        .filter(Boolean);


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

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                <StatCard title="Total Orders" value={totalOrders} icon={<FaShoppingBag />} />
                <StatCard title="Pending" value={pendingOrders} icon={<FaClock />} />
                <StatCard title="Paid" value={paidOrders} icon={<FaMoneyBillWave />} />
                <StatCard title="Shipped" value={shippedOrders} icon={<FaTruck />} />
                <StatCard title="Delivered" value={deliveredOrders} icon={<FaCheckCircle />} />
                <StatCard title="Total Spent" value={`$${totalSpent}`} icon={<FaMoneyBillWave />} />
            </div>

            {/* Shortcuts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Shortcut to="/dashboard/customer/orders" label="My Orders" icon={<FaShoppingBag />} />
                <Shortcut to="/dashboard/customer/wishlist" label="Wishlist" icon={<FaHeart />} />
                <Shortcut to="/profile" label="Profile Settings" icon={<FaUser />} />
            </div>
            {/* Notifications */}
            {notifications.length > 0 && (
                <div className="card bg-base-100 shadow p-6">
                    <h3 className="text-lg font-semibold mb-3">🔔 Notifications</h3>
                    <ul className="space-y-2">
                        {notifications.map((note, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                                • {note}
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
                                {recentOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id.slice(-6)}</td>
                                        <td>${order.totalAmount}</td>
                                        <td className="capitalize">{order.status}</td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={`/dashboard/customer/orders/${order._id}`}
                                                className="btn btn-primary btn-xs text-white"
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

/* ================= REUSABLE ================= */

const StatCard = ({ title, value, icon }) => (
    <div className="card bg-base-100 shadow p-4 flex items-center gap-4">
        <div className="text-3xl text-primary">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-xl font-bold">{value}</h3>
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
