import UseAuth from "../../../hooks/UseAuth";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import FeaturedProducts from "./FeaturedProduct/FeaturedProduct";
import FlashSale from "./FlashSale/FlashSale";
import HeroSection from "./HeroSection/HeroSection";
import NewsletterSubscription from "./NewsLetterSubscription/NewsLetterSubscription";
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
            <NewsletterSubscription></NewsletterSubscription>
        </div>
    );
};

export default Home;