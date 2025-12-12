import React, { useState } from "react";
import login from "../../assets/About/Service5.jpg";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";

const Registeration = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [preview, setPreview] = useState(null);
    const { registerUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const password = watch("password");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    // -------------------------------
    //      SIGN UP FUNCTION
    // -------------------------------
    const handleSignUp = async (data) => {
        try {
            const profileImage = data.image[0];

            // 1️⃣ Register User
            await registerUser(data.email, data.password);

            // 2️⃣ Upload image to ImgBB
            const formData = new FormData();
            formData.append("image", profileImage);

            const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;

            // 3️⃣ Save user to your database
            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL,
                address: data.address,
            };

            const savedUser = await axiosSecure.post("/users", userInfo);

            if (savedUser.data.insertedId) {
                alert("User registered successfully");
            }

            // 4️⃣ Update Firebase Profile
            const userProfile = {
                displayName: data.name,
                photoURL,
            };

            await updateUserProfile(userProfile);

            // 5️⃣ Redirect user
            navigate(location?.state || "/");
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-secondary dark:bg-gray-900">
            {/* LEFT SIDE IMAGE */}
            <div className="hidden md:block">
                <img src={login} alt="register background" className="w-full h-full object-cover" />
            </div>

            {/* RIGHT FORM */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Register</h2>

                    <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
                            <input type="text" {...register("name", { required: true, minLength: 3 })} placeholder="Enter your name" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary" />
                            {errors.name && <p className="text-red-400">Name is required</p>}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Address</label>
                            <input type="text" {...register("address", { required: true })} placeholder="Enter your address" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary" />
                            {errors.address && <p className="text-red-400">Address is required</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Upload Your Image</label>
                            <input type="file" accept="image/*" {...register("image", { required: true })} onChange={handleImageChange} className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary" />
                            {errors.image && <p className="text-red-400">Image is required</p>}

                            {preview && <img src={preview} alt="preview" className="w-24 h-24 rounded-full mt-3 object-cover border" />}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
                            <input type="email" {...register("email", { required: true })} placeholder="Enter your email" className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary" />
                            {errors.email && <p className="text-red-400">Email is required</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 8,
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                                        message: "Must include uppercase, lowercase & special character",
                                    },
                                })}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                            />
                            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Confirm Password</label>
                            <input
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Confirm password is required",
                                    validate: (value) => value === password || "Passwords do not match",
                                })}
                                placeholder="Confirm your password"
                                className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                            />
                            {errors.confirmPassword && <p className="text-red-400">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Register Btn */}
                        <button type="submit" className="w-full bg-primary py-2 rounded-md font-semibold text-white hover:bg-primary-hover transition">
                            Register
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <hr className="grow border-gray-300 dark:border-gray-600" />
                        <span className="px-2 text-gray-500 dark:text-gray-300 text-sm">Or</span>
                        <hr className="grow border-gray-300 dark:border-gray-600" />
                    </div>

                    {/* Login Link */}
                    <Link to="/login" className="w-full block py-3 text-center border border-primary text-primary dark:text-white dark:bg-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition">
                        Login Instead
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Registeration;
