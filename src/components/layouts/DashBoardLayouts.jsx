import { NavLink, Outlet } from "react-router";
import { FaBoxOpen, FaCheckCircle, FaHeart, FaHome, FaMoneyBillWave, FaMotorcycle, FaRoute, FaShoppingBag, FaSignOutAlt, FaTasks, FaUser, FaUserCheck, FaUserClock, FaUserEdit, FaUserShield, FaWallet } from "react-icons/fa";
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
                            <NavLink to="/dashboard/customer/orders" className="flex items-center gap-3">
                                <FaShoppingBag className="text-xl" /> My Orders
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/customer/wishlist" className="flex items-center gap-3">
                                <FaHeart className="text-xl" /> Wishlist
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/dashboard/customer/profile" className="flex items-center gap-3">
                                <FaUser className="text-xl" /> My Profile
                            </NavLink>
                        </li>

                    </>}


                    {/* sellers link */}

                    {!roleLoading && role === 'seller' && <>
                        <li>
                            <NavLink to="/dashboard/pending-deliveries">
                                <FaTasks className="inline-block mr-2" />
                                Pending Deliveries
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/completed-deliveries">
                                <FaCheckCircle className="inline-block mr-2" />
                                Completed Deliveries
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-earnings">
                                <FaWallet className="inline-block mr-2" />
                                My Earnings
                            </NavLink>
                        </li>

                    </>}

                    {/* Admin link */}

                    {
                        !roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/assign-rider">
                                    <FaMotorcycle className="inline-block mr-2" />
                                    Assign Rider
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/active-riders">
                                    <FaUserCheck className="inline-block mr-2" />
                                    Active Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pending-riders">
                                    <FaUserClock className="inline-block mr-2" />
                                    Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/make-admin">
                                    <FaUserShield className="inline-block mr-2" />
                                    Make Admin
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