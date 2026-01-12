import React from "react";
import HeroBanner from "../../Components/Home/HeroBanner";
import HeroOverlay from "../../Components/Home/HeroOverlay";
import KitchenView from "../../Components/Home/KitchenView";
import LeatestMeal from "../../Components/Home/LeatestMeal";
import ReviewSection from "../../Components/Shared/ReviewSection";
import Categories from "../../Components/Home/Categories";
import Features from "../../Components/Home/Features";
import Stats from "../../Components/Home/Stats";
import Team from "../../Components/Home/Team";
import FAQ from "../../Components/Home/FAQ";
import BlogHighlights from "../../Components/Home/BlogHighlights";
import Newsletter from "../../Components/Home/Newsletter";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
            <Helmet>
                <title>Home || Local Chef Bazar</title>
            </Helmet>
            <HeroBanner />
            <HeroOverlay />
            <Categories />
            <Features />
            <LeatestMeal />
            <KitchenView />
            <Stats />
            <Team />
            <ReviewSection />
            <FAQ />
            <BlogHighlights />
            <Newsletter />
        </div>
    );
};

export default Home;
