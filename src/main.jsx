import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Routes/router";
import { RouterProvider } from "react-router";
import AuthProvider from "./Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LenisProvider from "./Hooks/LenisProviders";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <LenisProvider>
                 <RouterProvider router={router} />   
                </LenisProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);
