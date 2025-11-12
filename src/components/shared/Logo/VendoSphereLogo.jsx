import { Link } from "react-router";
import logoImg from "../../../assets/shopping-cart.png"
import { motion as Motion } from "motion/react"
const VendoSphereLogo = () => {
    return (

        <Link to='/' className="flex items-center">
            <img className="w-10" src={logoImg} alt="VendoSphere_logo" />
            <Motion.a animate={{
                color: ['#F54927', '#F5A627', '#3CF527', '#27F5D6', '#278EF5', '#3527F5', '#AD27F5', '#F527E7'],
                transition: { duration: 4, repeat: Infinity }
            }} className="font-extrabold text-2xl lg:text-3xl ml-2">Vendo_Sphere</Motion.a>
        </Link>

    );
};

export default VendoSphereLogo;

