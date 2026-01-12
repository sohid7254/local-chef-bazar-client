import React from "react";
import { FaUserFriends, FaUtensils, FaStar, FaSmile } from "react-icons/fa";

const stats = [
    { id: 1, label: "Happy Customers", value: "10k+", icon: <FaSmile />, color: "text-yellow-500" },
    { id: 2, label: "Meals Served", value: "50k+", icon: <FaUtensils />, color: "text-orange-500" },
    { id: 3, label: "5 Star Reviews", value: "8k+", icon: <FaStar />, color: "text-yellow-400" },
    { id: 4, label: "Expert Chefs", value: "100+", icon: <FaUserFriends />, color: "text-blue-500" },
];

const Stats = () => {
    return (
        <section className=" bg-[var(--color-primary)] text-[var(--color-secondary)] px-4" data-aos="fade-up">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat) => (
                    <div key={stat.id} className="flex flex-col items-center p-4">
                        <div className={`text-4xl mb-3 ${stat.color} bg-white/10 p-4 rounded-full`}>{stat.icon}</div>
                        <h3 className="text-4xl font-extrabold mb-1">{stat.value}</h3>
                        <p className="text-sm uppercase tracking-wider opacity-80">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
