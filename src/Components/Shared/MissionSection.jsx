import React from "react";
import diningImage from "../../assets/dining-area.png"; // replace with your actual image path

const MissionSection = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 items-center">
            {/* ✅ Left Side — Mission Text */}
            <div className="bg-[#00473d] text-white p-10 flex flex-col justify-center h-full">
                <h2 className="text-3xl font-bold mb-4">OUR MISSION</h2>
                <p className="text-lg leading-relaxed">A meal designed to be explored and experienced in the moment</p>
            </div>

            {/* ✅ Right Side — Dining Image */}
            <div className="w-full h-full">
                <img src={diningImage} alt="Dining Area" className="w-full h-full object-cover" />
            </div>
        </section>
    );
};

export default MissionSection;
