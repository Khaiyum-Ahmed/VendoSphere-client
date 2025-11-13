import { FaStore, FaUsers, FaRocket, FaHandshake } from "react-icons/fa";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router";

const AboutUs = () => {
    return (
        <div className="bg-base-100 text-base-content">
            {/* Hero Section */}
            <section className="hero mt-10 min-h-[60vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-primary-content rounded-2xl">
                <div className="hero-content text-center">
                    <div className="max-w-2xl">
                        <Motion.h1
                            className="text-5xl font-bold mb-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            About Our Marketplace
                        </Motion.h1>
                        <p className="text-lg opacity-90">
                            A trusted VendorSphere e-commerce platform that connects customers
                            with verified sellers across Bangladesh. We empower entrepreneurs
                            and bring quality products closer to you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 px-6 md:px-20 bg-base-200 rounded-xl mt-10">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Our Mission & Vision</h2>
                    <p className="text-base opacity-80 leading-relaxed">
                        Our mission is to simplify online selling and shopping. We provide
                        a secure, reliable, and user-friendly environment for vendors to
                        grow and for customers to enjoy a seamless experience.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="card bg-base-100 shadow-lg p-6 text-center">
                        <FaRocket className="text-4xl text-primary mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-2">Innovation</h3>
                        <p className="text-sm opacity-75">
                            We constantly improve our technology to ensure smooth
                            transactions and real-time updates.
                        </p>
                    </div>

                    <div className="card bg-base-100 shadow-lg p-6 text-center">
                        <FaUsers className="text-4xl text-primary mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-2">Community</h3>
                        <p className="text-sm opacity-75">
                            We build trust between customers and sellers through transparency
                            and responsive service.
                        </p>
                    </div>

                    <div className="card bg-base-100 shadow-lg p-6 text-center">
                        <FaHandshake className="text-4xl text-primary mx-auto mb-3" />
                        <h3 className="font-bold text-lg mb-2">Commitment</h3>
                        <p className="text-sm opacity-75">
                            We are dedicated to supporting every vendor’s journey and every
                            buyer’s satisfaction.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 px-6 md:px-20">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div>
                            <ul className="list-disc list-inside space-y-3 text-base opacity-80">
                                <li>Verified and trusted multi-vendor system.</li>
                                <li>Secure payments with multiple gateways (bKash, Stripe, etc.).</li>
                                <li>Responsive design for mobile, tablet, and desktop.</li>
                                <li>Real-time order tracking and seller analytics.</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="list-disc list-inside space-y-3 text-base opacity-80">
                                <li>Dedicated dashboards for admin, seller, and customer.</li>
                                <li>24/7 customer support and easy returns policy.</li>
                                <li>SEO-optimized and performance-driven platform.</li>
                                <li>Continuous improvements and feature updates.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-base-200 py-12 text-center">
                <FaStore className="text-5xl text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Join Our Growing Marketplace</h3>
                <p className="opacity-80 mb-6">
                    Whether you’re a seller or a buyer, we make e-commerce easier for you.
                </p>
                <Link to='/become-Seller' className="btn btn-primary">Become a Seller</Link>
            </section>
        </div>
    );
};

export default AboutUs;
