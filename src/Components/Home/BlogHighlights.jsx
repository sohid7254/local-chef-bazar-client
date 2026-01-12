import React from "react";
import { FaCalendarAlt, FaUser, FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router";
import { blogs } from "../../Utils/blogData";

const BlogHighlights = () => {
    // Get the first 3 blogs for the highlight section
    const recentBlogs = blogs.slice(0, 3);

    return (
        <section className=" px-4" data-aos="fade-up">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="text-left">
                        <h2 className="text-3xl font-bold mb-2 text-[var(--color-primary)]">Latest Culinary News</h2>
                        <p className="text-gray-600 dark:text-gray-300">Read our latest articles, tips, and recipes.</p>
                    </div>
                    <NavLink to="/blogs" className="btn btn-outline border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-full px-6 transition-all group">
                        View All Posts <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </NavLink>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {recentBlogs.map((blog) => (
                        <div key={blog.id} className="card bg-base-100 dark:bg-[#002923] shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden border border-gray-100 dark:border-none">
                            <figure className="h-48 overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" />
                            </figure>
                            <div className="card-body p-6">
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-300 mb-3 space-x-4">
                                    <span className="flex items-center">
                                        <FaCalendarAlt className="mr-1" /> {blog.date}
                                    </span>
                                    <span className="flex items-center">
                                        <FaUser className="mr-1" /> {blog.author}
                                    </span>
                                </div>
                                <h3 className="card-title text-xl font-bold mb-2 text-primary  cursor-pointer transition-colors">{blog.title}</h3>
                                <p className="text-gray-600 dark:text-gray-200 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                                <div className="card-actions justify-start">
                                    <NavLink to={`/blogs/${blog.id}`} className="text-[var(--color-primary)] font-semibold flex items-center hover:underline">
                                        Read More <FaArrowRight className="ml-2 text-xs" />
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

export default BlogHighlights;
