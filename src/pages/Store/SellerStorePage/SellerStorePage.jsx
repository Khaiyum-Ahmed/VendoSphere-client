import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FiStar } from "react-icons/fi";
import { FaHeart, FaEnvelope } from "react-icons/fa";
import UseAxios from "../../../hooks/UseAxios";
import Loading from "../../Loading/Loading";
import ProductCard from "../../shop/ShopPage/ProductCard/ProductCard";

const SellerStorePage = () => {
    const { sellerId } = useParams();
    const navigate = useNavigate();
    const axios = UseAxios();

    const [followed, setFollowed] = useState(false);
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        minPrice: 0,
        maxPrice: 0,
        sort: "newest",
    });

    /** ================= FETCH SELLER INFO ================= */
    const { data: seller, isLoading: sellerLoading } = useQuery({
        queryKey: ["seller-info", sellerId],
        queryFn: async () => {
            const res = await axios.get(`/stores/${sellerId}`);
            return res.data;
        },
    });

    console.log("seller info", seller)
    /** ================= FETCH SELLER PRODUCTS ================= */
    const { data: productsData, isLoading: productsLoading } = useQuery({
        queryKey: ["seller-products", sellerId, filters],
        queryFn: async () => {
            const params = new URLSearchParams(filters);
            const res = await axios.get(`/products?seller=${sellerId}&${params.toString()}`);
            return res.data;
        },
        enabled: !!sellerId,
    });

    if (sellerLoading || productsLoading) return <Loading />;

    if (!seller) {
        return (
            <div className="h-screen flex items-center justify-center text-2xl">
                404 Seller Not Found
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            {/* ================= A. Seller Banner ================= */}
            <div className="relative h-60 md:h-96 rounded-lg overflow-hidden bg-gray-200">
                {seller.banner && (
                    <img
                        src={seller.banner}
                        alt={`${seller.storeName} Banner`}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute bottom-0 left-4 md:left-8 mb-4 flex items-center gap-4">
                    <img
                        src={seller.avatar}
                        alt={seller.storeName}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover"
                    />
                    <div>
                        <h2 className="text-xl md:text-3xl font-bold">{seller.storeName}</h2>
                        <div className="flex items-center gap-2 text-yellow-500">
                            <FiStar /> {seller.rating?.toFixed(1) || 0} / 5
                        </div>
                        <p className="text-sm text-gray-700">{seller.location}</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                        <button
                            onClick={() => setFollowed(!followed)}
                            className={`btn btn-sm ${followed ? "btn-success" : "btn-outline"}`}
                        >
                            {followed ? "Following" : "Follow"}
                        </button>
                        <button
                            onClick={() => navigate(`/messages?seller=${sellerId}`)}
                            className="btn btn-sm btn-primary"
                        >
                            <FaEnvelope /> Contact
                        </button>
                    </div>
                </div>
            </div>

            {/* ================= B. Seller Info ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-200 p-6 rounded-lg">
                <p className="text-gray-800">{seller.description}</p>
                <div className="flex flex-wrap gap-4 text-gray-700">
                    <span>Member since {new Date(seller.createdAt).toLocaleDateString()}</span>
                    <span>{productsData?.length || 0} Products</span>
                    <span>{seller.followers?.length || 0} Followers</span>
                    {seller.website && (
                        <a href={seller.website} target="_blank" className="underline text-blue-600">
                            Visit Website
                        </a>
                    )}
                </div>
            </div>

            {/* ================= C. Filters ================= */}
            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search products"
                    className="input input-bordered w-full md:w-1/3"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <select
                    className="select select-bordered w-full md:w-1/4"
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price Low → High</option>
                    <option value="price-desc">Price High → Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>

            {/* ================= D. Product Grid ================= */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {productsData?.length ? (
                    productsData.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 py-8">
                        No products listed yet.
                    </p>
                )}
            </div>

            {/* ================= E. Seller Stats ================= */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat bg-base-200 rounded-lg p-4 text-center">
                    <div className="stat-title">Total Sales</div>
                    <div className="stat-value">{seller.totalSales || 0}</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-4 text-center">
                    <div className="stat-title">Active Products</div>
                    <div className="stat-value">{productsData?.length || 0}</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-4 text-center">
                    <div className="stat-title">Total Reviews</div>
                    <div className="stat-value">{seller.totalReviews || 0}</div>
                </div>
                <div className="stat bg-base-200 rounded-lg p-4 text-center">
                    <div className="stat-title">Followers</div>
                    <div className="stat-value">{seller.followers?.length || 0}</div>
                </div>
            </div>

            {/* ================= F. Seller Reviews ================= */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                {seller.reviews?.length ? (
                    seller.reviews.map((review) => (
                        <div key={review._id} className="p-4 bg-base-200 rounded-lg">
                            <div className="flex justify-between">
                                <span className="font-semibold">{review.userName}</span>
                                <span className="text-yellow-500">{review.rating} ⭐</span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default SellerStorePage;
