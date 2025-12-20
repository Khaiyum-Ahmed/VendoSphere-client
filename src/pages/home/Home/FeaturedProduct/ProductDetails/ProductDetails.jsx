import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../../../hooks/UseAxios";
import ProductGallery from "../ProductGallery/ProductGallery";
import ProductTabs from "../ProductTabs/ProductTabs";
import SellerInfo from "../SellerInfo/SellerInfo";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import ProductSummary from "../ProductSummary/ProductSummary";
import Loading from "../../../../Loading/Loading";

const ProductDetails = () => {
    const { id } = useParams();
    // console.log(id)
    const axiosInstance = UseAxios();

    const { data: product = {}, isLoading } = useQuery({
        queryKey: ["product-details", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/product/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
            {/* Top Section */}
            <div className="grid lg:grid-cols-2 gap-10">
                <ProductGallery
                    images={
                        Array.isArray(product.images)
                            ? product.images
                            : product.image
                                ? [product.image]
                                : []
                    }
                />
                <ProductSummary product={product} />
            </div>

            {/* Tabs */}
            <ProductTabs product={product} />

            {/* Seller Info */}
            {product.seller && <SellerInfo seller={product.seller} />}


            {/* Related Products */}
            <RelatedProducts
                productId={product._id}
            />
        </div>
    );
};

export default ProductDetails;
