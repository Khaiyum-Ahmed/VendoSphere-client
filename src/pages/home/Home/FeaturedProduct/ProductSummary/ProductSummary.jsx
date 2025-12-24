import { useState } from "react";
import { UseCart } from "../../../../../context/CartContext";
import { FiHeart } from "react-icons/fi";

const ProductSummary = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = UseCart();

    const stock = product.stock ?? 1;
    const price = Number(product.price) || 0;
    const discount = Number(product.discount) || 0;

    // ✅ Calculate discounted price
    const discountedPrice =
        discount > 0
            ? Math.round(price - (price * discount) / 100)
            : price;

    const handleAddToCart = () => {
        addToCart({
            ...product,
            price: discountedPrice, // ✅ cart gets final price
            quantity,
        });
    };

    return (
        <div className="space-y-4">
            {/* Title */}
            <h2 className="text-3xl font-bold">{product.name}</h2>

            {/* Rating */}
            <p className="text-yellow-500">
                ⭐ {product.rating} / 5 ({product.reviewCount || 0} reviews)
            </p>

            {/* Price Section */}
            <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">
                    $ {discountedPrice}
                </p>

                {discount > 0 && (
                    <div className="flex items-center gap-2">
                        <p className="text-gray-400 line-through">
                            $ {price}
                        </p>
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

                <button className="btn btn-outline">
                    Buy Now
                </button>

                <button className="btn btn-ghost">
                    <FiHeart />
                </button>
            </div>
        </div>
    );
};

export default ProductSummary;
