import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UseAxios from "../../../hooks/UseAxios";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = UseAxios();

    const [images, setImages] = useState([]);

    /* ================= FETCH PRODUCT ================= */
    const { data: product = {}, isLoading } = useQuery({
        queryKey: ["seller-product", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/product/${id}`);
            return res.data;
        },
    });

    /* ================= SET DEFAULT IMAGES ================= */
    useEffect(() => {
        if (product?.images) {
            setImages(product.images);
        }
    }, [product]);

    /* ================= IMGBB UPLOAD ================= */
    const uploadImageToIMGBB = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key
            }`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();
        return data.data.url;
    };

    const handleImageUpload = async (files) => {
        toast.loading("Uploading images...");
        try {
            const uploadedUrls = [];

            for (const file of files) {
                const url = await uploadImageToIMGBB(file);
                uploadedUrls.push(url);
            }

            setImages((prev) => [...prev, ...uploadedUrls]);
            toast.dismiss();
            toast.success("Images uploaded");
        } catch (error) {
            toast.dismiss();
            toast.error("Image upload failed", error);
        }
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    /* ================= UPDATE PRODUCT ================= */
    const updateMutation = useMutation({
        mutationFn: async (updatedProduct) => {
            return axiosSecure.patch(`/products/${id}`, updatedProduct);
        },
        onSuccess: () => {
            toast.success("Product updated successfully");
            navigate("/dashboard/seller/products");
        },
        onError: () => {
            toast.error("Failed to update product");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedProduct = {
            name: form.name.value,
            price: Number(form.price.value),
            stock: Number(form.stock.value),
            category: form.category.value,
            description: form.description.value,
            status: form.status.value,
            images,
        };

        updateMutation.mutate(updatedProduct);
    };

    if (isLoading) return <p className="text-center py-10">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Product Name */}
                <div>
                    <label className="font-medium">Product Name</label>
                    <input
                        name="name"
                        defaultValue={product.name}
                        className="input input-bordered w-full"
                        required
                    />
                    <p className="text-sm text-gray-500">
                        Update the product title shown to customers
                    </p>
                </div>

                {/* Price & Stock */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            defaultValue={product.price}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            defaultValue={product.stock}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="font-medium">Category</label>
                    <input
                        name="category"
                        defaultValue={product.category}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="font-medium">Product Status</label>
                    <select
                        name="status"
                        defaultValue={product.status || "active"}
                        className="select select-bordered w-full"
                    >
                        <option value="active">Active (Visible)</option>
                        <option value="inactive">Inactive (Hidden)</option>
                    </select>
                </div>

                {/* Description */}
                <div>
                    <label className="font-medium">Description</label>
                    <textarea
                        name="description"
                        defaultValue={product.description}
                        className="textarea textarea-bordered w-full"
                        rows={4}
                    ></textarea>
                </div>

                {/* Images */}
                <div>
                    <label className="font-medium">Product Images</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        className="file-input file-input-bordered w-full"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Upload multiple images (JPG, PNG)
                    </p>

                    {/* Preview */}
                    <div className="grid grid-cols-4 gap-3 mt-4">
                        {images.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={img}
                                    className="w-full h-24 object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 btn btn-xs btn-error"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={updateMutation.isLoading}
                    className="btn btn-primary w-full text-white"
                >
                    {updateMutation.isLoading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default EditProduct;
