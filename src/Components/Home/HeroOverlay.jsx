import React from "react";
import bannerImage from "../../assets/banner/About121.jpg";

const HeroOverlay = () => {
    return (
        <section
            className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg"
            style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 flex flex-col justify-start px-6 pt-10 z-10">
                <h2 className="text-sm md:text-sm font-bold text-secondary mb-4">Our Restaurant</h2>

                <p className="text-lg md:text-4xl font-bold text-secondary mb-6">
                    A culinary <br /> adventure for all <br /> the senses
                </p>

                <button className="bg-green-700 w-32 hover:bg-green-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300">Learn More</button>
            </div>
        </section>
    );
};

export default HeroOverlay;
