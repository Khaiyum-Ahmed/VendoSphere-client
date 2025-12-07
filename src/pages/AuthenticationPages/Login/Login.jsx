import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import UseAuth from "../../../hooks/UseAuth";

const Login = () => {
  const navigate = useNavigate();
  const { signInUser, user, loading } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

//   Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      await signInUser(email, password);

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have logged in successfully 🎉",
        confirmButtonColor: "#570DF8",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
          />
          <p className="text-error text-sm">{errors.email?.message}</p>
        </div>

        {/* Password with Show/Hide Toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="input input-bordered w-full"
          />

          {/* Toggle Icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </span>

          <p className="text-error text-sm">{errors.password?.message}</p>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full mt-2 text-white text-base"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Links */}
      <div className="mt-4 text-center text-sm">
        <p>
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register Now
          </Link>
        </p>

        <p className="mt-2">
          <Link
            to="/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
