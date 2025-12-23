import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageUsers = () => {
    const axios = UseAxios();
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["admin-users"],
        queryFn: async () => {
            const res = await axios.get("/admin/users");
            return res.data;
        },
    });

    const statusMutation = useMutation({
        mutationFn: ({ id, status }) =>
            axios.patch(`/admin/users/${id}/status`, { status }),
        onSuccess: () => queryClient.invalidateQueries(["admin-users"]),
    });

    const deleteUser = (id) => {
        Swal.fire({
            title: "Delete user?",
            text: "This action is permanent!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/admin/users/${id}`).then(() => {
                    queryClient.invalidateQueries(["admin-users"]);
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
            <h2 className="text-2xl font-bold">Users Management</h2>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
                <table className="table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td>
                                    <Link
                                        to={`/admin/users/${u._id}`}
                                        className="link link-primary"
                                    >
                                        {u._id.slice(0, 8)}...
                                    </Link>
                                </td>

                                <td>{u.name || "N/A"}</td>

                                <td>
                                    <a href={`mailto:${u.email}`} className="link">
                                        {u.email}
                                    </a>
                                </td>

                                <td>{u.phone || "—"}</td>

                                <td>
                                    <span
                                        className={`badge ${u.status === "active"
                                                ? "badge-success"
                                                : "badge-error"
                                            }`}
                                    >
                                        {u.status || "active"}
                                    </span>
                                </td>

                                <td className="space-x-2">
                                    <button
                                        onClick={() =>
                                            statusMutation.mutate({
                                                id: u._id,
                                                status:
                                                    u.status === "active" ? "suspended" : "active",
                                            })
                                        }
                                        className="btn btn-xs btn-warning"
                                    >
                                        {u.status === "active" ? "Suspend" : "Activate"}
                                    </button>

                                    <button
                                        onClick={() => deleteUser(u._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="md:hidden space-y-4">
                {users.map((u) => (
                    <div key={u._id} className="card bg-base-100 shadow">
                        <div className="card-body space-y-2">
                            <p className="text-sm">
                                <b>ID:</b> {u._id.slice(0, 10)}...
                            </p>
                            <p><b>Name:</b> {u.name || "N/A"}</p>
                            <p className="break-all">
                                <b>Email:</b> {u.email}
                            </p>
                            <p><b>Phone:</b> {u.phone || "—"}</p>

                            <span
                                className={`badge ${u.status === "active"
                                        ? "badge-success"
                                        : "badge-error"
                                    }`}
                            >
                                {u.status || "active"}
                            </span>

                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={() =>
                                        statusMutation.mutate({
                                            id: u._id,
                                            status:
                                                u.status === "active" ? "suspended" : "active",
                                        })
                                    }
                                    className="btn btn-sm btn-warning flex-1"
                                >
                                    {u.status === "active" ? "Suspend" : "Activate"}
                                </button>

                                <button
                                    onClick={() => deleteUser(u._id)}
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

export default ManageUsers;
