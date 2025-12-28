import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle } from "react-icons/fa";
import Loading from "../Loading/Loading";
import UseAxios from "../../hooks/UseAxios";

const OrderSuccess = () => {
    const { orderId } = useParams();
    const axiosSecure = UseAxios();
console.log('oID', orderId)
    const { data: order, isLoading, error } = useQuery({
        queryKey: ["order-success", orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${orderId}`);
            return res.data;
        },
        enabled: !!orderId,
    });
    console.log("order-success", orderId)

    if (isLoading) return <Loading />;

    if (error || !order) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-red-500">Order not found</h2>
                <Link to="/shop" className="btn btn-primary text-white mt-4">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    /* ===== Estimated Delivery (Bangladesh Only) ===== */
    const deliveryDays = order.shipping?.city === "Dhaka" ? 3 : 5;
    const estimatedDate = new Date(order.createdAt);
    estimatedDate.setDate(estimatedDate.getDate() + deliveryDays);

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* ================= HEADER ================= */}
            <div className="text-center mb-10">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-2">
                    Thank you for your order!
                </h1>
                <p className="text-gray-600">
                    Your order has been placed successfully.
                </p>
            </div>

            {/* ================= ORDER INFO ================= */}
            <div className="card bg-base-100 shadow mb-6 p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <p className="font-semibold">
                            Order ID:
                            <span className="ml-2 text-primary">#{order._id}</span>
                        </p>
                        <p>
                            Order Date:{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p className="capitalize">
                            Payment Method: {order.paymentMethod}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="font-semibold">Estimated Delivery</p>
                        <p className="text-green-600 font-medium">
                            {estimatedDate.toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-500">
                            {deliveryDays} business days
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= PRODUCTS ================= */}
            <div className="card bg-base-100 shadow mb-6 p-6">
                <h3 className="text-lg font-semibold mb-4">Purchased Items</h3>

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
                                            alt={item.name}
                                            className="w-12 h-12 rounded"
                                        />
                                        <Link
                                            to={`/product/${item.productId}`}
                                            className="hover:underline"
                                        >
                                            {item.name}
                                        </Link>
                                    </td>
                                    <td>{item.quantity}</td>
                                    <td>$ {item.price}</td>
                                    <td className="font-semibold">
                                        $ {item.price * item.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= SHIPPING & SUMMARY ================= */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="card bg-base-100 shadow p-6">
                    <h3 className="text-lg font-semibold mb-2">Shipping Details</h3>
                    <p>{order.shipping?.name}</p>
                    <p>{order.shipping?.phone}</p>
                    <p>
                        {order.shipping?.address}, {order.shipping?.city}
                    </p>
                    <p>{order.shipping?.country}</p>
                </div>

                <div className="card bg-base-100 shadow p-6">
                    <h3 className="text-lg font-semibold mb-2">Order Summary</h3>

                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>$ {order.subtotal}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>$ {order.shippingCost}</span>
                    </div>

                    {order.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Discount</span>
                            <span>- $ {order.discount}</span>
                        </div>
                    )}

                    <hr className="my-2" />

                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>$ {order.totalAmount}</span>
                    </div>
                </div>
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
                <Link to="/shop" className="btn btn-outline">
                    Continue Shopping
                </Link>

                <Link
                    to={`/dashboard/customer/orders/${order._id}`}
                    className="btn btn-primary"
                >
                    View Order Details
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
