// Pagination.jsx
import { useSearchParams } from "react-router";

const Pagination = ({ page, totalPages }) => {
    const [params, setParams] = useSearchParams();

    const goToPage = (p) => {
        if (p < 1 || p > totalPages) return;
        params.set("page", p);
        setParams(params);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="join justify-center space-x-2">
            {/* Prev Button */}
            <button
                className="btn join-item"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages).keys()].map((n) => (
                <button
                    key={n}
                    className={`join-item btn ${page === n + 1 ? "btn-active" : ""}`}
                    onClick={() => goToPage(n + 1)}
                >
                    {n + 1}
                </button>
            ))}

            {/* Next Button */}
            <button
                className="btn join-item"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
