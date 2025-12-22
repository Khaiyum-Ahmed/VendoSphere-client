import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import toast from "react-hot-toast";

const SellerProfile = () => {
    const axios = UseAxios();
    const { user } = UseAuth();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        storeName: "",
        description: "",
        avatar: "",
        banner: "",
        phone: "",
        socialLinks: "",
        password: "",
    });

    // Fetch profile
    const { data, isLoading } = useQuery({
        queryKey: ["seller-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/seller/profile?email=${user.email}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (data) {
            setFormData({
                storeName: data.storeName || "",
                description: data.description || "",
                avatar: data.avatar || "",
                banner: data.banner || "",
                phone: data.phone || "",
                socialLinks: data.socialLinks || "",
                password: "",
            });
        }
    }, [data]);

    // Upload image to ImgBB
    const uploadImageToIMGBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
            formData
        );
        return res.data.data.url;
    };

    // Mutation to update profile
    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axios.put("/seller/profile", { email: user.email, ...updatedData });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Profile updated successfully!");
            queryClient.invalidateQueries(["seller-profile", user?.email]);
        },
        onError: () => {
            toast.error("Failed to update profile");
        },
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = await uploadImageToIMGBB(file);
        setFormData((prev) => ({ ...prev, [field]: url }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="p-4 md:p-6 space-y-6">
            <h2 className="text-2xl font-bold">Seller Profile</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Store Name */}
                <div>
                    <label className="label">Store Name</label>
                    <input
                        type="text"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                    />
                </div>

                {/* Avatar */}
                <div>
                    <label className="label">Avatar Image</label> <br /> <br />
                    <input type="file" className="border border-base-300 p-3" accept="image/*" onChange={(e) => handleFileChange(e, "avatar")} />
                    {formData.avatar && <img src={formData.avatar} className="mt-2 w-24 h-24 object-cover rounded-full " />}
                </div>

                {/* Banner */}
                <div>
                    <label className="label">Banner Image</label> <br /><br />
                    <input type="file" className="border border-base-300 p-3" accept="image/*" onChange={(e) => handleFileChange(e, "banner")} />
                    {formData.banner && <img src={formData.banner} className="mt-2 w-full h-40 object-cover rounded-lg" />}
                </div>

                {/* Contact Info */}
                <div>
                    <label className="label">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Social Links */}
                <div>
                    <label className="label">Social Links</label>
                    <input
                        type="text"
                        name="socialLinks"
                        value={formData.socialLinks}
                        onChange={handleChange}
                        placeholder="Comma separated URLs"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="label">New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Leave empty if not changing"
                        className="input input-bordered w-full"
                    />
                </div>

                <button type="submit" className="btn btn-primary text-white">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default SellerProfile;
