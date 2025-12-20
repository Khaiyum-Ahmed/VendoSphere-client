import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import UseAxios from "../../../../../hooks/UseAxios";
import UseAuth from "../../../../../hooks/UseAuth";

const Reviews = ({ productId }) => {
    const axiosInstance = UseAxios();
    const { user } = UseAuth();
    const queryClient = useQueryClient();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    /* ================= FETCH REVIEWS ================= */
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["reviews", productId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/product/${productId}/reviews`);
            return res.data;
        },
    });

    /* ================= CHECK IF USER ALREADY REVIEWED ================= */
    const hasReviewed = user
        ? reviews.some((r) => r.userEmail === user.email)
        : false;

    /* ================= ADD REVIEW ================= */
    const addReviewMutation = useMutation({
        mutationFn: async () => {
            return axiosInstance.post(`/product/${productId}/review`, {
                userEmail: user.email,
                userName: user.displayName || "Anonymous",
                rating,
                comment,
            });
        },
        onSuccess: () => {
            setComment("");
            setRating(5);
            queryClient.invalidateQueries(["reviews", productId]);
            queryClient.invalidateQueries(["product", productId]);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        addReviewMutation.mutate();
    };

    if (isLoading) {
        return <p>Loading reviews...</p>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold">Customer Reviews</h2>

            {/* ================= SHOW REVIEWS ================= */}
            {reviews.length > 0 ? (
                reviews.map((r) => (
                    <div key={r._id} className="border p-4 rounded space-y-1">
                        <p className="font-semibold">{r.userName}</p>

                        {/* Rating Stars */}
                        <p className="text-yellow-500">
                            {"⭐".repeat(r.rating)}
                            <span className="text-gray-400 ml-1">
                                ({r.rating}/5)
                            </span>
                        </p>

                        <p>{r.comment}</p>

                        <p className="text-sm text-gray-500">
                            {new Date(r.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No reviews yet.</p>
            )}

            {/* ================= ADD REVIEW FORM ================= */}
            {user && !hasReviewed && (
                <form onSubmit={handleSubmit} className="space-y-3 border-t pt-4">
                    <h3 className="font-semibold">Add Your Review</h3>

                    {/* Rating */}
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="select select-bordered w-32"
                    >
                        {[5, 4, 3, 2, 1].map((n) => (
                            <option key={n} value={n}>
                                {n} Star{n > 1 && "s"}
                            </option>
                        ))}
                    </select>

                    {/* Comment */}
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Write your review"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />

                    <button
                        className="btn btn-primary text-white"
                        disabled={addReviewMutation.isLoading}
                    >
                        {addReviewMutation.isLoading ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            )}

            {/* ================= LOGIN MESSAGE ================= */}
            {!user && (
                <p className="text-gray-500">
                    Please login to write a review.
                </p>
            )}

            {/* ================= ALREADY REVIEWED MESSAGE ================= */}
            {user && hasReviewed && (
                <p className="text-green-600 font-medium">
                    You have already reviewed this product.
                </p>
            )}
        </div>
    );
};

export default Reviews;
