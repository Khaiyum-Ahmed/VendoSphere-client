// Pagination.jsx
import { useSearchParams } from "react-router";

const Pagination = ({ page, totalPages }) => {
    const [params, setParams] = useSearchParams();

    const goToPage = (p) => {
        params.set("page", p);
        setParams(params);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="join justify-center">
            {[...Array(totalPages).keys()].map((n) => (
                <button
                    key={n}
                    className={`join-item btn ${page === n + 1 ? "btn-active" : ""}`}
                    onClick={() => goToPage(n + 1)}
                >
                    {n + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
