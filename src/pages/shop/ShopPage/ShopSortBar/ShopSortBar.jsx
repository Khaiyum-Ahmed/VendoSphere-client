// ShopSortBar.jsx
import { useSearchParams } from "react-router";

const ShopSortBar = ({ total }) => {
    const [params, setParams] = useSearchParams();
    const currentSort = params.get("sort") || "newest";

    const handleSortChange = (e) => {
        params.set("sort", e.target.value);
        params.set("page", 1); // reset page when sorting changes
        setParams(params);
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-base-100 p-4 rounded shadow">
            {/* Result Count */}
            <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{total}</span> results
            </p>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort By:</span>
                <select
                    className="select select-bordered select-sm"
                    value={currentSort}
                    onChange={handleSortChange}
                >
                    <option value="newest">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating_desc">Top Rated</option>
                    <option value="sold_desc">Best Selling</option>
                </select>
            </div>
        </div>
    );
};

export default ShopSortBar;
