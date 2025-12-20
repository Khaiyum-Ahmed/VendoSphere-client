import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useState, useEffect } from "react";
import VendoSphereLogo from "../Logo/VendoSphereLogo";

const Footer = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);

    // Show "Back to Top" button on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) setShowTopBtn(true);
            else setShowTopBtn(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="bg-base-200 text-base-content pt-10 relative">
            <div className="bg-base-200 pb-20 flex items-center justify-center ">
                <VendoSphereLogo></VendoSphereLogo>
            </div>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Navigation */}
                <div className="footer">
                    <span className="footer-title">Navigation</span>
                    <a href="/" className="link link-hover">Home</a>
                    <a href="/shop" className="link link-hover">Products</a>
                    <a href="/about" className="link link-hover">About Us</a>
                    <a href="/contact" className="link link-hover">Contact</a>
                </div>

                {/* Contact Info */}
                <div className="footer">
                    <span className="footer-title">Contact Us</span>
                    <a href="mailto:support@vendersphere.com" className="link link-hover">support@vendersphere.com</a>
                    <a href="tel:+1234567890" className="link link-hover">+1 234 567 890</a>
                    <span>123 Commerce St, City, Country</span>
                </div>

                {/* Social Links */}
                <div className="footer">
                    <span className="footer-title">Follow Us</span>
                    <div className="flex gap-4 mt-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="hover:text-primary transition" size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="hover:text-primary transition" size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="hover:text-primary transition" size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedinIn className="hover:text-primary transition" size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-10 pb-6 border-t border-base-300 text-sm">
                © {new Date().getFullYear()} VenderSphere. All rights reserved.
            </div>

            {/* Back to Top Button */}
            {showTopBtn && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 btn btn-primary text-white text-2xl btn-circle shadow-lg"
                >
                    ↑
                </button>
            )}
        </footer>
    );
};

export default Footer;
