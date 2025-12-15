import React from "react";
import HeroBanner from "../../Components/Home/HeroBanner";
import HeroOverlay from "../../Components/Home/HeroOverlay";
import KitchenView from "../../Components/Home/KitchenView";
import LeatestMeal from "../../Components/Home/LeatestMeal";
import ReviewSection from "../../Components/Shared/ReviewSection";

const Home = () => {
    return (
        <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16">
            <HeroBanner />
            <HeroOverlay />
            <LeatestMeal />
            <KitchenView />
            <ReviewSection />
        </div>
    );
};

export default Home;
