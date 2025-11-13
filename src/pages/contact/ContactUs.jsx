import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion as Motion } from "framer-motion";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // For now, just simulate submission
        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for contacting us. We’ll get back to you soon!",
            confirmButtonColor: "#570DF8",
        });

        // Clear form
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="bg-base-100 text-base-content">
            {/* Header Section */}
            <section className="hero min-h-[40vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-primary-content">
                <div className="hero-content text-center">
                    <Motion.div
                        className="max-w-xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-bold mb-3">Contact Us</h1>
                        <p className="text-lg opacity-90">
                            Have questions or need help? Our team is here 24/7 to assist you.
                        </p>
                    </Motion.div>
                </div>
            </section>

            {/* Contact Details + Form */}
            <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                    <p className="opacity-80 mb-8">
                        You can reach us through email, phone, or by visiting our office.
                        We value your feedback and inquiries.
                    </p>

                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <FaMapMarkerAlt className="text-2xl text-primary mt-1" />
                            <div>
                                <h4 className="font-bold">Our Office</h4>
                                <p className="opacity-80">
                                    782 Borkapon Moulvibazar, sylhet, Bangladesh
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaEnvelope className="text-2xl text-primary mt-1" />
                            <div>
                                <h4 className="font-bold">Email</h4>
                                <p className="opacity-80">infowebdevelopment281@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaPhoneAlt className="text-2xl text-primary mt-1" />
                            <div>
                                <h4 className="font-bold">Phone</h4>
                                <p className="opacity-80">+8801782666281</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <FaClock className="text-2xl text-primary mt-1" />
                            <div>
                                <h4 className="font-bold">Working Hours</h4>
                                <p className="opacity-80">Sat - Thu: 9:00 AM - 10:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card bg-base-200 shadow-lg p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-center">
                        Send Us a Message
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">Message</span>
                            </label>
                            <textarea
                                name="message"
                                placeholder="Write your message..."
                                className="textarea textarea-bordered w-full h-32"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-4"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default ContactUs;
