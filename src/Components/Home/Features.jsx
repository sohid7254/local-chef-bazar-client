import React from "react";
import { FaTruck, FaClock, FaAward, FaLeaf } from "react-icons/fa";

const features = [
    {
        id: 1,
        title: "Fast Delivery",
        description: "Get your food delivered to your doorstep in record time.",
        icon: <FaTruck className="text-4xl" />,
        color: "bg-blue-50 text-blue-600",
    },
    {
        id: 2,
        title: "24/7 Service",
        description: "Our kitchen and delivery services are open around the clock.",
        icon: <FaClock className="text-4xl" />,
        color: "bg-orange-50 text-orange-600",
    },
    {
        id: 3,
        title: "Quality Food",
        description: "Top-rated chefs ensuring the best quality for every meal.",
        icon: <FaAward className="text-4xl" />,
        color: "bg-purple-50 text-purple-600",
    },
    {
        id: 4,
        title: "Organic Ingredients",
        description: "We prioritize fresh, organic, and locally sourced ingredients.",
        icon: <FaLeaf className="text-4xl" />,
        color: "bg-green-50 text-green-600",
    },
];

const Features = () => {
    return (
        <section className=" px-4 bg-[var(--color-secondary)]/30" data-aos="fade-up">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">Why Choose Us?</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">We bring the best culinary experience to your home with speed, quality, and passion.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.id} className="p-8 rounded-2xl bg-white dark:bg-[#002923] shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-[#8fcf4f]/20 text-center group">
                            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300`}>{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
