import React, { useEffect } from "react";

import "aos/dist/aos.css";
import { Outlet } from "react-router";
import NavBar from "../../Components/Shared/Navbar";
import Footer from "../../Components/Shared/Footer";
import useAuth from "../../Hooks/useAuth";
import AppLoading from "../../Components/Shared/AppLoading";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import Aos from "aos";

const RootLayout = () => {
    const { loading } = useAuth();

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: false,
        });
    }, []);

    if (loading) {
        return <AppLoading />;
    }
    return (
        <div className=" flex flex-col min-h-screen text-base-content">
            {/* Navbar */}
            <ScrollToTop></ScrollToTop>
            <NavBar />

            {/* Main Content - grows to fill available space */}
            <main className=" grow">
                <div className="max-w-7xl mx-auto px-2 sm:px-4">
                    <Outlet />
                </div>
            </main>

            {/* Footer stays at the bottom */}
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
