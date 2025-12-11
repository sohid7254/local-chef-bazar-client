import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout.jsx/RootLayout";
import AboutUs from "../Pages/AboutUs/AboutUs";
import ContactUs from "../Pages/ContactUs/ContactUs";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "/aboutUs",
                element: <AboutUs/>
            },
            {
                path: "/contactUs",
                element: <ContactUs/>
            }
        ]

    }
])