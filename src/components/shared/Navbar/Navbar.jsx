import { NavLink } from "react-router"; // ✅ use react-router-dom
import VendoSphereLogo from "../Logo/VendoSphereLogo";

const Navbar = () => {
  // 🟩 Step 1: Create your Profile submenu items
  const profileSubMenu = (
    <>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      <li><NavLink to="/orders">Orders</NavLink></li>
      <li><NavLink to="/wishlist">Wishlist</NavLink></li>
      <li><NavLink to="/settings">Settings</NavLink></li>
      <li><NavLink to="/logout">Logout</NavLink></li>
    </>
  );

  // 🟩 Step 2: Add your main nav links (keep as before, but add the profile dropdown)
  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/shop">Shop</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/become-seller">Become a Seller</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      <li><NavLink to="/cart">Cart</NavLink></li>

      {/* 🟩 Step 3: Add the Profile dropdown here */}
      <li>
        <details>
          <summary>Profile</summary>
          <ul className="p-2 bg-base-100 rounded-box w-48">
            {profileSubMenu}
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* 🟩 Navbar Left (Logo + mobile dropdown) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* 🟩 Step 4: Mobile Menu — includes Profile submenu automatically */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        <VendoSphereLogo />
      </div>

      {/* 🟩 Navbar Center (Desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base">
          {navLinks}
        </ul>
      </div>

      {/* 🟩 Navbar Right (Button or anything else) */}
      <div className="navbar-end">
        <a className="btn bg-primary text-primary-content">Sign Up</a>
      </div>
    </div>
  );
};

export default Navbar;
