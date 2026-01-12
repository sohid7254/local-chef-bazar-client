import React from "react";
import { FaGoogle } from "react-icons/fa";


import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const userInfo = {
                    email: result.user?.email,
                    displayName: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    role: "user", // Default role
                    status: "active", // Default status
                };

                // Check or Create User in Backend
                axiosSecure.post("/users", userInfo).then((res) => {
                    Swal.fire({
                        icon: "success",
                        title: "Login Successful",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/");
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message,
                });
            });
    };

    return (
        <div className="w-full">
            <button onClick={handleGoogleSignIn} type="button" className="btn w-full btn-outline flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FaGoogle className="text-red-500 text-lg" />
                Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;
