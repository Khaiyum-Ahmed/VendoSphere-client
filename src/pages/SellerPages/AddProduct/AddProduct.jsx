import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AddProduct = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const [flashSaleEnabled, setFlashSaleEnabled] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const mutation = useMutation({
        mutationFn: async (productData) => {
            const res = await axiosSecure.post("/add-product", productData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
        }
    });

    const uploadImageToIMGBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
            formData
        );
        return res.data.data.url;
    };

    const onSubmit = async (data) => {
        try {
            // Upload Multiple Images
            const imageFiles = data.images;
            const uploadedImages = [];

            for (let img of imageFiles) {
                const uploadedUrl = await uploadImageToIMGBB(img);
                uploadedImages.push(uploadedUrl);
            }

            // Create product data based on your new schema
            const productData = {
                name: data.name,
                category: data.category,
                subcategory: data.subcategory,
                description: data.description,
                specifications: {
                    brand: data.brand,
                    model: data.model,
                    color: data.color
                },
                images: uploadedImages,
                price: parseFloat(data.price),
                discount: parseFloat(data.discount) || 0,
                stock: parseInt(data.stock),
                isFlashSale: flashSaleEnabled,
                flashSaleExpire: flashSaleEnabled ? data.flashSaleExpire : null,
                sellerName: user.displayName,
                sellerEmail: user.email,
                createdAt: new Date()
            };

            mutation.mutate(productData);

            Swal.fire({
                icon: "success",
                title: "Product Added Successfully!",
                timer: 1500,
                showConfirmButton: false
            });

            reset();
            setFlashSaleEnabled(false);

        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to add product", "error");
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
                        placeholder="Product Name..."
                        {...register("name", { required: true })}
                    />
                    {errors.name && <p className="text-red-500">Required</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="font-medium">Category</label>
                    <input
                        type="text"
                        placeholder="Product Categories..."
                        className="input input-bordered w-full"
                        {...register("category", { required: true })}
                    />
                </div>

                {/* Sub Category */}
                <div>
                    <label className="font-medium">Subcategory</label>
                    <input
                        type="text"
                        placeholder="SubCategories..."
                        className="input input-bordered w-full"
                        {...register("subcategory", { required: true })}
                    />
                </div>

                {/* Specifications */}
                <h3 className="text-xl font-semibold mt-5">Specifications</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Brand" className="input input-bordered w-full"
                        {...register("brand")} />
                    <input placeholder="Model" className="input input-bordered w-full"
                        {...register("model")} />
                    <input placeholder="Color" className="input input-bordered w-full"
                        {...register("color")} />
                </div>

                {/* Description */}
                <div>
                    <label className="font-medium">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        {...register("description", { required: true })}
                    ></textarea>
                </div>

                {/* Multiple Images */}
                <div>
                    <label className="font-medium">Product Images (Max 3)</label>
                    <input
                        type="file"
                        multiple
                        className="file-input file-input-bordered w-full"
                        {...register("images", { required: true })}
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="font-medium">Price ($)</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("price", { required: true })}
                    />
                </div>

                {/* Discount */}
                <div>
                    <label className="font-medium">Discount (%)</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("discount")}
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="font-medium">Stock Quantity</label>
                    <input
                        type="number"
                        className="input input-bordered w-full"
                        {...register("stock", { required: true })}
                    />
                </div>

                {/* Flash Sale Toggle */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={flashSaleEnabled}
                        onChange={() => setFlashSaleEnabled(!flashSaleEnabled)}
                    />
                    <span className="font-medium">Enable Flash Sale?</span>
                </div>

                {/* Flash Sale Expire */}
                {flashSaleEnabled && (
                    <div>
                        <label className="font-medium">Flash Sale Expire Date</label>
                        <input
                            type="datetime-local"
                            className="input input-bordered w-full"
                            {...register("flashSaleExpire", { required: true })}
                        />
                    </div>
                )}

                <button className="btn btn-primary w-full text-white" type="submit">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
