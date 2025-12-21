// ShopFilters.jsx
import { useSearchParams } from "react-router";

const ShopFilters = () => {
    const [params, setParams] = useSearchParams();

    const updateParam = (key, value) => {
        if (value) params.set(key, value);
        else params.delete(key);
        setParams(params);
    };

    return (
        <div className="card bg-base-100 shadow p-4 space-y-4">
            <input
                type="text"
                placeholder="Search..."
                className="input input-bordered w-full"
                onChange={(e) => updateParam("search", e.target.value)}
            />

            <div>
                <h4 className="font-semibold mb-2">Price Range</h4>
                <input
                    type="number"
                    placeholder="Min"
                    className="input input-bordered mb-2 w-full"
                    onBlur={(e) => updateParam("price_min", e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max"
                    className="input input-bordered w-full"
                    onBlur={(e) => updateParam("price_max", e.target.value)}
                />
            </div>

            <button
                className="btn btn-outline btn-sm"
                onClick={() => setParams({})}
            >
                Reset Filters
            </button>
        </div>
    );
};

export default ShopFilters;
