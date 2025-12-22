import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import Loading from "../../Loading/Loading";

const SellerDashboardHome = () => {
    const axiosSecure = UseAxios();
    const { user } = UseAuth();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["seller-dashboard-overview", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/seller/dashboard-overview?email=${user.email}`
            );
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    const {
        totalProducts,
        activeOrders,
        pendingEarnings,
        totalRevenue,
        recentOrders = [],
    } = data;

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold">Seller Dashboard</h2>

                <Link
                    to="/dashboard/seller/add-product"
                    className="btn btn-primary btn-md text-white w-fit"
                >
                    + Add Product
                </Link>
            </div>

            {/* STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Products" value={totalProducts} />
                <StatCard title="Active Orders" value={activeOrders} />
                <StatCard title="Pending Earnings" value={`$${pendingEarnings}`} />
                <StatCard title="Total Revenue" value={`$${totalRevenue}`} />
            </div>

            {/* RECENT ORDERS */}
            <div className="bg-base-100 shadow rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

                {recentOrders.length === 0 ? (
                    <p className="text-gray-500">No recent orders found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="font-mono text-xs">
                                            {order._id.slice(0, 8)}...
                                        </td>
                                        <td>{order.customerName}</td>
                                        <td>${order.totalAmount}</td>
                                        <td>
                                            <span className="badge badge-outline">
                                                {order.status}
                                            </span>
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

export default SellerDashboardHome;

/* STAT CARD COMPONENT */
const StatCard = ({ title, value }) => {
    return (
        <div className="card bg-base-100 shadow p-4">
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
    );
};
