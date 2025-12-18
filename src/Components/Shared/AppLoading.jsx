import React from 'react';

import loading from '../../assets/json/Loading (2).json'
import Lottie from 'react-lottie';


const AppLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
                    <Lottie
                        options={{
                            loop: false,
                            autoplay: true,
                            animationData: loading,
                        }}
                        height={200}
                        width={200}
                    ></Lottie>
                    
                </div>
    );
};

export default AppLoading;