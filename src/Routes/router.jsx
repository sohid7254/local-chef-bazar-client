import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";

import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";
import LoginPage from "../Pages/Auth/Login";
import Registeration from "../Pages/Auth/Registeration";
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
import MyReview from "../Pages/DashBoard/User/MyReview";
import FavMeal from "../Pages/DashBoard/User/FavMeal";
import AdminRoute from "./AdminRoute";
import ChefRoute from "./ChefRoute";
import OrderMeal from "../Components/Order/OrderMeal";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyOrders from "../Pages/DashBoard/User/MyOrders";
import OrderRequests from "../Pages/DashBoard/Chef/OrderRequests";




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
                path: "/meals",
                Component: AllMeals,
                errorElement: <Error500 />,
            },
            {
                path: "/mealDetails/:id",
                element: (
                    <PrivateRoute>
                        <MealDetails />
                    </PrivateRoute>
                ),
                errorElement: <Error500 />,
            },
            {
                path: "/order/:id",
                element: (
                    <PrivateRoute>
                        <OrderMeal />
                    </PrivateRoute>
                ),
                errorElement: <Error500 />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "myProfile",
                element: <MyProfile />,
                errorElement: <Error500 />,
            },
            // admin route
            {
                path: "manageRequests",
                element: (
                    <AdminRoute>
                        <ManageRequests />
                    </AdminRoute>
                ),
                errorElement: <Error500 />,
            },
            {
                path: "manageUsers",
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                ),
                errorElement: <Error500 />,
            },
            // chef route
            {
                path: "createMeal",
                element: (
                    <ChefRoute>
                        <CreateMeals />
                    </ChefRoute>
                ),
                errorElement: <Error500 />,
            },
            {
                path: "orderRequests",
                element: (
                    <ChefRoute>
                        <OrderRequests />
                    </ChefRoute>
                ),
            },
            {
                path: "myMeals",
                element: (
                    <ChefRoute>
                        <MyMeals />
                    </ChefRoute>
                ),
                errorElement: <Error500 />,
            },
            // user route
            {
                path: "myReview",
                element: <MyReview />,
                errorElement: <Error500 />,
            },
            {
                path: "favouriteMeal",
                element: <FavMeal />,
                errorElement: <Error500 />,
            },
            {
                path: "myOrders",
                element: <MyOrders />,
                errorElement: <Error500 />,
            },
        ],
    },
    {
        path: "*",
        Component: Error404,
    },
]);