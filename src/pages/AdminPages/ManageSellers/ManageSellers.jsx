import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageSellers = () => {
    const axios = UseAxios();
    const QueryClient = useQueryClient();

    const { data: sellers = [], isLoading } = useQuery({
        queryKey: ["admin-sellers"],
        queryFn: async () => (await axios.get("/admin/sellers")).data,
    });

    // console.log(sellers)
    const statusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            axios.patch(`/admin/sellers/status/${id}`, { status }),
        onSuccess: () => QueryClient.invalidateQueries(["admin-sellers"]),
    });

    const deleteSeller = (id) => {
        Swal.fire({
            title: "Delete Seller?",
            text: "All seller products will be removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
        }).then((res) => {
            if (res.isConfirmed) {
                axios.delete(`/admin/sellers/${id}`).then(() => {
                    QueryClient.invalidateQueries(["admin-sellers"]);
                });
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Sellers Management</h2>

            {/* DESKTOP */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Store</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((s) => (
                            <tr key={s._id}>
                                <td>
                                    <Link to={`/stores/${s._id}`} className="link link-primary">
                                        {s._id.slice(0, 8)}...
                                    </Link>
                                </td>
                                <td>{s.shopName}</td>
                                <td>{s.email}</td>
                                <td>
                                    <span className="badge badge-info">{s.status}</span>
                                </td>
                                <td>⭐ {s.rating}</td>
                                <td className="space-x-2">
                                    {s.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    statusMutation.mutate({
                                                        id: s._id,
                                                        status: "approved",
                                                    })
                                                }
                                                className="btn btn-xs btn-success"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() =>
                                                    statusMutation.mutate({
                                                        id: s._id,
                                                        status: "rejected",
                                                    })
                                                }
                                                className="btn btn-xs btn-warning"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() =>
                                            statusMutation.mutate({
                                                id: s._id,
                                                status: "suspended",
                                            })
                                        }
                                        className="btn btn-xs btn-error"
                                    >
                                        Suspend
                                    </button>

                                    <button
                                        onClick={() => deleteSeller(s._id)}
                                        className="btn btn-xs btn-outline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE */}
            <div className="md:hidden space-y-4">
                {sellers.map((s) => (
                    <div key={s._id} className="card bg-base-100 shadow">
                        <div className="card-body">
                            <p><b>Store:</b> {s.storeName}</p>
                            <p><b>Email:</b> {s.email}</p>
                            <p><b>Status:</b> {s.status}</p>
                            <p><b>Rating:</b> ⭐ {s.rating}</p>

                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={() =>
                                        statusMutation.mutate({
                                            id: s._id,
                                            status: "approved",
                                        })
                                    }
                                    className="btn btn-sm btn-success flex-1"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => deleteSeller(s._id)}
                                    className="btn btn-sm btn-error flex-1"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageSellers;
