import React from "react";
import { Outlet } from "react-router";
import NavBar from "../../Components/Shared/Navbar";
import Footer from "../../Components/Shared/Footer";



const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen text-base-content">
            {/* Navbar */}
            <NavBar />

            {/* Main Content - grows to fill available space */}
            <main className="grow">
                <div className="max-w-7xl mx-auto px-4 ">
                    <Outlet />
                </div>
            </main>

            {/* Footer stays at the bottom */}
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
