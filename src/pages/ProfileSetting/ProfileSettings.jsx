import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import UseAxios from "../../hooks/UseAxios";

const ProfileSettings = () => {
    const { user, updateUserProfile } = UseAuth();
    const axiosSecure = UseAxios();

    const [imagePreview, setImagePreview] = useState(user?.photoURL || "");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            phone: "",
        },
    });

    // 🔹 Upload image to imgbb (INLINE)
    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

        const res = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!data?.success || !data?.data?.url) {
            throw new Error("Image upload failed");
        }

        return data.data.url;
    };

    const onSubmit = async (data) => {
        try {
            let photoURL = user?.photoURL;

            // 🔹 Upload new image if selected
            if (data.image && data.image.length > 0) {
                photoURL = await uploadImage(data.image[0]);
            }

            // 🔹 Update Firebase (Navbar avatar depends on this)
            await updateUserProfile(data.name, photoURL);

            // 🔹 Update MongoDB user profile
            await axiosSecure.patch("/users/profile", {
                email: user.email,
                name: data.name,
                phone: data.phone,
                image: photoURL,
            });

            Swal.fire({
                icon: "success",
                title: "Profile Updated Successfully",
                confirmButtonColor: "#570DF8",
            });

            // OPTIONAL: force UI refresh
            setImagePreview(photoURL);
        } catch (error) {
            console.error("Profile update error:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.message || "Something went wrong",
            });
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-base-100 shadow-xl p-8 rounded-xl mt-8">
            <h2 className="text-3xl font-bold text-center mb-6">
                Profile Settings
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Profile Image */}
                <div className="flex flex-col items-center gap-3">
                    <img
                        src={
                            imagePreview ||
                            "https://i.ibb.co/2kR6kXv/avatar.png"
                        }
                        alt="Profile"
                        className="w-24 h-24 rounded-full border object-cover"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="file-input file-input-bordered w-full"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImagePreview(URL.createObjectURL(e.target.files[0]));
                            }
                        }}
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="label">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="input input-bordered w-full"
                    />
                    <p className="text-error text-sm">{errors.name?.message}</p>
                </div>

                {/* Email */}
                <div>
                    <label className="label">Email</label>
                    <input
                        value={user?.email || ""}
                        disabled
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="label">Phone</label>
                    <input
                        type="text"
                        {...register("phone")}
                        className="input input-bordered w-full"
                        placeholder="+8801XXXXXXXXX"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full text-white">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default ProfileSettings;
