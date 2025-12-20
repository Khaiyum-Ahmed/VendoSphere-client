import { useState } from "react";
import { UseCart } from "../../../../../context/CartContext";
import { FiHeart } from "react-icons/fi";

const ProductSummary = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = UseCart();
    const stock = product.stock ?? 1;
    // console.log(product)


    return (
        <div className="space-y-4">
            <h2 className="text-3xl font-bold">{product.name}</h2>

            <p className="text-yellow-500">
                ⭐ {product.rating} / 5 ({product.reviewCount || 0} reviews)
            </p>

            <p className="text-2xl font-bold text-primary">
                $ {product.price}
            </p>

            <p className={stock > 0 ? "text-green-600" : "text-red-600"}>
                {stock > 0 ? "In Stock" : "Out of Stock"}
            </p>


            {/* Quantity */}
            <input
                type="number"
                defaultValue={1}
                min={1}
                step={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border rounded px-2 py-1"
            />

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={() => addToCart(product)}
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
