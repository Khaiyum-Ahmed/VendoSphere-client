import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxios from "../../../../hooks/UseAxios";

const NewsletterSubscription = () => {
    const axiosSecure = UseAxios();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { mutate, isLoading } = useMutation({
        mutationFn: (email) =>
            axiosSecure.post("/newsletter", { email }),

        onSuccess: () => {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "You’ve successfully subscribed!",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            reset();
        },

        onError: (err) => {
            if (err?.response?.status === 409) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "info",
                    title: "Email already subscribed",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "Something went wrong",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        },
    });

    const onSubmit = (data) => {
        mutate(data.email);
    };

    return (
        <section className="bg-base-200 py-16 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-3">📬 Stay Updated!</h2>
                <p className="text-base-content/70 mb-6">
                    Subscribe to get the latest deals, offers, and updates.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <input
                        type="email"
                        placeholder="user@example.com"
                        className="input input-bordered w-full sm:w-96"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>

                {errors.email && (
                    <p className="text-error mt-2">{errors.email.message}</p>
                )}
            </div>
        </section>
    );
};

export default NewsletterSubscription;
