import React from "react";
import { Helmet } from "react-helmet";

const PrivacyTerms = () => {
    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Privacy & Terms | LocalChefBazaar</title>
            </Helmet>

            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-primary p-8 text-white text-center">
                    <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy & Terms</h1>
                    <p className="opacity-90 mt-2">Last updated: January 2026</p>
                </div>

                <div className="p-8 md:p-12 space-y-8 text-gray-700 dark:text-gray-300">
                    {/* Privacy Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">1. Privacy Policy</h2>
                        <p className="mb-4">At LocalChefBazaar, we value your privacy. This policy explains how we collect, use, and protect your personal information.</p>
                        <h3 className="text-lg font-semibold mb-2">Information We Collect</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                            <li>Personal identification information (Name, email address, phone number, etc.)</li>
                            <li>Payment details for transaction processing.</li>
                            <li>Order history and preferences.</li>
                        </ul>
                        <h3 className="text-lg font-semibold mb-2">How We Use Your Information</h3>
                        <p>We use your data to process orders, improve our services, and communicate with you about promotions or updates. We do not sell your data to third parties.</p>
                    </section>

                    <div className="divider"></div>

                    {/* Terms Section */}
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-4">2. Terms of Service</h2>
                        <p className="mb-4">By using LocalChefBazaar, you agree to the following terms and conditions.</p>
                        <h3 className="text-lg font-semibold mb-2">User Responsibilities</h3>
                        <p className="mb-4">Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.</p>
                        <h3 className="text-lg font-semibold mb-2">Order Cancellations</h3>
                        <p className="mb-4">Orders may be cancelled within a limited time window. Refunds are processed according to our refund policy.</p>
                        <h3 className="text-lg font-semibold mb-2">Prohibited Activities</h3>
                        <p>You may not use our service for any illegal or unauthorized purpose. Harassment, abuse, or fraudulent activity will result in account termination.</p>
                    </section>

                    <div className="divider"></div>

                    <section className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                        <p className="font-semibold">Have questions about our policies?</p>
                        <p className="text-sm mt-2">
                            Contact our legal team at{" "}
                            <a href="mailto:legal@localchefbazaar.com" className="text-primary hover:underline">
                                legal@localchefbazaar.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyTerms;
