import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import UseAxios from "../../hooks/UseAxios";
import { UseCart } from "../../context/CartContext";

const BD_DISTRICTS = [
    "Dhaka",
    "Chattogram",
    "Sylhet",
    "Khulna",
    "Rajshahi",
    "Barishal",
    "Rangpur",
    "Mymensingh",
];

const CheckoutPage = () => {
    const { user } = UseAuth();
    const axios = UseAxios();
    const navigate = useNavigate();
    const { cart, clearCart } = UseCart();
    console.log('cart items ', cart)

    const [shipping, setShipping] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        country: "Bangladesh",
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    /* ================= VALIDATION ================= */
    const isValid = () => {
        if (!shipping.name || !shipping.email || !shipping.phone || !shipping.address || !shipping.city) {
            Swal.fire("Missing Info", "Please fill all required fields", "warning");
            return false;
        }

        if (!/^\S+@\S+\.\S+$/.test(shipping.email)) {
            Swal.fire("Invalid Email", "Enter a valid email address", "error");
            return false;
        }

        if (!/^01\d{9}$/.test(shipping.phone)) {
            Swal.fire("Invalid Phone", "Bangladesh phone must start with 01", "error");
            return false;
        }

        if (!BD_DISTRICTS.includes(shipping.city)) {
            Swal.fire("Unavailable", "Shipping is available only inside Bangladesh", "error");
            return false;
        }

        return true;
    };

    /* ================= CALCULATIONS ================= */
    const subtotal = useMemo(
        () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cart]
    );

    // District-based shipping cost
    const shippingCost = useMemo(() => {
        if (shipping.city === "Dhaka") return 100;
        if (shipping.city) return 150;
        return 0;
    }, [shipping.city]);

    const total = subtotal + shippingCost;

    /* ================= PLACE ORDER ================= */
    const handlePlaceOrder = async () => {
        if (!isValid()) return;

        if (cart.length === 0) {
            return Swal.fire("Empty Cart", "Add products before checkout", "warning");
        }

        try {
            setLoading(true);

            const orderData = {
                email: user.email,
                items: cart,
                shipping,
                shippingCost,
                paymentMethod,
                note,
                subtotal,
                totalAmount: total,
            };

            const res = await axios.post("/orders", orderData);

            console.log('res data', res)
            clearCart();
            if (res.data?.insertedId) {
                navigate(`/order-success/${res.data.insertedId}`);
            }

        } catch (err) {
            Swal.fire(
                "Order Failed",
                err.response?.data?.message || "Something went wrong",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
                {/* Shipping Details */}
                <div className="card bg-base-100 shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="input input-bordered"
                            placeholder="Full Name*"
                            value={shipping.name}
                            onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                        />

                        <input
                            className="input input-bordered"
                            placeholder="Email*"
                            value={shipping.email}
                            onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                        />

                        <input
                            className="input input-bordered"
                            placeholder="Phone*"
                            value={shipping.phone}
                            onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                        />

                        <select
                            className="select select-bordered"
                            value={shipping.city}
                            onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        >
                            <option value="">Select District</option>
                            {BD_DISTRICTS.map((d,idx) => (
                                <option key={idx} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </div>

                    <textarea
                        className="textarea textarea-bordered mt-4 w-full"
                        placeholder="Full Address*"
                        value={shipping.address}
                        onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                    />
                </div>

                {/* Payment Method */}
                <div className="card bg-base-100 shadow p-6">
                    <h3 className="font-semibold mb-4">Payment Method</h3>

                    {["cod", "bkash", "paypal"].map((method) => (
                        <label key={method} className="flex items-center gap-3 mb-2 cursor-pointer">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === method}
                                onChange={() => setPaymentMethod(method)}
                            />
                            <span className="capitalize">
                                {method === "cod" ? "Cash on Delivery" : method}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="card bg-base-100 shadow p-6 space-y-4">
                <h3 className="font-semibold">Order Summary</h3>

                {cart.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                        <span>
                            {item.name} × {item.quantity}
                        </span>
                        <span>$ {item.price * item.quantity}</span>
                    </div>
                ))}

                <hr />

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$ {subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$ {shippingCost}</span>
                </div>

                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>$ {total}</span>
                </div>

                <textarea
                    placeholder="Order note (optional)"
                    className="textarea textarea-bordered"
                    onChange={(e) => setNote(e.target.value)}
                />

                <button
                    onClick={handlePlaceOrder}
                    className="btn btn-primary w-full text-white"
                    disabled={loading}
                >
                    {loading ? "Placing Order..." : "Place Order"}
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
