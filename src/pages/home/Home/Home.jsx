import UseAuth from "../../../hooks/UseAuth";
import CategoriesSection from "./CategoriesSection/CategoriesSection";
import HeroSection from "./HeroSection/HeroSection";

const Home = () => {
    const {user} = UseAuth()
    console.log(user)
    return (
        <div>
            <HeroSection></HeroSection>
            <CategoriesSection></CategoriesSection>
        </div>
    );
};

export default Home;