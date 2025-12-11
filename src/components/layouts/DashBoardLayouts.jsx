import { NavLink, Outlet } from "react-router";
import { FaBoxes, FaBoxOpen, FaChartLine, FaCheckCircle, FaClipboardList, FaDollarSign, FaEdit, FaHeart, FaHome, FaList, FaMoneyBillWave, FaMotorcycle, FaPlusCircle, FaRoute, FaShoppingBag, FaSignOutAlt, FaStore, FaTasks, FaUser, FaUserCheck, FaUserClock, FaUserEdit, FaUsersCog, FaUserShield, FaWallet } from "react-icons/fa";
import VendoSphereLogo from "../shared/Logo/VendoSphereLogo";
import UseUserRole from "../../hooks/UseUserRole";
import UseAuth from "../../hooks/UseAuth";

const DashBoardLayouts = () => {
    const { logOutUser } = UseAuth();
    const { role, roleLoading } = UseUserRole();
    console.log(role)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">DashBoard</div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 space-y-4">
                    {/* Sidebar content here */}
                    <VendoSphereLogo></VendoSphereLogo>

                    <li>
                        <NavLink to="/dashboard" className="flex items-center gap-3">
                            <FaHome className="text-xl" /> Home
                        </NavLink>
                    </li>

                    {/* Customer link */}

                    {!roleLoading && role === 'customer' && <>
                        <li>
                            <NavLink to="/dashboard/orders" className="flex items-center gap-3">
                                <FaShoppingBag className="text-xl" /> My Orders
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/wishlist" className="flex items-center gap-3">
                                <FaHeart className="text-xl" /> Wishlist
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/profile" className="flex items-center gap-3">
                                <FaUser className="text-xl" /> My Profile
                            </NavLink>
                        </li>

                    </>}


                    {/* sellers link */}

                    {!roleLoading && role === 'seller' && <>

                        <li>
                            <NavLink
                                to="/dashboard/products"
                                className="flex items-center gap-3"
                            >
                                <FaBoxOpen className="text-xl" /> My Products
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/add-product"
                                className="flex items-center gap-3"
                            >
                                <FaPlusCircle className="text-xl" /> Add Product
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/manage-products"
                                className="flex items-center gap-3"
                            >
                                <FaEdit className="text-xl" /> Manage Products
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/orders"
                                className="flex items-center gap-3"
                            >
                                <FaClipboardList className="text-xl" /> Orders Received
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/earnings"
                                className="flex items-center gap-3"
                            >
                                <FaDollarSign className="text-xl" /> Earnings
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/sales-report"
                                className="flex items-center gap-3"
                            >
                                <FaChartLine className="text-xl" /> Sales Report
                            </NavLink>
                        </li>


                    </>}

                    {/* Admin link */}

                    {
                        !roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard/manage-users"
                                    className="flex items-center gap-3"
                                >
                                    <FaUsersCog className="text-xl" /> Manage Users
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/manage-sellers"
                                    className="flex items-center gap-3"
                                >
                                    <FaUserShield className="text-xl" /> Manage Sellers
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/manage-products"
                                    className="flex items-center gap-3"
                                >
                                    <FaBoxes className="text-xl" /> Manage Products
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/manage-orders"
                                    className="flex items-center gap-3"
                                >
                                    <FaClipboardList className="text-xl" /> Manage Orders
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/manage-categories"
                                    className="flex items-center gap-3"
                                >
                                    <FaList className="text-xl" /> Manage Categories
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/withdraw-requests"
                                    className="flex items-center gap-3"
                                >
                                    <FaStore className="text-xl" /> Withdraw Requests
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard/profile"
                                    className="flex items-center gap-3"
                                >
                                    <FaUserShield className="text-xl" /> Admin Profile
                                </NavLink>
                            </li>

                        </>
                    }
                    <li>
                        <button
                            onClick={logOutUser}
                            className="flex items-center gap-3 text-red-500 hover:text-red-700"
                        >
                            <FaSignOutAlt className="text-xl" /> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div >
    );
};

export default DashBoardLayouts;