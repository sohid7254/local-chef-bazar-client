import React from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { Link, Outlet, useNavigate } from "react-router"; 
import logo from "../../assets/logo1.png";
import { FaUser } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
const DashboardLayout = () => {
    const {user, logOut } = useAuth()
    const {role} = useRole()

      const navigate = useNavigate(); 

      const handleLogout = () => {
          logOut()
              .then(() => {
                  alert("Logged out successfully");
                  console.log("Logged out successfully");
                  navigate("/"); 
              })
              .catch((error) => console.error("Logout Error:", error));
      };
    return (
        <div className="drawer lg:drawer-open max-w-7xl mx-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300 shahdow-md flex justify-between px-4">
                    <div className="flex items-center justify-center">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <GoSidebarCollapse />
                        </label>
                        <div className="px-4">Local Chef Bazar</div>
                    </div>

                    <div className="relative flex items-center gap-3 pr-5">
                        <img src={user?.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-gray-300" />
                        <div className="text-left">
                            <p className="font-semibold">{user?.displayName}</p>
                            <p className="text-sm text-gray-500">{role}</p>
                        </div>
                    </div>
                </nav>

                {/* Page content here */}
                <Outlet />
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-40">
                    {/* Sidebar content here */}
                    <ul className="menu">
                        <li>
                            <img src={logo} alt="logo" className="w-24 h-10 mx-auto mb-4 is-drawer-close:hidden" />
                        </li>
                        <li>
                            <Link to={"/"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-20" data-tip="Homepage">
                                <IoHomeOutline className="text-xl" />
                                <span className="is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/"} className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-2" data-tip="Homepage">
                                <FaUser className="text-xl" />
                                <span className="is-drawer-close:hidden">My Profile</span>
                            </Link>
                        </li>

                        <li>
                            <Link onClick={handleLogout} className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-10" data-tip="LogOut">
                                <TbLogout2 className="text-xl" />
                                <span className="is-drawer-close:hidden">LogOut</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
