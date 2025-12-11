import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddProduct = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    
// inside AddProduct
const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: async (productData) => {
        const res = await axiosSecure.post("/add-product", productData);
        return res.data;
    },
    onSuccess: () => {
        // Refetch categories so UI updates
        queryClient.invalidateQueries(["categories"]);
    }
});

    // const imgbbKey = import.meta.env.VITE_image_upload_key;

    const onSubmit = async (data) => {
        try {
            // 1. Upload Image to imgbb
            // const imageFile = { image: data.image[0] };
            const formData = new FormData();
            formData.append("image", data.image[0]);
            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                formData
            );
            // const imgRes = await axiosSecure.post(
            //     `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
            //     formData,
            //     // { headers: { "Content-Type": "multipart/form-data" } }
            // );

            const imageUrl = imgRes.data.data.url;

            // 2. Prepare product data
            const productData = {
                sellerName: user.displayName,
                sellerEmail: user.email,
                productName: data.productName,
                brand: data.brand,
                model: data.model,
                rating: parseFloat(data.rating),
                category: data.category,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                description: data.description,
                image: imageUrl,
                createdAt: new Date(),
            };


            // 3. Save to database
            const res = await axiosSecure.post("/add-product", productData);
            mutation.mutate(productData);

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Product Added Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Something went wrong!", "error");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl">
            <h2 className="text-3xl font-bold mb-6">Add New Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Product Name */}
                <div>
                    <label className="font-medium">Product Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("productName", { required: true })}
                    />
                    {errors.productName && (
                        <p className="text-red-500">Product name is required</p>
                    )}
                </div>

                {/* Brand */}
                <div>
                    <label className="font-medium">Brand</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("brand", { required: true })}
                    />
                    {errors.brand && (
                        <p className="text-red-500">Brand is required</p>
                    )}
                </div>

                {/* Model */}
                <div>
                    <label className="font-medium">Model</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        {...register("model", { required: true })}
                    />
                    {errors.model && (
                        <p className="text-red-500">Model is required</p>
                    )}
                </div>

                {/* Rating */}
                <div>
                    <label className="font-medium">Rating (1 - 5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        className="input input-bordered w-full"
                        {...register("rating", { required: true })}
                    />
                    {errors.rating && (
                        <p className="text-red-500">Rating is required</p>
                    )}
                </div>


                {/* Category */}
                <div>
                    <label className="font-medium">Category</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("category", { required: true })}
                    >
                        <option value="">Select Category</option>
                        <option>Electronics</option>
                        <option>Fashion</option>
                        <option>Mobiles</option>
                        <option>Beauty</option>
                        <option>Accessories</option>
                        <option>Shoes</option>
                        <option>Bags</option>
                        <option>Toys</option>
                        <option>Pet & Supplies</option>
                    </select>
                    {errors.category && (
                        <p className="text-red-500">Category is required</p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label className="font-medium">Price ($)</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("price", { required: true })}
                    />
                    {errors.price && (
                        <p className="text-red-500">Price is required</p>
                    )}
                </div>

                {/* Stock */}
                <div>
                    <label className="font-medium">Stock Quantity</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("stock", { required: true })}
                    />
                    {errors.stock && (
                        <p className="text-red-500">Stock is required</p>
                    )}
                </div>

                {/* Image */}
                <div>
                    <label className="font-medium">Product Image</label>
                    <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("image", { required: true })}
                    />
                    {errors.image && (
                        <p className="text-red-500">Product image is required</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="font-medium">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        {...register("description", { required: true })}
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500">Description is required</p>
                    )}
                </div>

                <button className="btn btn-primary w-full text-white" type="submit">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
