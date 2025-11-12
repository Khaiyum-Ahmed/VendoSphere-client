import { NavLink } from "react-router";
import VendoSphereLogo from "../Logo/VendoSphereLogo";


const Navbar = () => {
    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="shop">Shop</NavLink></li>
        <li><NavLink to="about">About</NavLink></li>
        <li><NavLink to="become-Seller">Become a Seller</NavLink></li>
        <li><NavLink to="contact">Contact</NavLink></li>
        <li><NavLink to="cart">Cart Icon</NavLink></li>
    </>
    const subNavLinks = <>
        <li><NavLink to="profile">Profile</NavLink></li>
        <li><NavLink to="dashboard">Dashboard</NavLink></li>
        <li><NavLink to="orders">Orders</NavLink></li>
        <li><NavLink to="wishlist">Wishlist</NavLink></li>
        <li><NavLink to="wishlist">Wishlist</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                        <li>
                            <a>Profile</a>
                            <ul className="p-2">
                                {subNavLinks}
                            </ul>
                        </li>
                    </ul>
                </div>
                <VendoSphereLogo></VendoSphereLogo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                    {/* <li><NavLink to="profile"><details>
                            <summary>Profile</summary>
                            <ul className="p-2">
                                {subNavLinks}
                            </ul>
                        </details></NavLink></li> */}
                    <li>
                        <details>
                            <summary>Profile</summary>
                            <ul className="p-2">
                                {subNavLinks}
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;