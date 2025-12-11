import React from "react";
import diningImage from "../../assets/About/Service1 (3).jpg"; // replace with your actual image path

const MissionSection = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 items-center h-100 mt-10 rounded-xl overflow-hidden shadow-lg">
            {/* ✅ Left Side — Mission Text */}
            <div className="bg-primary text-white flex flex-col justify-between p-10 h-full">
                <h2 className="text-3xl  font-bold mb-4">OUR MISSION</h2>
                <p className="lg:text-5xl tex-lg">A meal designed to be explored and experienced in the moment</p>
            </div>

            {/* ✅ Right Side — Dining Image */}
            <div className="">
                <img src={diningImage} alt="Dining Area" className=" w-full h-100 object-cover" />
            </div>
        </section>
    );
};

export default MissionSection;
