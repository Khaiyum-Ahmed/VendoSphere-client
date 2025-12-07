import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";


const Register = () => {
    const navigate = useNavigate();
    // const { signup, loading } = useAuth();
    const {user, createUser,loading} = UseAuth();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Mutation for MongoDB user save
    const mutation = useMutation({
        // mutationFn: async (userInfo) => {
        //     const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify(userInfo),
        //     });
        //     if (!res.ok) throw new Error("Failed to save user data");
        //     return res.json();
        // },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Welcome to our e-commerce platform 🎉",
                confirmButtonColor: "#570DF8",
            });
            reset();
            navigate("/");
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to save user info in database.",
            });
        },
    });

    const onSubmit = async (data) => {
        const { name, email, password, phone, role, address } = data;
        console.log(user, data)
        try {
            const user = await createUser(email, password, name);
            if (user) {
                const userInfo = {
                    uid: user.uid,
                    name,
                    email,
                    phone,
                    role,
                    address,
                };
                mutation.mutate(userInfo);
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Signup Failed",
                text: err.message,
            });
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="card w-full max-w-md bg-base-100 shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <input
                        {...register("name", { required: "Full name is required" })}
                        placeholder="Full Name"
                        className="input input-bordered w-full"
                    />
                    <p className="text-error text-sm">{errors.name?.message}</p>

                    <input
                        {...register("email", { required: "Email is required" })}
                        type="email"
                        placeholder="Email Address"
                        className="input input-bordered w-full"
                    />
                    <p className="text-error text-sm">{errors.email?.message}</p>

                    <input
                        {...register("phone", { required: "Phone number is required" })}
                        placeholder="Phone Number"
                        className="input input-bordered w-full"
                    />
                    <p className="text-error text-sm">{errors.phone?.message}</p>

                    <input
                        {...register("address")}
                        placeholder="Address (optional)"
                        className="input input-bordered w-full"
                    />

                    <select
                        {...register("role", { required: "Select a role" })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Role</option>
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                    <p className="text-error text-sm">{errors.role?.message}</p>

                    <input
                        {...register("password", {
                            required: "Password required",
                            minLength: { value: 6, message: "At least 6 characters" },
                        })}
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                    />
                    <p className="text-error text-sm">{errors.password?.message}</p>

                    <button
                        type="submit"
                        disabled={loading || mutation.isLoading}
                        className="btn btn-primary w-full mt-4"
                    >
                        {loading || mutation.isLoading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
