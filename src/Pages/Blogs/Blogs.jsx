import React from "react";
import { NavLink } from "react-router";
import { blogs } from "../../Utils/blogData";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Blogs = () => {
    return (
        <section className="py-16 px-4 bg-secondary dark:bg-gray-900 min-h-screen">
            <Helmet>
                <title>Blogs || Local Chef Bazar</title>
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-[var(--color-primary)]">Our Culinary Journal</h2>
                    <p className="max-w-2xl mx-auto">Dive into our collection of recipes, tips, and stories from our master chefs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="card bg-base-100 dark:bg-[#002923] shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 dark:border-none flex flex-col h-full">
                            <figure className="h-56 overflow-hidden relative group">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            </figure>
                            <div className="card-body p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-300 mb-3 space-x-4">
                                    <span className="flex items-center">
                                        <FaCalendarAlt className="mr-1" /> {blog.date}
                                    </span>
                                    <span className="flex items-center">
                                        <FaUser className="mr-1" /> {blog.author}
                                    </span>
                                </div>
                                <h3 className="card-title text-xl text-primary font-bold mb-3  cursor-pointer transition-colors">{blog.title}</h3>
                                <p className=" text-sm mb-6 flex-grow">{blog.excerpt}</p>
                                <div className="card-actions justify-start mt-auto">
                                    <NavLink to={`/blogs/${blog.id}`} className="btn bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] border-none rounded-full px-6 flex items-center gap-2 group">
                                        Read More <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
