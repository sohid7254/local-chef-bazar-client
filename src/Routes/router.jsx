import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";

import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import LoginPage from "../Pages/Auth/Login";
import Registeration from "../Pages/Auth/Registeration";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";

import RootLayout from "../Layouts/RootLayout/RootLayout";
import MyProfile from "../Pages/DashBoard/MyProfile";
import ManageRequests from "../Pages/DashBoard/Admin/ManageRequests";
import ManageUsers from "../Pages/DashBoard/Admin/ManageUsers";
import CreateMeals from "../Pages/DashBoard/Chef/CreateMeals";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "aboutUs",
                element: <AboutUs />,
            },
            {
                path: "contactUs",
                element: <ContactUs />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <Registeration />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "myProfile",
                element: <MyProfile />,
            },
            {
                path: "manageRequests",
                element: <ManageRequests />,
            },
            {
                path: "manageUsers",
                element: <ManageUsers />,
            },
            {
                path: "createMeal",
                element: <CreateMeals />,
            },
        ],
    },
]);