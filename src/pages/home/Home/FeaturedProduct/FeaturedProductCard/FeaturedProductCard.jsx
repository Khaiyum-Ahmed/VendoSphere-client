import { Link } from "react-router";
import { FiStar } from "react-icons/fi";
import { UseCart } from "../../../../../context/CartContext";

const FeaturedProductCard = ({ product }) => {
    const { addToCart } = UseCart();
    console.log(product)

    return (
        <div className=" bg-base-200 rounded-lg p-3 shadow hover:shadow-lg transition">
            <img
                src={product.images}
                alt={product.productName}
                className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-semibold mt-2 text-sm">
                {product.name}
            </h3>

            <div className="flex items-center gap-1 text-yellow-500 text-sm">
                <FiStar /> {product.rating}
            </div>

            <p className="font-bold text-primary">${product.price}</p>

            <div className="flex justify-between gap-2 mt-3">
                <div>
                    <button
                    onClick={() => addToCart(product)}
                    className="btn btn-sm btn-primary text-white w-full"
                >
                    Add to Cart
                </button>
                </div>

                <div><Link
                    to={`/product/${product._id}`}
                    className="btn btn-sm btn-outline w-full"
                >
                    View
                </Link></div>
            </div>
        </div>
    );
};

export default FeaturedProductCard;
