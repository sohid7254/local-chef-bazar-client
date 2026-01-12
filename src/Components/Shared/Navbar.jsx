import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/Logo1.png";
import useAuth from "../../Hooks/useAuth";

const NavBar = () => {
    const { user, logOut } = useAuth();

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeToggle = (e) => {
        setTheme(e.target.checked ? "dark" : "light");
    };

    const handleLogout = () => {
        logOut().catch((error) => console.error("Logout Error:", error));
    };

    const links = (
        <>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/meals" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    All Meals
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
            <li>
                <NavLink to="/blogs" className={({ isActive }) => (isActive ? "underline px-2 py-1 text-primary font-semibold" : "px-2 py-1 font-semibold")}>
                    Blogs
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
            <div className="navbar max-w-7xl mx-auto px-3">
                {/* LEFT */}
                <div className="navbar-start flex items-center gap-2">
                    <Link to={"/"}>
                        <img src={logo} alt="logo" className="w-20 h-8 sm:w-24 sm:h-10" />
                    </Link>
                </div>

                {/* CENTER (Desktop Only) */}
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal gap-4">{links}</ul>
                </div>

                {/* RIGHT (Desktop Only) */}
                <div className="navbar-end hidden md:flex items-center gap-3">
                    <label className="swap swap-rotate">
                        <input type="checkbox" onChange={handleThemeToggle} checked={theme === "dark"} />
                        {/* Sun icon */}
                        <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H5A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,5.64,4.93,1,1,0,0,0,4.93,5.64Zm12.37,9.9a1,1,0,0,0,0,1.41l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,18,16.95ZM12,21a1,1,0,0,0,1-1V19a1,1,0,0,0-2,0v1A1,1,0,0,0,12,21Zm7-9a1,1,0,0,0,1-1H21a1,1,0,0,0,0,2h1A1,1,0,0,0,19,12Zm-2.05-4.95a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.41l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        {/* Moon icon */}
                        <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
                        </svg>
                    </label>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt={user?.displayName} title={user?.displayName} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <div className="flex flex-col items-start gap-1 p-2 mb-2 bg-base-200 rounded-lg pointer-events-none">
                                        <span className="font-bold text-primary">{user?.displayName}</span>
                                        <span className="text-xs text-gray-500">{user?.email}</span>
                                    </div>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myProfile" className="justify-between">
                                        My Profile
                                        <span className="badge badge-primary">New</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="text-error font-semibold">
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-sm md:btn-md btn-outline rounded-xl">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn btn-sm md:btn-md btn-primary rounded-xl text-white">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* MOBILE SECTION */}
                <div className="navbar-end flex md:hidden items-center gap-2 ml-auto">
                    {/* Mobile User Image */}
                    {user && (
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                            <img src={user?.photoURL} alt="User" className="w-full h-full object-cover" title={user?.displayName} />
                        </div>
                    )}

                    {/* Mobile Dropdown */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-sm min-h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </label>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg z-50">
                            {links}

                            <label className="ml-3 mt-2 flex items-center gap-2">
                                <input type="checkbox" className="toggle toggle-sm" onChange={handleThemeToggle} checked={theme === "dark"} />
                            </label>

                            {user ? (
                                <li className="mt-2">
                                    <button onClick={handleLogout} className="btn btn-sm btn-outline w-full rounded-xl">
                                        Log Out
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li className="mt-2">
                                        <Link to="/login" className="btn btn-sm btn-outline w-full rounded-xl">
                                            Sign In
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="btn btn-sm btn-primary w-full mt-2 rounded-xl text-white">
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
