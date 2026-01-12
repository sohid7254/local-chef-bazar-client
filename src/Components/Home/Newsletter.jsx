import React from "react";
import { FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
    return (
        <section className="py-8 px-4" data-aos="fade-up">
            <div className="max-w-7xl mx-auto bg-gradient-to-r from-[var(--color-primary)] to-[#002923] rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-[var(--color-third)]/20 rounded-full translate-x-1/3 translate-y-1/3 blur-xl"></div>

                <div className="relative z-10 w-full max-w-2xl mx-auto">
                    <div className="inline-block p-3 rounded-full bg-white/10 mb-6 text-[var(--color-third)] text-3xl">
                        <FaEnvelope />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Subscribe to our Newsletter</h2>
                    <p className="text-gray-200 mb-8 text-lg">Stay updated with our latest delicious offers, menu updates, and secret recipes delivered straight to your inbox.</p>

                    <form className="flex flex-col md:flex-row gap-4 w-full">
                        <input type="email" placeholder="Enter your email address" className="input input-lg w-full rounded-full bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-third)] flex-1 px-6 py-4" required />
                        <button className="btn btn-lg rounded-full bg-[var(--color-third)] text-[var(--color-primary)] hover:bg-white hover:text-[var(--color-primary)] font-bold px-8 border-none transform hover:scale-105 transition-all">Subscribe Now</button>
                    </form>
                    <p className="mt-4 text-xs text-gray-400">No spam, just food love.</p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
