import { UseCart } from "../../context/CartContext";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";

const Cart = () => {
    const { cart, isLoading, updateQuantity, removeFromCart, clearCart } =
        UseCart();

    if (isLoading) {
        return <div className="text-center mt-20">Loading cart...</div>;
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
                <Link to="/shop" className="btn btn-primary mt-4">
                    Go Shopping
                </Link>
            </div>
        );
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Cart</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {/* ITEMS */}
                <div className="md:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item.productId}
                            className="flex gap-4 bg-base-200 p-4 rounded-lg"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded"
                            />

                            <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-primary font-bold">${item.price}</p>

                                <div className="flex items-center gap-2 mt-2">
                                    <button
                                        className="btn btn-xs"
                                        onClick={() =>
                                            updateQuantity({
                                                productId: item.productId,
                                                quantity: item.quantity - 1,
                                            })
                                        }
                                        disabled={item.quantity <= 1}
                                    >
                                        −
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        className="btn btn-xs"
                                        onClick={() =>
                                            updateQuantity({
                                                productId: item.productId,
                                                quantity: item.quantity + 1,
                                            })
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.productId)}
                                className="btn btn-sm btn-error btn-outline"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))}
                </div>

                {/* SUMMARY */}
                <div className="bg-base-200 p-4 rounded-lg h-fit">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>

                    <p className="flex justify-between">
                        <span>Total Items</span>
                        <span>{cart.length}</span>
                    </p>

                    <p className="flex justify-between font-bold text-lg mt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </p>

                    <button className="btn btn-primary text-white text-xl w-full mt-4">
                        Proceed to Checkout
                    </button>

                    <button
                        onClick={clearCart}
                        className="btn btn-outline btn-error w-full mt-2"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
