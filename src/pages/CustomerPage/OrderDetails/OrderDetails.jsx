import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxios from "../../../hooks/UseAxios";
import { UseCart } from "../../../context/CartContext";
import UseAuth from "../../../hooks/UseAuth";

const OrderDetails = () => {
    const { orderId } = useParams();
    const axios = UseAxios();
    const navigate = useNavigate();
    const { reorderCart } = UseCart();
    const { user } = UseAuth();

    const [timeLeft, setTimeLeft] = useState(null);

    /* ===== TESTIMONIAL STATES ===== */
    const [openTestimonial, setOpenTestimonial] = useState(false);
    const [rating, setRating] = useState(5);
    const [message, setMessage] = useState("");

    const { data: order, isLoading, refetch } = useQuery({
        queryKey: ["order-details", orderId],
        queryFn: async () => {
            const res = await axios.get(`/orders/${orderId}`);
            return res.data;
        },
    });

    /* ================= CANCEL COUNTDOWN ================= */
    useEffect(() => {
        if (!order) return;

        const createdAt = new Date(order.createdAt).getTime();
        const cancelDeadline = createdAt + 60 * 60 * 1000;

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = cancelDeadline - now;

            if (diff <= 0) {
                setTimeLeft(null);
                clearInterval(interval);
            } else {
                setTimeLeft(Math.floor(diff / 1000));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [order]);

    const handleCancel = async () => {
        const confirm = await Swal.fire({
            title: "Cancel Order?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
        });

        if (!confirm.isConfirmed) return;

        await axios.patch(`/orders/${orderId}/cancel`);
        Swal.fire("Cancelled", "Your order has been cancelled", "success");
        refetch();
    };

    const handleReorder = async () => {
        await reorderCart(orderId);
        Swal.fire("Success", "Items added to cart", "success");
        navigate("/cart");
    };

    /* ================= SUBMIT TESTIMONIAL ================= */
    const handleTestimonialSubmit = async () => {
        if (!message) {
            return Swal.fire("Error", "Please write a message", "error");
        }

        await axios.post("/testimonials", {
            name: user?.displayName,
            avatar: user?.photoURL,
            message,
            rating,
        });

        Swal.fire("Thank you!", "Testimonial submitted", "success");
        setOpenTestimonial(false);
        setMessage("");
        setRating(5);
    };

    if (isLoading) return <div className="text-center py-20">Loading...</div>;
    if (!order || !order.items?.length) {
        return <div className="text-center py-20">Order not found</div>;
    }

    const canCancel = order.status === "pending" && timeLeft !== null;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold">Order Details</h2>

            {/* ================= ORDER INFO ================= */}
            <div className="card bg-base-100 shadow p-6 grid md:grid-cols-2 gap-4">
                <div>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                </div>
                <div>
                    <p><strong>Payment:</strong> {order.paymentMethod}</p>
                </div>
            </div>

            {/* ================= PRODUCTS ================= */}
            <div className="card bg-base-100 shadow p-6">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map(item => (
                            <tr key={item.productId}>
                                <td className="flex items-center gap-3">
                                    <img src={item.image} className="w-12 h-12 rounded" />
                                    <Link to={`/product/${item.productId}`}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-wrap gap-4">
                {canCancel && (
                    <button onClick={handleCancel} className="btn btn-error text-white">
                        Cancel Order
                    </button>
                )}

                <button onClick={handleReorder} className="btn btn-primary text-white">
                    Reorder
                </button>

                {/* ⭐ TESTIMONIAL BUTTON */}
                {order.status === "delivered" && (
                    <button
                        onClick={() => setOpenTestimonial(true)}
                        className="btn btn-outline"
                    >
                        Write Testimonial
                    </button>
                )}
            </div>

            {/* ================= TESTIMONIAL MODAL ================= */}
            {openTestimonial && (
                <div className="fixed inset-0 bg-base-300 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-full max-w-md">
                        <h3 className="text-xl font-bold mb-3">Write Testimonial</h3>

                        <label className="block mb-2">Rating</label>
                        <select
                            className="select select-bordered w-full mb-3"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5].map(r => (
                                <option key={r} value={r}>{r} Star</option>
                            ))}
                        </select>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write your experience..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setOpenTestimonial(false)}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleTestimonialSubmit}
                                className="btn btn-primary text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
