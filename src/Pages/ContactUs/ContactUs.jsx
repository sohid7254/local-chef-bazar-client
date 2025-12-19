import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ContactUs = () => {
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axiosSecure.post("/contact", formData);
        if (res.data.success) {
            Swal.fire("Success", "We will contact you soon", "success");
            setFormData({ name: "", email: "", message: "" });
        }
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10 md:py-12">
            <Helmet>
                <title>Contact Us</title>
            </Helmet>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10">Contact Us</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12">
                <div
                    className="p-4 sm:p-5 md:p-6 bg-[#d8e6d5] text-black rounded-xl shadow-md 
                                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    data-aos="flip-left"
                    data-aos-delay="0"
                >
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt /> Address
                    </h3>
                    <p className="text-xs sm:text-sm opacity-80">Dhaka, Bangladesh</p>
                </div>

                <div
                    className="p-4 sm:p-5 md:p-6 bg-[#d8e6d5] text-black rounded-xl shadow-md 
                                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    data-aos="flip-left"
                    data-aos-delay="200"
                >
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                        <IoCallOutline /> Phone
                    </h3>
                    <p className="text-xs sm:text-sm opacity-80">+880 1234 567 890</p>
                </div>

                <div
                    className="p-4 sm:p-5 md:p-6 bg-[#d8e6d5] text-black rounded-xl shadow-md 
                                transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    data-aos="flip-left"
                    data-aos-delay="400"
                >
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 flex items-center gap-2">
                        <HiOutlineMailOpen /> Email
                    </h3>
                    <p className="text-xs sm:text-sm opacity-80">support@localchefbazaar.com</p>
                </div>
            </div>

            <div className="max-w-2xl mx-auto  p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition" data-aos="zoom-in-up">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" className="w-full border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Message</label>
                        <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Write your message..." className="w-full border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary" required></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#00382f] text-white py-3 rounded-lg font-semibold hover:bg-[#00473d] transition">
                        Send Message
                    </button>
                </form>
            </div>

            <div className="text-center mt-10 sm:mt-12 opacity-80">
                <h3 className="text-base sm:text-lg font-semibold mb-2">🕒 Working Hours</h3>
                <p className="text-sm sm:text-base">Mon – Fri: 9 AM – 10 PM</p>
                <p className="text-sm sm:text-base">Saturday: 10 AM – 11 PM</p>
                <p className="text-sm sm:text-base">Sunday: Closed</p>
            </div>
        </div>
    );
};

export default ContactUs;
