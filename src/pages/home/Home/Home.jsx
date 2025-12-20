import UseAuth from "../../../hooks/UseAuth";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import FeaturedProducts from "./FeaturedProduct/FeaturedProduct";
import FlashSale from "./FlashSale/FlashSale";
import HeroSection from "./HeroSection/HeroSection";
import Testimonials from "./Testimonials/Testimonials";
import TopSellers from "./TopSellers/TopSellers";

const Home = () => {
    const {user} = UseAuth()
    console.log(user)
    return (
        <div>
            <HeroSection></HeroSection>
            <CategoriesSection></CategoriesSection>
            <FeaturedProducts></FeaturedProducts>
            <TopSellers></TopSellers>
            <FlashSale></FlashSale>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;