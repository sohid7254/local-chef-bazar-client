import React from 'react';
import HeroBanner from '../../Components/Home/HeroBanner';
import HeroOverlay from '../../Components/Home/HeroOverlay';
import KitchenView from '../../Components/Home/KitchenView';

const Home = () => {
    return (
        <div>
            <HeroBanner/>
            <HeroOverlay/>
            <KitchenView/>
        </div>
    );
};

export default Home;