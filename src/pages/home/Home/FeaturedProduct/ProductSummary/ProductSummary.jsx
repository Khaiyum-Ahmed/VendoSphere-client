import { useState } from "react";
import { UseCart } from "../../../../../context/CartContext";
import { FiHeart } from "react-icons/fi";
import Swal from "sweetalert2";
import UseAxios from "../../../../../hooks/UseAxios";
import UseAuth from "../../../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";

const ProductSummary = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = UseCart();
    const axios = UseAxios();
    const { user } = UseAuth();

    const stock = product.stock ?? 1;
    const price = Number(product.price) || 0;
    const discount = Number(product.discount) || 0;

      const { data: wishlist = [], refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

    // ✅ Discounted price
    const discountedPrice =
        discount > 0 ? Math.round(price - (price * discount) / 100) : price;

    /* ================= ADD TO CART ================= */
    const handleAddToCart = () => {
        addToCart({
            ...product,
            price: discountedPrice,
            quantity,
        });
    };

    /* ================= ADD TO WISHLIST ================= */
    // ✅ CORRECT CHECK
    const isWishlisted = wishlist.some(
        (item) => item.product._id === product._id
    );

    const handleWishlist = async () => {
        if (!user) {
            return Swal.fire("Login required", "Please login first", "info");
        }

        try {
            await axios.post("/wishlist", {
                userEmail: user.email,
                productId: product._id,
            });

            Swal.fire("Added", "Added to wishlist ❤️", "success");
            refetch();
        } catch (err) {
            if (err.response?.status === 409) {
                Swal.fire("Oops!", "Already in wishlist", "warning");
            } else {
                Swal.fire("Error", "Something went wrong", "error");
            }
        }
    };


    return (
        <div className="space-y-4">
            {/* Title */}
            <h2 className="text-3xl font-bold">{product.name}</h2>

            {/* Rating */}
            <p className="text-yellow-500">
                ⭐ {product.rating} / 5 ({product.reviewCount || 0} reviews)
            </p>

            {/* Price */}
            <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">
                    $ {discountedPrice}
                </p>

                {discount > 0 && (
                    <div className="flex gap-2 items-center">
                        <p className="line-through text-gray-400">$ {price}</p>
                        <span className="text-red-500 font-semibold">
                            -{discount}%
                        </span>
                    </div>
                )}
            </div>

            {/* Stock */}
            <p className={stock > 0 ? "text-green-600" : "text-red-600"}>
                {stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-3">
                <span className="font-medium">Quantity</span>
                <input
                    type="number"
                    min={1}
                    max={stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20 border rounded px-2 py-1"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={handleAddToCart}
                    className="btn btn-primary text-white"
                >
                    Add to Cart
                </button>

                <button className="btn btn-outline">Buy Now</button>

                <button
                    onClick={handleWishlist}
                    className={`btn btn-ghost tooltip ${isWishlisted ? "text-red-500" : ""}`}
                    data-tip="Add to Wishlist"
                >
                    <FiHeart className={`"text-xl" ${isWishlisted ? "fill-current" : ""}` }/>
                </button>
            </div>
        </div>
    );
};

export default ProductSummary;
