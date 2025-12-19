import React from "react";
import login from "../../assets/About/Service5.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        console.log(handleLogin, "clicked");
        signInUser(data.email, data.password)
            .then((res) => {
                console.log(res.user);
                navigate(location?.state || "/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2" data-aos="fade-in">
            <Helmet>
                <title>Log In</title>
            </Helmet>
            <div className="hidden md:block" data-aos="fade-right">
                <img src={login} alt="login background" className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 ">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-7 md:p-8" data-aos="zoom-in">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-5 sm:mb-6 text-center">Login</h2>

                    <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit(handleLogin)}>
                        <div>
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-200">Email:</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Enter email"
                                className="w-full mt-1 px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg 
                 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base
                 text-gray-800 dark:text-gray-100 
                 bg-white dark:bg-gray-800 
                 placeholder-gray-400 dark:placeholder-gray-500 min-h-11"
                            />
                            {errors.email?.type === "required" && <p className="text-red-500 text-xs sm:text-sm mt-1">Email is a must nedded for LogIn</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-200">Password:</label>
                            <input
                                {...register("password", {
                                    required: true,
                                    minLength: 8,
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                        message: "Password includes 8 characters,uppercase,lowercase,and a special symbol",
                                    },
                                })}
                                type="password"
                                placeholder="Enter password"
                                className="w-full mt-1 px-3 py-2.5 sm:px-4 sm:py-3 border rounded-lg 
                 focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base
                 text-gray-800 dark:text-gray-100 
                 bg-white dark:bg-gray-800 
                 placeholder-gray-400 dark:placeholder-gray-500 min-h-11"
                            />
                            {errors.password?.type === "required" && <p className="text-red-500 text-xs sm:text-sm mt-1">You must input a valid passord</p>}
                            {errors.password && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="btn w-full py-2.5 sm:py-3 bg-primary text-white font-bold cursor-pointer rounded-lg 
               hover:bg-thi transition text-sm sm:text-base min-h-11"
                        >
                            Login
                        </button>
                    </form>

                    <div className="flex items-center my-5 sm:my-6">
                        <hr className="grow border-gray-300" />
                        <span className="px-2 text-gray-500 text-xs sm:text-sm">Or</span>
                        <hr className="grow border-gray-300" />
                    </div>
                    <Link
                        to="/register"
                        type="button"
                        className="
                    btn w-full py-2.5 sm:py-3 font-semibold cursor-pointer rounded-lg
                     transition text-sm sm:text-base min-h-11"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
