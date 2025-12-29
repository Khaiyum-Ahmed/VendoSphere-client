import { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import UseAxios from "../../../hooks/UseAxios";

const Wishlist = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxios();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    /* ================= FETCH WISHLIST ================= */
    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
            setWishlist(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchWishlist();
    }, [user]);

    /* ================= REMOVE ================= */
    const handleRemove = async (productId) => {
        try {
            await axiosSecure.delete("/wishlist", {
                data: {
                    userEmail: user.email,
                    productId,
                },
            });

            setWishlist((prev) =>
                prev.filter((item) => item.product._id !== productId)
            );

            Swal.fire({
                icon: "success",
                title: "Removed from Wishlist",
                timer: 1200,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error(err);
        }
    };

    /* ================= ADD TO CART ================= */
    const handleAddToCart = async (product) => {
        try {
            await axiosSecure.post("/cart", {
                userEmail: user.email,
                product,
            });
            Swal.fire({
                icon: "success",
                title: "Added to Cart",
                timer: 1200,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error(err);
        }
    };
    /* ================= UI ================= */
    if (loading) {
        return (
            <div className="flex justify-center mt-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (wishlist.length === 0) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">Your Wishlist is Empty 💔</h2>
                <Link to="/shop" className="btn btn-primary mt-4">
                    Browse Products
                </Link>
            </div>
        );
    }
console.log(wishlist)
    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {wishlist.map(({ product }) => (
                    <div
                        key={product._id}
                        className="card bg-base-100 shadow-md"
                    >
                        <figure className="h-48">
                            <img
                                src={product.images?.[0]}
                                alt={product.productName}
                                className="h-full w-full object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <Link
                                to={`/product/${product._id}`}
                                className="font-semibold hover:underline"
                            >
                                {product.name}
                            </Link>


                            <p className="text-sm text-gray-500">
                                ⭐ {product.rating || 0} ({product.reviewCount || 0})
                            </p>

                            {/* 💰 Price */}
                            <div className="space-y-1">
                                {product.discount > 0 ? (
                                    <>
                                        <p className="text-sm line-through text-gray-400">
                                            ${product.price}
                                        </p>
                                        <span className=" text-red-400">
                                            -{product.discount}%
                                        </span>

                                        <p className="text-primary font-bold text-lg">
                                            $
                                            {(
                                                product.price -
                                                (product.price * product.discount) / 100
                                            ).toFixed(2)}
                                        </p>


                                    </>
                                ) : (
                                    <p className="text-primary font-bold text-lg">
                                        ${product.price}
                                    </p>
                                )}
                            </div>

                            <div className="card-actions justify-between mt-4">
                                <button
                                    onClick={() => handleRemove(product._id)}
                                    className="btn btn-outline btn-error btn-sm"
                                >
                                    Remove
                                </button>

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="btn btn-primary btn-sm text-white"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
