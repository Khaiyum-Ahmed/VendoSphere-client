import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import UseAxios from "../../hooks/UseAxios";

const BecomeSeller = () => {
    const navigate = useNavigate();
    const { user } = UseAuth();
    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);
    const axiosSecure = UseAxios();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Upload image to imgbb
    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return data.data.url;
    };

    // Mutation: Send seller data to backend
    const mutation = useMutation({
        mutationFn: async (sellerInfo) => {
            const res = await axiosSecure.post("/seller-request", sellerInfo);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Request Sent!",
                text: "Your seller application has been submitted. Admin will review soon.",
                confirmButtonColor: "#570DF8",
            });
            reset();
            navigate("/dashboard");
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to submit seller request.",
            });
        },
    });

    const onSubmit = async (data) => {
        try {
            const { shopName, phone, address, shopDescription, shopLogo, shopBanner } =
                data;

            // Upload images
            const logoUrl = await uploadImage(shopLogo[0]);
            const bannerUrl = await uploadImage(shopBanner[0]);

            const sellerInfo = {
                uid: user?.uid,
                name: user?.displayName,
                email: user?.email,
                shopName,
                phone,
                address,
                shopDescription,
                shopLogo: logoUrl,
                shopBanner: bannerUrl,
                status: "pending",
                createdAt: new Date(),
            };
            console.log("become seller all data", sellerInfo)
            mutation.mutate(sellerInfo);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong while uploading files!",
            });
        }

    };

    return (
        <div className="max-w-3xl mx-auto bg-base-100 shadow-xl p-8 rounded-xl mt-6 mb-16">
            <h2 className="text-3xl font-bold text-center mb-6">
                Become a <span className="text-primary">Seller</span>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Shop Name */}
                <div>
                    <label className="label">Shop Name</label>
                    <input
                        type="text"
                        {...register("shopName", { required: "Shop name is required" })}
                        className="input input-bordered w-full"
                        placeholder="My Awesome Store"
                    />
                    <p className="text-error text-sm">{errors.shopName?.message}</p>
                </div>

                {/* Phone */}
                <div>
                    <label className="label">Phone Number</label>
                    <input
                        type="text"
                        {...register("phone", { required: "Phone number is required" })}
                        className="input input-bordered w-full"
                        placeholder="+8801XXXXXXXXX"
                    />
                    <p className="text-error text-sm">{errors.phone?.message}</p>
                </div>

                {/* Address */}
                <div>
                    <label className="label">Shop Address</label>
                    <input
                        type="text"
                        {...register("address", { required: "Address is required" })}
                        className="input input-bordered w-full"
                        placeholder="Road 4, Mirpur, Dhaka"
                    />
                    <p className="text-error text-sm">{errors.address?.message}</p>
                </div>

                {/* Description */}
                <div>
                    <label className="label">Shop Description</label>
                    <textarea
                        {...register("shopDescription", {
                            required: "Description is required",
                        })}
                        className="textarea textarea-bordered w-full"
                        placeholder="Describe your shop and what products you sell"
                    ></textarea>
                    <p className="text-error text-sm">
                        {errors.shopDescription?.message}
                    </p>
                </div>

                {/* Shop Logo Upload */}
                <div>
                    <label className="label">Shop Logo</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            {...register("shopLogo", { required: "Shop logo is required" })}
                            className="file-input file-input-bordered w-full"
                            accept="image/*"
                            onChange={(e) =>
                                setLogoPreview(URL.createObjectURL(e.target.files[0]))
                            }
                        />
                    </div>
                    {logoPreview && (
                        <img
                            src={logoPreview}
                            alt="Logo Preview"
                            className="w-24 h-24 mt-3 rounded-lg border"
                        />
                    )}
                </div>

                {/* Banner Upload */}
                <div>
                    <label className="label">Shop Banner</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            {...register("shopBanner", {
                                required: "Shop banner is required",
                            })}
                            className="file-input file-input-bordered w-full"
                            accept="image/*"
                            onChange={(e) =>
                                setBannerPreview(URL.createObjectURL(e.target.files[0]))
                            }
                        />
                    </div>
                    {bannerPreview && (
                        <img
                            src={bannerPreview}
                            alt="Banner Preview"
                            className="w-full h-40 mt-3 rounded-lg object-cover border"
                        />
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary text-white w-full"
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? "Submitting..." : "Submit Seller Request"}
                </button>
            </form>
        </div>
    );
};

export default BecomeSeller;
