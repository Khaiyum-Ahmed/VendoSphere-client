import CategoriesSection from "../../home/Home/CategoriesSection/CategoriesSection";
import CategoryProducts from "../../home/Home/CategoryProducts/CategoryProducts";


const ShopPage = () => {
    return (
        <div className="px-4 md:px-8 lg:px-16 py-10">
           <CategoriesSection></CategoriesSection>
           <CategoryProducts></CategoryProducts>
        </div>
    );
};

export default ShopPage;
