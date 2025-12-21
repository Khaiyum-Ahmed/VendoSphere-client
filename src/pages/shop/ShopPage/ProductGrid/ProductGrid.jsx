import ProductCard from "../ProductCard/ProductCard";


const ProductGrid = ({ products }) => {
    if (!products.length) {
        return (
            <p className="text-center py-20 text-gray-500">
                No products found. Try changing filters.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.map((p) => (
                <ProductCard key={p._id} product={p} />
            ))}
        </div>
    );
};

export default ProductGrid;
