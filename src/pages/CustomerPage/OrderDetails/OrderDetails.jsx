import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAxios from "../../../hooks/UseAxios";
import { UseCart } from "../../../context/CartContext";

const OrderDetails = () => {
    const { orderId } = useParams();
    const axios = UseAxios();
    const [timeLeft, setTimeLeft] = useState(null);
    const navigate = useNavigate();
    const { reorderCart } = UseCart();

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

        try {
            await axios.patch(`/orders/${orderId}/cancel`);
            Swal.fire("Cancelled", "Your order has been cancelled", "success");
            refetch();
        } catch (err) {
            Swal.fire("Error", err.response?.data?.message || "Failed", "error");
        }
    };

    const handleReorder = async () => {
        try {
            await reorderCart(orderId);

            Swal.fire("Success", "Items added to cart", "success");
            navigate("/cart");
        } catch (err) {
            Swal.fire(
                "Error",
                err.response?.data?.message || "Reorder failed",
                "error"
            );
        }
    };

    if (isLoading) {
        return <div className="text-center py-20">Loading order...</div>;
    }
    if (!order || !order.products) {
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
                    {canCancel && (
                        <p className="text-red-500">
                            Cancel within: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
                        </p>
                    )}
                </div>
            </div>

            {/* ================= PRODUCTS ================= */}
            <div className="card bg-base-100 shadow p-6">
                <h3 className="font-semibold mb-4">Products</h3>

                <div className="overflow-x-auto">
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
                            {order.products?.map((item) => (
                                <tr key={item.productId}>
                                    <td className="flex items-center gap-3">
                                        <img
                                            src={item.image}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <Link
                                            to={`/product/${item.productId}`}
                                            className="hover:underline"
                                        >
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
            </div>

            {/* ================= SHIPPING ================= */}
            <div className="card bg-base-100 shadow p-6">
                <h3 className="font-semibold mb-2">Shipping Details</h3>
                <p>{order.shipping.address}</p>
                <p>Phone: {order.shipping.phone}</p>
                <p>Method: {order.shipping.method}</p>
            </div>

            {/* ================= BILLING ================= */}
            <div className="card bg-base-100 shadow p-6">
                <h3 className="font-semibold mb-2">Billing Summary</h3>
                <p>Subtotal: ${order.subtotal}</p>
                <p>Shipping: ${order.shippingCost}</p>
                <p>Discount: -${order.discount}</p>
                <p className="text-xl font-bold">
                    Total: ${order.totalAmount}
                </p>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-wrap gap-4">
                <button className="btn btn-outline">Track Shipment</button>

                {canCancel && (
                    <button onClick={handleCancel} className="btn btn-error text-white">
                        Cancel Order
                    </button>
                )}

                <button
                    onClick={handleReorder}
                    disabled={!order.products?.length}
                    className="btn btn-primary text-white"
                >
                    Reorder
                </button>

            </div>
        </div>
    );
};

export default OrderDetails;
