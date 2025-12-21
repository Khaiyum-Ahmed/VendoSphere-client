// ProductCard.jsx
import { Link } from "react-router";
import { UseCart } from "../../../../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart } = UseCart();

    return (
        <div className="card bg-base-100 shadow hover:shadow-lg transition">
            <figure className="w-full h-full">
                <img src={product.images} alt={product.productName}  />
            </figure>
            <div className="card-body p-3">
                <Link to={`/product/${product._id}`} className="font-semibold">
                    {product.name}
                </Link>
                <p className="text-primary font-bold">৳ {product.price}</p>
                <button
                    onClick={() => addToCart(product)}
                    className="btn btn-sm btn-primary text-white"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
