// ShopPage.jsx
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../hooks/UseAxios";
import ShopFilters from "./ShopFilters/ShopFilters";
import ProductGrid from "./ProductGrid/ProductGrid";
import Pagination from "./Pagination/Pagination";
import ShopSortBar from "./ShopSortBar/ShopSortBar";
import CategoryProducts from "../../home/Home/CategoryProducts/CategoryProducts";
import CategoriesSection from "../../home/Home/CategoriesSection/CategoriesSection";
import CategoriesShopSection from "./CategoriesShopSection/CategoriesShopSection";

const ShopPage = () => {
    const axiosInstance = UseAxios();
    const [params] = useSearchParams();

    const queryString = params.toString();

    const { data, isLoading } = useQuery({
        queryKey: ["shop-products", queryString],
        queryFn: async () => {
            const res = await axiosInstance.get(`/products?${queryString}`);
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center py-20">Loading...</p>;

    return (
        <div className="max-w-11/12 mx-auto">
            {/* <div className="px-4 md:px-8 lg:px-16 py-10">
                <CategoriesSection></CategoriesSection>
                <CategoryProducts></CategoryProducts>
            </div> */}

            <div className=" px-4 py-8 grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3">
                    {/* <CategoriesSection></CategoriesSection> */}
                    <CategoriesShopSection></CategoriesShopSection>

                </div>
                <div className="col-span-12 md:col-span-9 space-y-6">
                    <CategoryProducts></CategoryProducts>
                </div>
            </div>

            <div className=" px-4 py-8 grid grid-cols-12 gap-6">

                {/* Filters */}
                <div className="col-span-12 md:col-span-3">
                    <ShopFilters />

                </div>

                {/* Products */}
                <div className="col-span-12 md:col-span-9 space-y-6">
                    <ShopSortBar total={data.total} />
                    <ProductGrid products={data.products} />
                    <Pagination page={data.page} totalPages={data.totalPages} />
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
