import UseUserRole from "../../../hooks/UseUserRole";
import Forbidden from "../../Forbidden/Forbidden";
import Loading from "../../Loading/Loading";
import AdminDashboard from "../DashboardHomeRole/AdminDashboard";
import SellerDashboard from "../DashboardHomeRole/SellerDashboard";
import CustomerDashboard from "../DashboardHomeRole/CustomerDashboard";

const DashboardHome = () => {
    const { role, roleLoading } = UseUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'customer') {
        return <CustomerDashboard></CustomerDashboard>
    }
    else if (role === "seller") {
        return <SellerDashboard></SellerDashboard>
    }
    else if (role === "admin") {
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;