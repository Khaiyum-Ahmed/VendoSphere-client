import UseAuth from "../../../hooks/UseAuth";
import HeroSection from "./HeroSection/HeroSection";

const Home = () => {
    const {user} = UseAuth()
    console.log(user)
    return (
        <div>
            <HeroSection></HeroSection>
        </div>
    );
};

export default Home;