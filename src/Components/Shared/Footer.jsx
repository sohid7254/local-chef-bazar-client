import React from "react";
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../assets/logo3.png";

const Footer = () => {
    return (
        <footer className="w-full py-12 bg-secondary shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
                {/* ✅ 1. Logo + Description */}
                <div className="flex flex-col items-start">
                    <Link to="/">
                        <img src={logo} alt="Website Logo" className="w-28 mb-3" />
                    </Link>
                    <p className="opacity-90 text-sm leading-relaxed">LocalChefBazaar — discover homemade meals, local chefs, and authentic flavors crafted with love.</p>
                </div>

                {/* ✅ 2. Routes */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Routes</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>
                            <Link to="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/aboutUs" className="hover:underline">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contactUs" className="hover:underline">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/chefs" className="hover:underline">
                                Chefs
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* ✅ 3. Working Hours */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Working Hours</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>Mon – Fri: 9 AM – 10 PM</li>
                        <li>Saturday: 10 AM – 11 PM</li>
                        <li>Sunday: Closed</li>
                    </ul>
                </div>

                {/* ✅ 4. Contact Details */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>Email: support@localchefbazaar.com</li>
                        <li>Phone: +880 1234 567 890</li>
                        <li>Address: Dhaka, Bangladesh</li>
                    </ul>
                </div>

                {/* ✅ 5. Social Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex flex-col gap-3">
                        <a href="#" className="flex items-center gap-2 hover:opacity-80">
                            <FaFacebookSquare className="text-3xl" />
                            <span className="text-lg font-semibold">Facebook</span>
                        </a>

                        <a href="#" className="flex items-center gap-2 hover:opacity-80">
                            <FaGithubSquare className="text-3xl" />
                            <span className="text-lg font-semibold">GitHub</span>
                        </a>

                        <a href="#" className="flex items-center gap-2 hover:opacity-80">
                            <FaLinkedin className="text-3xl" />
                            <span className="text-lg font-semibold">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* ✅ Divider */}
            <div className="border border-gray-400 mt-4 w-300 mx-auto"></div>

            {/* ✅ Bottom Section */}
            <div className="text-center mt-4 text-sm opacity-70">© {new Date().getFullYear()} LocalChefBazaar — All Rights Reserved.</div>
        </footer>
    );
};

export default Footer;
