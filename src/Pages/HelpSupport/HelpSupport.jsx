import React from "react";
import { Helmet } from "react-helmet";
import { FaQuestionCircle, FaHeadset, FaEnvelope } from "react-icons/fa";

const HelpSupport = () => {
    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Help & Support | LocalChefBazaar</title>
            </Helmet>

            <div className="max-w-4xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-primary">How can we help you?</h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">Find answers to common questions or get in touch with our support team.</p>
                </div>

                {/* Search / Hero Area (Visual only for now) */}
                <div className="bg-secondary p-8 rounded-2xl shadow-sm text-center">
                    <FaQuestionCircle className="text-6xl text-primary mx-auto mb-4 opacity-50" />
                    <p className="text-xl font-semibold">Browse our Frequently Asked Questions below</p>
                </div>

                {/* FAQ Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold border-b pb-2">Frequently Asked Questions</h2>

                    <div className="collapse collapse-plus bg-base-200 rounded-lg">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-xl font-medium">How do I place an order?</div>
                        <div className="collapse-content">
                            <p>Simply browse our meals, select the ones you love, add them to your cart, and proceed to checkout. It's that easy!</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200 rounded-lg">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">What payment methods do you accept?</div>
                        <div className="collapse-content">
                            <p>We accept major credit cards, debit cards, and secure online payment gateways like Stripe.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200 rounded-lg">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">Can I cancel my order?</div>
                        <div className="collapse-content">
                            <p>Orders can be cancelled within 15 minutes of placement. After that, preparation may have already begun.</p>
                        </div>
                    </div>
                </div>

                {/* Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
                        <FaHeadset className="text-4xl text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                        <p className="text-gray-500 mb-4">Chat with our support team in real-time.</p>
                        <button className="btn btn-primary btn-outline btn-sm">Start Chat</button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
                        <FaEnvelope className="text-4xl text-secondary mb-4" />
                        <h3 className="text-xl font-bold mb-2">Email Support</h3>
                        <p className="text-gray-500 mb-4">Send us an email and we'll get back to you.</p>
                        <a href="mailto:support@localchefbazaar.com" className="btn btn-secondary btn-outline btn-sm">
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpSupport;
