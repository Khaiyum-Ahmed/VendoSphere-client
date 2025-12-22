import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import toast from "react-hot-toast";
import Loading from "../../Loading/Loading";

const SellerEarnings = () => {
    const axios = UseAxios();
    const { user } = UseAuth();
    const queryClient = useQueryClient();

    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("Bank");

    /* ================= FETCH EARNINGS ================= */
    const { data = {
        totalRevenue: 0,
        balance: 0,
        pendingPayouts: 0,
        paidOut: 0,
        payouts: []
    }, isLoading } = useQuery({
        queryKey: ["seller-earnings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get("/seller/earnings"); // ✅ JWT based
            return res.data;
        },
    });

    /* ================= REQUEST PAYOUT ================= */
    const payoutMutation = useMutation({
        mutationFn: async () => {
            return axios.post("/seller/payouts", {
                amount: Number(amount),
                method,
            });
        },
        onSuccess: () => {
            toast.success("Payout request submitted successfully");
            setAmount("");
            queryClient.invalidateQueries(["seller-earnings", user?.email]);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Payout request failed");
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 md:p-6 space-y-6">
            {/* ================= HEADER ================= */}
            <h2 className="text-2xl font-bold">Earnings & Payouts</h2>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value">${data.totalRevenue}</div>
                </div>

                <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Available Balance</div>
                    <div className="stat-value text-success">
                        ${data.balance}
                    </div>
                </div>

                <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Pending Payouts</div>
                    <div className="stat-value text-warning">
                        ${data.pendingPayouts}
                    </div>
                </div>

                <div className="stat bg-base-200 rounded-lg">
                    <div className="stat-title">Paid Out</div>
                    <div className="stat-value text-info">
                        ${data.paidOut}
                    </div>
                </div>
            </div>

            {/* ================= REQUEST PAYOUT ================= */}
            <div className="card bg-base-200 p-4 md:p-6">
                <h3 className="text-lg font-semibold mb-4">
                    Request a Payout
                </h3>

                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="number"
                        min={50}
                        placeholder="Minimum $50"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="input input-bordered w-full md:w-1/3"
                    />

                    <select
                        className="select select-bordered w-full md:w-1/3"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <option value="Bank">Bank</option>
                        <option value="bKash">bKash</option>
                        <option value="PayPal">PayPal</option>
                    </select>

                    <button
                        onClick={() => payoutMutation.mutate()}
                        disabled={
                            payoutMutation.isLoading ||
                            amount < 50 ||
                            amount > data.balance
                        }
                        className="btn btn-primary text-white w-full md:w-auto"
                    >
                        {payoutMutation.isLoading
                            ? "Processing..."
                            : "Request"}
                    </button>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                    Minimum payout amount is $50
                </p>
            </div>

            {/* ================= PAYOUT HISTORY ================= */}
            <div className="overflow-x-auto border rounded-lg">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.payouts.map((payout) => (
                            <tr key={payout._id}>
                                <td className="font-mono text-xs">
                                    {payout._id.slice(0, 8)}...
                                </td>
                                <td>${payout.amount}</td>
                                <td>{payout.method}</td>
                                <td>
                                    <span
                                        className={`badge ${payout.status === "pending"
                                                ? "badge-warning"
                                                : payout.status === "approved"
                                                    ? "badge-info"
                                                    : payout.status === "paid"
                                                        ? "badge-success"
                                                        : "badge-error"
                                            }`}
                                    >
                                        {payout.status}
                                    </span>
                                </td>
                                <td>
                                    {new Date(
                                        payout.createdAt
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}

                        {!data.payouts.length && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-8 text-gray-400"
                                >
                                    No payout history found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SellerEarnings;
