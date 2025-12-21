import { NavLink } from "react-router";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import VendoSphereLogo from "../Logo/VendoSphereLogo";
import UseAuth from "../../../hooks/UseAuth";
import UseUserRole from "../../../hooks/UseUserRole";
import { UseCart } from "../../../context/CartContext";

const Navbar = () => {
  const { user, logOutUser } = UseAuth();
  const { cart } = UseCart();
  const { role, roleLoading } = UseUserRole();

  const handleLogout = async () => {
    try {
      await logOutUser();
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= NAV LINKS ================= */
  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/shop">Shop</NavLink></li>
      <li><NavLink to="/become-seller">Become a Seller</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  );

  /* ================= PROFILE MENU ================= */
  const profileMenu = (
    <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 `z-[100]`">

      {/* ===== Logged In ===== */}
      {user && !roleLoading && (
        <>
          {role === "admin" && (
            <li><NavLink to="/dashboard/admin">Admin Panel</NavLink></li>
          )}

          {role === "seller" && (
            <li><NavLink to="/dashboard/seller">Seller Dashboard</NavLink></li>
          )}

          {role === "customer" && (
            <>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><NavLink to="/orders">My Orders</NavLink></li>
              <li><NavLink to="/wishlist">Wishlist</NavLink></li>
            </>
          )}

          <li>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-primary text-white mt-1 w-full"
            >
              Logout
            </button>
          </li>
        </>
      )}

      {/* ===== Not Logged In ===== */}
      {!user && (
        <>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>
        </>
      )}
    </ul>
  );

  return (
    <div className=" mb-24">
      <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50 shadow-md">

        {/* ================= LEFT ================= */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 `z-[40]`"
            >
              {navLinks}
            </ul>
          </div>

          <VendoSphereLogo />
        </div>

        {/* ================= CENTER ================= */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            {navLinks}
          </ul>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="navbar-end gap-4">

          {/* Cart */}
          <NavLink to="/cart" className="relative">
            <FiShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="badge badge-primary badge-sm absolute -top-2 -right-2">
                {cart.length}
              </span>
            )}

          </NavLink>

          {/* Profile */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-10 rounded-full"
                />
              ) : (
                <FiUser size={22} />
              )}
            </label>
            {profileMenu}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
