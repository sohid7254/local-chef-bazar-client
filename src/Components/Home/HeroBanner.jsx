import React, { useEffect, useState } from "react";
import img1 from "../../assets/banner/home1.jpg";
import img2 from "../../assets/banner/home1 (2).jpg";
import img3 from "../../assets/banner/home1 (1).jpg";
const images = [img1, img2, img3];

const HeroBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // ✅ Auto-slide every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8  py-7 bg-secondary rounded-xl">
            {/* ✅ Left Side — Text */}
            <div className="space-y-6">
                <div className="bg-green-600 text-white px-4 py-2 rounded-full inline-block font-semibold text-sm">GRAND VEGGIE eat clean & Fresh</div>

                <h1 className="text-3xl md:text-5xl font-bold leading-snug">
                    Highlights <br />
                    <span className="text-primary">Where every ingredient tells a story</span>
                </h1>

                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300">View Our Menus</button>
            </div>

            {/* ✅ Right Side — Sliding Image */}
            <div>
                <img src={images[currentIndex]} alt="Hero Dish" className="w-full h-80 md:h-[450px] object-cover rounded-xl shadow-lg transition-all duration-700" />
            </div>
        </section>
    );
};

export default HeroBanner;
