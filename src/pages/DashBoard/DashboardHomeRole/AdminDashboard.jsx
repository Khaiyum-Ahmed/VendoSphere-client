import { useQuery } from "@tanstack/react-query";
import {
    FaUsers,
    FaStore,
    FaBoxOpen,
    FaClipboardList,
    FaMoneyCheckAlt,
    FaUserClock,
} from "react-icons/fa";
import { Link } from "react-router";
import UseAxios from "../../../hooks/UseAxios";

const AdminDashboard = () => {
    const axios = UseAxios();

    /* ================= OVERVIEW ================= */
    const { data = {}, isLoading } = useQuery({
        queryKey: ["admin-overview"],
        queryFn: async () => {
            const res = await axios.get("/admin/overview");
            return res.data;
        },
    });

    /* ================= PAYOUT SUMMARY ================= */
    const { data: payoutSummary = {} } = useQuery({
        queryKey: ["payout-summary"],
        queryFn: async () => {
            const res = await axios.get("/admin/payouts/summary");
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    const stats = [
        {
            title: "Total Users",
            value: data.totalUsers,
            icon: <FaUsers />,
        },
        {
            title: "Total Sellers",
            value: data.totalSellers,
            icon: <FaStore />,
        },
        {
            title: "Pending Sellers",
            value: data.pendingSellers,
            icon: <FaUserClock />,
        },
        {
            title: "Total Products",
            value: data.totalProducts,
            icon: <FaBoxOpen />,
        },
        {
            title: "Total Orders",
            value: data.totalOrders,
            icon: <FaClipboardList />,
        },
        {
            title: "Pending Withdraw Requests",
            value: data.pendingWithdraws,
            icon: <FaMoneyCheckAlt />,
        },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>

            {/* ================= STATS GRID ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="card bg-base-100 shadow hover:shadow-lg transition"
                    >
                        <div className="card-body flex flex-row items-center gap-4">
                            <div className="text-4xl text-primary">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    {item.title}
                                </p>
                                <h3 className="text-2xl font-bold">
                                    {item.value ?? 0}
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}

                {/* ================= 💰 PENDING PAYOUT TOTAL ================= */}
                <Link to="manage-payouts">
                    <div className="card bg-warning/10 border border-warning shadow hover:shadow-xl transition cursor-pointer">
                        <div className="card-body flex flex-row items-center gap-4">
                            <div className="text-4xl text-warning">
                                <FaMoneyCheckAlt />
                            </div>
                            <div>
                                <p className="text-sm text-warning">
                                    Pending Payout Total
                                </p>
                                <h3 className="text-2xl font-bold text-warning">
                                    ${payoutSummary.pendingTotal || 0}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Click to review payouts
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
