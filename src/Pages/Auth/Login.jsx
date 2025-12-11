import React from "react";
import login from "../../assets/About/Service5.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

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
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">
            {/* LEFT SIDE IMAGE */}
            <div className="hidden md:block">
                <img src={login} alt="login background" className="w-full h-full object-cover" />
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="flex items-center justify-center p-8 ">
                <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

                    <form className="space-y-5" onSubmit={handleSubmit(handleLogin)}>
                        {/* Email */}
                        <div>
                            <label className="text-sm font-bold text-gray-600 dark:text-gray-200">Email:</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Enter email"
                                className="w-full mt-1 px-4 py-3 border rounded-lg 
                 focus:ring-2 focus:ring-primary outline-none
                 text-gray-800 dark:text-gray-100 
                 bg-white dark:bg-gray-800 
                 placeholder-gray-400 dark:placeholder-gray-500"
                            />
                            {errors.email?.type === "required" && <p className="text-red-500">Email is a must nedded for LogIn</p>}
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
                                className="w-full mt-1 px-4 py-3 border rounded-lg 
                 focus:ring-2 focus:ring-primary outline-none
                 text-gray-800 dark:text-gray-100 
                 bg-white dark:bg-gray-800 
                 placeholder-gray-400 dark:placeholder-gray-500"
                            />
                            {errors.password?.type === "required" && <p className="text-red-500">You must input a valid passord</p>}
                            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Login Button */}
                        <Link
                            type="submit"
                            className="btn w-full py-3 bg-primary text-white font-bold cursor-pointer rounded-lg 
               hover:bg-thi transition"
                        >
                            Login
                        </Link>
                    </form>
                    {/* Register Button */}
                    <div className="flex items-center my-6">
                        <hr className="grow border-gray-300" />
                        <span className="px-2 text-gray-500 text-sm">Or</span>
                        <hr className="grow border-gray-300" />
                    </div>
                    <Link
                        to="/register"
                        type="button"
                        className="
                    btn w-full py-3  font-semibold cursor-pointer rounded-lg
                     transition"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
