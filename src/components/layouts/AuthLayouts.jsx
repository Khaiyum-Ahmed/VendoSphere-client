import VendoSphereLogo from "../shared/Logo/VendoSphereLogo";
import authimg from "../../assets/images/Authimg.png"
import { Outlet } from "react-router";

const AuthLayouts = () => {
    return (
        <div className="m-12">
            <div className="mb-12">
                <VendoSphereLogo></VendoSphereLogo>
            </div>
            <div className="hero-content max-w-11/12 flex-col gap-10 lg:flex-row-reverse mx-auto">
                <div className="flex-1 w-11/12 bg-[#FAFDF0] py-24 hidden lg:flex">
                    <img src={authimg} className="max-w-2xl" alt="Auth images" />
                </div>
                <div className="flex-1 w-11/12 py-24">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default AuthLayouts;