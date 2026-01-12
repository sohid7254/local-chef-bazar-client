import React, { useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router";
import { blogs } from "../../Utils/blogData";
import { FaCalendarAlt, FaUser, FaArrowLeft, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Helmet } from "react-helmet";

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const blog = blogs.find((b) => b.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Blog Post Not Found</h2>
                <button onClick={() => navigate("/blogs")} className="btn btn-primary text-white">
                    Back to Blogs
                </button>
            </div>
        );
    }

    return (
        <section className="py-12 px-4 bg-secondary dark:bg-gray-900 min-h-screen">
            <Helmet>
                <title>{blog.title} || Local Chef Bazar</title>
            </Helmet>
            <div className="max-w-4xl mx-auto">
                <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6 gap-2 text-gray-600 dark:text-gray-400 hover:text-[var(--color-primary)]">
                    <FaArrowLeft /> Back
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-[var(--color-primary)] leading-tight">{blog.title}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-6 mb-8">
                        <span className="flex items-center">
                            <FaCalendarAlt className="mr-2" /> {blog.date}
                        </span>
                        <span className="flex items-center">
                            <FaUser className="mr-2" /> by {blog.author}
                        </span>
                    </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-xl mb-10 h-[300px] md:h-[500px]">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[var(--color-primary)] prose-a:text-[var(--color-primary)]">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>

                {/* Related or Navigation (Optional) */}
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h4 className="text-xl font-bold">Share this article</h4>
                        {/* Placeholder for social share */}
                        <div className="flex gap-2">
                            <button className="btn btn-sm btn-circle btn-outline"><FaFacebook/></button>
                            <button className="btn btn-sm btn-circle btn-outline"><FaTwitter/></button>
                            <button className="btn btn-sm btn-circle btn-outline"><FaLinkedin/></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;
