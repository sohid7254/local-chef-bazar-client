import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/Logo1.png";
import useAuth from "../../Hooks/useAuth";

const NavBar = () => {
    const { user, logOut } = useAuth();
    // ✅ Theme state
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // ✅ Apply theme to HTML tag
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // ✅ Toggle handler
    const handleThemeToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    const handleLogout = () => {
        logOut()
            .then((res) => {
                console.log("Logged out successfully", res);
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : " px-2 py-1 font-semibold")}>
                    Home
                </NavLink>
            </li>

            <li>
                <NavLink to="/contactUs" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : " px-2 py-1 font-semibold")}>
                    Contact Us
                </NavLink>
            </li>

            <li>
                <NavLink to="/aboutUs" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : " px-2 py-1 font-semibold")}>
                    About Us
                </NavLink>
            </li>
            

            {user && (
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : " px-2 py-1 font-semibold")}>
                        Dashboard
                    </NavLink>
                </li>
            )}
        </>
    );

    return (
        <div className="bg-secondary shadow-sm sticky top-0 z-50">
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* ✅ LEFT */}
                <div className="navbar-start flex items-center gap-2">
                    <img src={logo} alt="logo" className="w-24 h-10" />

                    <Link to="/" className="hidden sm:block ml-2 text-2xl font-bold text-primary">
                        LocalChefBazaar
                    </Link>
                </div>

                {/* ✅ CENTER (Desktop only) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-4">{links}</ul>
                </div>

                {/* ✅ RIGHT SECTION */}
                <div className="navbar-end gap-3 hidden sm:flex">
                    {/* ✅ If user exists → show profile image + logout */}
                    {user ? (
                        <>
                            {/* ✅ User Image */}
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                                <img src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} alt="User" className="w-full h-full object-cover" />
                            </div>

                            <button onClick={handleLogout} className="btn btn-outline rounded-xl">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <label className="  ml-4">
                                <input type="checkbox" className="toggle" onChange={handleThemeToggle} checked={theme === "dark"} />
                            </label>
                            <Link to="/login" className="btn btn-outline rounded-xl">
                                Sign In
                            </Link>

                            <Link to="/register" className="btn btn-primary rounded-xl ">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* ✅ MOBILE DROPDOWN */}
                <div className="navbar-end lg:hidden ml-auto">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-40 p-2 shadow z-50">
                            {links}
                            <label className="  ml-4">
                                <input type="checkbox" className="toggle" onChange={handleThemeToggle} checked={theme === "dark"} />
                            </label>

                            {user ? (
                                <>
                                    <li className="mt-2">
                                        <button onClick={handleLogout} className="btn btn-outline w-full rounded-xl">
                                            Log Out
                                        </button>
                                    </li>
                                </>
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
