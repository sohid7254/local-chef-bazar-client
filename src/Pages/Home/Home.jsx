import React from 'react';
import HeroBanner from '../../Components/Home/HeroBanner';
import HeroOverlay from '../../Components/Home/HeroOverlay';
import KitchenView from '../../Components/Home/KitchenView';
import LeatestMeal from '../../Components/Home/LeatestMeal';

const Home = () => {
    return (
        <div>
            <HeroBanner/>
            <HeroOverlay/>
            <LeatestMeal/>
            <KitchenView/>
        </div>
    );
};

export default Home;