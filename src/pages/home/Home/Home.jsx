import UseAuth from "../../../hooks/UseAuth";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import FeaturedProducts from "./FeaturedProduct/FeaturedProduct";
import HeroSection from "./HeroSection/HeroSection";

const Home = () => {
    const {user} = UseAuth()
    console.log(user)
    return (
        <div>
            <HeroSection></HeroSection>
            <CategoriesSection></CategoriesSection>
            <FeaturedProducts></FeaturedProducts>
        </div>
    );
};

export default Home;