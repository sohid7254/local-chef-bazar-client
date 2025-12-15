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
import MyMeals from "../Pages/DashBoard/Chef/MyMeals";
import Error404 from "../Components/Shared/Error404";
import Error500 from "../Components/Shared/Error500";
import PrivateRoute from "./PrivateRoute";
import MealDetails from "../Pages/MealDetails/MealDetails";
import AllMeals from "../Pages/AllMeals/AllMeals";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
                errorElement: <Error500 />,
            },
            {
                path: "aboutUs",
                element: <AboutUs />,
                errorElement: <Error500 />,
            },
            {
                path: "contactUs",
                element: <ContactUs />,
                errorElement: <Error500 />,
            },
            {
                path: "login",
                element: <LoginPage />,
                errorElement: <Error500 />,
            },
            {
                path: "register",
                element: <Registeration />,
                errorElement: <Error500 />,
            },
            {
                path:"/meals",
                Component: AllMeals,
                errorElement: <Error500/>
            },
            {
                path: "/mealDetails/:id",
                element: <PrivateRoute>
                    <MealDetails/>
                </PrivateRoute>,
                errorElement: <Error500/>
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
                errorElement: <Error500 />,
            },
            {
                path: "manageRequests",
                element: <ManageRequests />,
                errorElement: <Error500 />,
            },
            {
                path: "manageUsers",
                element: <ManageUsers />,
                errorElement: <Error500 />,
            },
            {
                path: "createMeal",
                element: <CreateMeals />,
                errorElement: <Error500 />,
            },
            {
                path: "myMeals",
                element: <MyMeals />,
                errorElement: <Error500 />,
            },
        ],
    },
    {
        path: "*",
        Component: Error404,
    },
]);