import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const chefs = [
    {
        id: 1,
        name: "John Doe",
        role: "Head Chef",
        image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 2,
        name: "Jane Smith",
        role: "Sous Chef",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 3,
        name: "Mike Johnson",
        role: "Pastry Chef",
        image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Junior Chef",
        image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
];

const Team = () => {
    return (
        <section className=" px-4 bg-[var(--color-secondary)]/30" data-aos="fade-up">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">Meet Our Master Chefs</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">The talented hands and creative minds behind your favorite dishes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {chefs.map((chef) => (
                        <div key={chef.id} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                            <img src={chef.image} alt={chef.name} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                                <h3 className="text-2xl font-bold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{chef.name}</h3>
                                <p className="text-sm uppercase tracking-wider mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{chef.role}</p>
                                <div className="flex space-x-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                    <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-[var(--color-primary)] transition-colors">
                                        <FaFacebook />
                                    </a>
                                    <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-[var(--color-primary)] transition-colors">
                                        <FaTwitter />
                                    </a>
                                    <a href="#" className="p-2 bg-white/20 rounded-full hover:bg-[var(--color-primary)] transition-colors">
                                        <FaInstagram />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
