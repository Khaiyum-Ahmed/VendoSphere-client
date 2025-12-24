import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip,
    XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const AdminAnalytics = () => {
    const axios = UseAxios();

    const { data: revenue = [] } = useQuery({
        queryKey: ["revenue-analytics"],
        queryFn: () => axios.get("/admin/analytics/revenue").then(res => res.data),
    });

    const { data: orderStatus = [] } = useQuery({
        queryKey: ["orders-status"],
        queryFn: () => axios.get("/admin/analytics/orders-status").then(res => res.data),
    });

    const { data: topSellers = [] } = useQuery({
        queryKey: ["top-sellers"],
        queryFn: () => axios.get("/admin/analytics/top-sellers").then(res => res.data),
    });

    const { data: topProducts = [] } = useQuery({
        queryKey: ["top-products"],
        queryFn: () => axios.get("/admin/analytics/top-products").then(res => res.data),
    });

    const { data: usersGrowth = [] } = useQuery({
        queryKey: ["users-growth"],
        queryFn: () => axios.get("/admin/analytics/users-growth").then(res => res.data),
    });

    return (
        <div className="space-y-10">
            <h2 className="text-2xl font-bold">Platform Analytics</h2>

            {/* Revenue */}
            <div className="card bg-base-100 p-6 shadow">
                <h3 className="font-semibold mb-4">Revenue Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenue}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line dataKey="revenue" stroke="#570df8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Orders by Status */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-base-100 p-6 shadow">
                    <h3 className="font-semibold mb-4">Orders by Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={orderStatus} dataKey="value" nameKey="name" fill="#8884d8" label />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="card bg-base-100 p-6 shadow">
                    <h3 className="font-semibold mb-4">New User Signups</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={usersGrowth}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line dataKey="users" stroke="#22c55e" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Sellers & Products */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-base-100 p-6 shadow">
                    <h3 className="font-semibold mb-4">Top Sellers</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topSellers}>
                            <XAxis dataKey="seller" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#f59e0b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card bg-base-100 p-6 shadow">
                    <h3 className="font-semibold mb-4">Top Products</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topProducts}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sold" fill="#ef4444" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
