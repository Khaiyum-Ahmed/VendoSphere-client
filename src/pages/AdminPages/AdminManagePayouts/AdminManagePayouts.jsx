import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Swal from "sweetalert2";

const AdminManagePayouts = () => {
    const axios = UseAxios();
    const QueryClient = useQueryClient();

    const { data: payouts = [], isLoading } = useQuery({
        queryKey: ["admin-payouts"],
        queryFn: async () => {
            const res = await axios.get("/admin/payouts");
            return res.data;
        },
    });

    const updateStatus = useMutation({
        mutationFn: ({ id, status, adminNotes }) =>
            axios.patch(`/admin/payouts/${id}`, { status, adminNotes }),
        onSuccess: () => QueryClient.invalidateQueries(["admin-payouts"]),
    });

    const handleAction = (payout, status) => {
        Swal.fire({
            title: `Confirm ${status}`,
            input: "textarea",
            inputLabel: "Admin Notes (optional)",
            showCancelButton: true,
        }).then((res) => {
            if (res.isConfirmed) {
                updateStatus.mutate({
                    id: payout._id,
                    status,
                    adminNotes: res.value,
                });
            }
        });
    };

    if (isLoading) {
        return <div className="loading loading-spinner loading-lg mx-auto"></div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Payouts Management</h2>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Seller</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payouts.map((p) => (
                            <tr key={p._id}>
                                <td>{p._id.slice(0, 8)}...</td>
                                <td>{p.sellerName}</td>
                                <td>${p.amount}</td>
                                <td>
                                    <span className="badge badge-info">{p.status}</span>
                                </td>
                                <td>{new Date(p.requestedAt).toLocaleDateString()}</td>
                                <td className="space-x-2">
                                    {p.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => handleAction(p, "approved")}
                                                className="btn btn-xs btn-success"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleAction(p, "rejected")}
                                                className="btn btn-xs btn-error"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {p.status === "approved" && (
                                        <button
                                            onClick={() => handleAction(p, "paid")}
                                            className="btn btn-xs btn-primary"
                                        >
                                            Mark Paid
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE */}
            <div className="md:hidden space-y-4">
                {payouts.map((p) => (
                    <div key={p._id} className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h3 className="font-semibold">{p.sellerName}</h3>
                            <p>Amount: ${p.amount}</p>
                            <p>Status: {p.status}</p>

                            {p.status === "pending" && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAction(p, "approved")}
                                        className="btn btn-sm btn-success"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(p, "rejected")}
                                        className="btn btn-sm btn-error"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminManagePayouts;
