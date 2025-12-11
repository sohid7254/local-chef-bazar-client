import React from 'react';
import MissionSection from '../../Components/Shared/MissionSection';
import MissionSection2 from '../../Components/Shared/MissionSuccess2';
import FoodProcessSection from '../../Components/Shared/FoodProcessSection';

const AboutUs = () => {
    return (
        <div>
            <h3 className="text-center text-4xl font-bold mt-4">About Us</h3>
            <div className="rounded-xl">
                <MissionSection />
            </div>

            <div className="px-4 md:ml-50 space-y-5 mt-10 mb-10 text-center md:text-left">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                        We make a small, intimate, and inviting <br className="hidden md:block" />
                        space for an unforgettable meal
                    </h2>
                </div>

                <div className="md:ml-20">
                    <h3 className="text-sm md:text-base font-semibold leading-relaxed">
                        Convert leads into customers and then turn those customers into loyal fans of your <br className="hidden md:block" />
                        brand by leveraging next-generation automation and AI. Yes, it really can be <br className="hidden md:block" />
                        automated, and no, you’re not dreaming.
                    </h3>
                </div>
            </div>

            <div className="rounded-xl">
                <MissionSection2 />
            </div>

            <div className="px-4 md:ml-50 space-y-5 mt-10 mb-10 text-center md:text-left">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold leading-snug">
                        Immerse Yourself in an experience that <br className="hidden md:block" />
                        transcends the ordinary dining out.
                    </h2>
                </div>

                <div className="md:ml-20">
                    <h3 className="text-sm md:text-base font-semibold leading-relaxed">
                        In a world where the long-and short-term effects of climate change pose major <br className="hidden md:block" />
                        chalanges for farmers,the need for regenarative food system has never been more <br className="hidden md:block" />
                        importamnt. That's why we've made a promise to do more for the planet, by taking less.
                        <br className="hidden md:block" />. Our plant-forward menu means that we're already on average 30% less carbon
                        <br className="hidden md:block" /> intensive than the average American meal.
                    </h3>
                </div>
            </div>
            <div>
                <FoodProcessSection/>
            </div>
        </div>
    );
};

export default AboutUs;