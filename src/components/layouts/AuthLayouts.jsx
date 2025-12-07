import VendoSphereLogo from "../shared/Logo/VendoSphereLogo";
import authimg from "../../assets/images/Authimg.png";
import { Outlet } from "react-router";

const AuthLayouts = () => {
  return (
    <div className="min-h-screen bg-base-100">

      {/* LOGO  */}
      <div className="px-6 pt-6">
        <VendoSphereLogo />
      </div>

      {/* PAGE CONTENT */}
      <div className="w-full max-w-7xl mx-auto mt-8 px-4 md:px-8">

        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10">

          {/* LEFT SIDE — FORM AREA */}
          <div className="w-full lg:w-1/2">
            <div className="  p-6 md:p-10">
              <Outlet />
            </div>
          </div>

          {/* RIGHT SIDE — IMAGE */}
          <div className="hidden lg:flex w-1/2 bg-[#FAFDF0] rounded-xl p-10 justify-center">
            <img
              src={authimg}
              className="max-w-lg object-contain"
              alt="Auth Visual"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default AuthLayouts;
