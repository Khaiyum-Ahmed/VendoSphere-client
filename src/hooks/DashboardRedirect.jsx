import { Navigate } from "react-router";
import UseUserRole from "./UseUserRole";

const DashboardRedirect = () => {
    const { role, roleLoading } = UseUserRole(null);

    //  Wait until role is loaded
    if (roleLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    //  Redirect based on role
    if (role === "admin") {
        return <Navigate to="/dashboard/admin" replace />;
    }

    if (role === "seller") {
        return <Navigate to="/dashboard/seller" replace />;
    }

    //  Default → customer
    return <Navigate to="/dashboard/customer" replace />;
};

export default DashboardRedirect;
