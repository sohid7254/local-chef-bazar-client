import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/Logo1.png";
import useAuth from "../../Hooks/useAuth";

const NavBar = () => {
    const { user, logOut } = useAuth();

    // Theme Handling
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeToggle = (e) => {
        setTheme(e.target.checked ? "dark" : "light");
    };

    const handleLogout = () => {
        logOut()
            .then(() => console.log("Logged out successfully"))
            .catch((error) => console.error("Logout Error:", error));
    };

    // Links (reusable)
    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/contactUs" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    Contact Us
                </NavLink>
            </li>

            <li>
                <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    About Us
                </NavLink>
            </li>

            {user && (
                <li>
                    <NavLink to="/dashboard/myProfile" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="bg-secondary shadow-sm sticky top-0 z-50">
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* LEFT */}
                <div className="navbar-start flex items-center gap-2">
                    <img src={logo} alt="logo" className="w-24 h-10" />
                    <Link to="/" className="hidden sm:block ml-2 text-2xl font-bold text-primary">
                        LocalChefBazaar
                    </Link>
                </div>

                {/* CENTER (desktop) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-4">{links}</ul>
                </div>

                {/* RIGHT (desktop) */}
                <div className="navbar-end gap-3 hidden sm:flex">
                    {/* Theme Toggle */}
                    <label>
                        <input type="checkbox" className="toggle" onChange={handleThemeToggle} checked={theme === "dark"} />
                    </label>

                    {/* User Section */}
                    {user ? (
                        <>
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                                <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="User" className="w-full h-full object-cover" />
                            </div>

                            <button onClick={handleLogout} className="btn btn-outline rounded-xl">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline rounded-xl">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-primary rounded-xl text-white">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* MOBILE SECTION */}
                <div className="navbar-end lg:hidden ml-auto flex items-center gap-2">
                    {/* ✅ MOBILE USER IMAGE (dropdown এর পাশে) */}
                    {user && (
                        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary">
                            <img src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="User" className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Mobile Dropdown */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-44 p-2 shadow z-50">
                            {links}

                            {/* Theme Toggle */}
                            <label className="ml-3 mt-2">
                                <input type="checkbox" className="toggle" onChange={handleThemeToggle} checked={theme === "dark"} />
                            </label>

                            {user ? (
                                <li className="mt-2">
                                    <button onClick={handleLogout} className="btn btn-outline w-full rounded-xl">
                                        Log Out
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li className="mt-2">
                                        <Link to="/login" className="btn btn-outline w-full rounded-xl">
                                            Sign In
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/register" className="btn btn-primary w-full mt-2 rounded-xl text-white">
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
