import { NavLink, Outlet, useNavigate } from "react-router";
import {
    FaBoxes,
    FaBoxOpen,
    FaChartBar,
    FaChartLine,
    FaClipboardList,
    FaDollarSign,
    FaEdit,
    FaHeart,
    FaHome,
    FaList,
    FaPlusCircle,
    FaShoppingBag,
    FaSignOutAlt,
    FaStore,
    FaUser,
    FaUserCircle,
    FaUsersCog,
    FaUserShield,
} from "react-icons/fa";
import VendoSphereLogo from "../shared/Logo/VendoSphereLogo";
import UseUserRole from "../../hooks/UseUserRole";
import UseAuth from "../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../hooks/UseAxios";

const DashBoardLayouts = () => {
    const navigate = useNavigate();
    const { logOutUser, user } = UseAuth();
    const { role, roleLoading } = UseUserRole();
    const axios = UseAxios();

    // Fetch seller info to get _id
   const { data: sellerData } = useQuery({
  queryKey: ["seller-info", user?.email],
  queryFn: async () => {
    if (!user?.email) return null;
    const res = await axios.get(`/seller/profile?email=${user.email}`);
    return res.data; // should include _id
  },
  enabled: !!user?.email,
});

    console.log("seller data" , sellerData)

    const sellerId = sellerData?._id;

    const handleLogout = async () => {
        await logOutUser();
        navigate("/login");
    };

    if (roleLoading || !role ) {
        return (
            <div className="h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }


    console.log("USER ROLE:", role);
    console.log("seller Id", sellerId)
    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* ================= CONTENT ================= */}
            <div className="drawer-content flex flex-col">
                {/* Mobile Navbar */}
                <div className="navbar bg-base-200 lg:hidden">
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost btn-square">
                        ☰
                    </label>
                    <span className="ml-2 font-semibold">Dashboard</span>
                </div>

                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-2">
                    <VendoSphereLogo />

            
                    {/* CUSTOMER */}
                    {role === "customer" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/customer">
                                    <FaHome /> Dashboard Home
                                </NavLink>
                            </li>
                            <li><NavLink to="/dashboard/customer/orders"><FaShoppingBag /> My Orders</NavLink></li>
                            <li><NavLink to="/dashboard/customer/wishlist"><FaHeart /> Wishlist</NavLink></li>
                            <li><NavLink to="/dashboard/customer/profile"><FaUser /> Profile</NavLink></li>
                        </>
                    )}

                    {/* SELLER */}
                    {role === "seller" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/seller">
                                    <FaHome /> Dashboard Home
                                </NavLink>
                            </li>
                            <li><NavLink to="/dashboard/seller/products"><FaBoxOpen /> My Products</NavLink></li>
                            <li><NavLink to="/dashboard/seller/add-product"><FaPlusCircle /> Add Product</NavLink></li>
                            <li><NavLink to="/dashboard/seller/manage-products"><FaEdit /> Manage Products</NavLink></li>
                            <li><NavLink to="/dashboard/seller/orders"><FaClipboardList /> Orders</NavLink></li>
                            <li><NavLink to="/dashboard/seller/earnings"><FaDollarSign /> Earnings</NavLink></li>
                            <li><NavLink to="/dashboard/seller/sales-report"><FaChartLine /> Sales Report</NavLink></li>
                            <li><NavLink to="/dashboard/seller/seller-profile"><FaUserCircle />Profile Management</NavLink></li>

                            {/* View My Store */}
                            {sellerId && (
                                <li>
                                    <NavLink to={`/stores/${sellerId}`}>
                                        <FaStore /> View My Store
                                    </NavLink>
                                </li>
                            )}
                        </>
                    )}

                    {/* ADMIN */}
                    {role === "admin" && (
                        <>
                            <li>
                                <NavLink to="/dashboard/admin">
                                    <FaHome /> Dashboard Home
                                </NavLink>
                            </li>
                            <li><NavLink to="/dashboard/admin/manage-users"><FaUsersCog /> Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/admin/manage-sellers"><FaUserShield /> Manage Sellers</NavLink></li>
                            <li><NavLink to="/dashboard/admin/manage-products"><FaBoxes /> Manage Products</NavLink></li>
                            <li><NavLink to="/dashboard/admin/manage-orders"><FaClipboardList /> Manage Orders</NavLink></li>
                            <li><NavLink to="/dashboard/admin/manage-payouts"><FaStore /> Withdraw Requests</NavLink></li>
                            <li><NavLink to="/dashboard/admin/admin-analytics"><FaChartBar /> Analytics </NavLink></li>
                        </>
                    )}

                    <div className="divider"></div>

                    <li>
                        <button onClick={handleLogout} className="text-red-500">
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayouts;
