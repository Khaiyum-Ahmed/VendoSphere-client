import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import Loading from "../../Loading/Loading";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const SellerSalesReport = () => {
    const axios = UseAxios();
    const { user } = UseAuth();

    const { data, isLoading } = useQuery({
        queryKey: ["seller-sales-report", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/seller/sales-report?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const revenueLabels = Object.keys(data.revenueByMonth).reverse();
    const revenueData = Object.values(data.revenueByMonth).reverse();

    const statusLabels = Object.keys(data.ordersByStatus);
    const statusData = Object.values(data.ordersByStatus);

    return (
        <div className="p-4 md:p-6 space-y-8">
            <h2 className="text-2xl font-bold">Sales Report</h2>

            {/* Revenue Over Time */}
            <div className="bg-base-200 p-4 md:p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Revenue (Last 12 Months)</h3>
                <Line
                    data={{
                        labels: revenueLabels,
                        datasets: [
                            {
                                label: "Revenue ($)",
                                data: revenueData,
                                borderColor: "rgb(34,197,94)",
                                backgroundColor: "rgba(34,197,94,0.2)",
                                tension: 0.3,
                                fill: true,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: { legend: { position: "top" } },
                    }}
                />
            </div>

            {/* Orders by Status */}
            <div className="bg-base-200 p-4 md:p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Orders by Status</h3>
                <Pie
                    data={{
                        labels: statusLabels,
                        datasets: [
                            {
                                label: "# of Orders",
                                data: statusData,
                                backgroundColor: [
                                    "#10B981", // completed
                                    "#F59E0B", // pending
                                    "#EF4444", // cancelled
                                    "#3B82F6", // shipped
                                ],
                            },
                        ],
                    }}
                    options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
                />
            </div>
        </div>
    );
};

export default SellerSalesReport;
