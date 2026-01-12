import React from "react";
import { FaPizzaSlice, FaHamburger, FaIceCream, FaCoffee, FaFish, FaCarrot } from "react-icons/fa";

const categories = [
    { id: 1, name: "Pizza", icon: <FaPizzaSlice />, color: "bg-red-100 text-red-600" },
    { id: 2, name: "Burger", icon: <FaHamburger />, color: "bg-orange-100 text-orange-600" },
    { id: 3, name: "Dessert", icon: <FaIceCream />, color: "bg-pink-100 text-pink-600" },
    { id: 4, name: "Coffee", icon: <FaCoffee />, color: "bg-amber-100 text-amber-600" },
    { id: 5, name: "Seafood", icon: <FaFish />, color: "bg-blue-100 text-blue-600" },
    { id: 6, name: "Veggie", icon: <FaCarrot />, color: "bg-green-100 text-green-600" },
];

const Categories = () => {
    return (
        <section className="py-8 px-4" data-aos="fade-up">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">Top Categories</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Explore our wide range of delicious cuisines, curated just for your taste buds.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="group p-6 rounded-2xl bg-white dark:bg-[#002923] dark:border dark:border-[#8fcf4f]/20 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-center border border-gray-100">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl ${cat.color} group-hover:scale-110 transition-transform duration-300`}>{cat.icon}</div>
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{cat.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
