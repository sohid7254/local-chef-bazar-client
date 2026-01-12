import React from "react";

const faqs = [
    {
        question: "Do you offer delivery?",
        answer: "Yes, we offer fast and reliable delivery within the city limits. Free delivery for orders over $50.",
    },
    {
        question: "Can I customize my order?",
        answer: "Absolutely! You can add special instructions for allergies or preferences when placing your order.",
    },
    {
        question: "Is the food fresh?",
        answer: "We take pride in using only the freshest ingredients, sourced daily from local farmers and markets.",
    },
    {
        question: "Do you have vegan options?",
        answer: "Yes, we have a wide range of delicious vegan and vegetarian options available in our menu.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and cash on delivery.",
    },
];

const FAQ = () => {
    return (
        <section className="py-16 px-4 bg-secondary" data-aos="fade-up">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 text-[var(--color-primary)]">Frequently Asked Questions</h2>
                    <p className="">Got questions? We have answers.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="collapse collapse-arrow bg-white dark:bg-[#002923] dark:border dark:border-[#8fcf4f]/30 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <input type="radio" name="my-accordion-2" defaultChecked={index === 0} />
                            <div className="collapse-title text-lg font-medium text-gray-800 dark:text-gray-200">{faq.question}</div>
                            <div className="collapse-content">
                                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
