import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading";
import { Helmet } from "react-helmet";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    
    const {
        data: profile = {},
        isLoading: profileLoading,
        refetch,
    } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    const { data: pendingRequest = [] } = useQuery({
        queryKey: ["pending-request", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${user.email}`);
            return res.data;
        },
    });

    const request = pendingRequest?.[0];
    const requestedType = request?.requestType;
    const requestStatus = request?.requestStatus;
    const isFinal = requestStatus === "approved" || requestStatus === "rejected";

    const handleEditClick = () => {
        setFormData({
            displayName: profile?.displayName || "",
            photoURL: profile?.photoURL || "",
            address: profile?.address || "",
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateProfile = async () => {
        try {
            const res = await axiosSecure.patch(`/users/${profile?.email}`, formData);
            if (res.data.success) {
                Swal.fire("Updated!", "Your profile has been updated", "success");
                setIsEditing(false);
                await refetch(); 
            } else {
                Swal.fire("Oops!", res.data.message, "info");
            }
        } catch (error) {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    const handleRequest = async (requestType) => {
        const requestData = {
            _id: profile?._id,
            userName: profile?.displayName,
            userEmail: profile?.email,
            requestType,
        };

        try {
            const res = await axiosSecure.post("/requests", requestData);
            if (res.data.insertedId) {
        
                Swal.fire({
                    icon: "success",
                    title: "Request Submitted",
                    text: `Your request to become a ${requestType} has been submitted.`,
                    timer: 3000,
                    showConfirmButton: false,
                });
                queryClient.invalidateQueries(["pending-request", user?.email]);
                queryClient.invalidateQueries(["user-profile", user?.email]);
            }
        } catch (error) {
            console.log("Error submitting request:", error);
            Swal.fire("Error", "Failed to submit request", "error"); 
        }
    };

    if (profileLoading) return <Loading />;

    return (
        <div className="max-w-4xl w-full mx-auto mt-10 px-4 sm:px-6 md:px-8 pb-10">
            <Helmet>
                <title>My Profile</title>
            </Helmet>

            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
                <div className="bg-[var(--color-primary)] h-32 w-full relative">
                    <div className="absolute -bottom-16 left-8 sm:left-10">
                        <img src={isEditing ? formData.photoURL : profile?.photoURL} alt="User" className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 bg-gray-200" onError={(e) => (e.target.src = "https://i.ibb.co/5GzXkwq/user.png")} />
                    </div>
                    {/* EDIT TOGGLE BUTTON */}
                    <div className="absolute top-4 right-4">
                        {!isEditing ? (
                            <button onClick={handleEditClick} className="btn btn-sm btn-circle bg-white text-[var(--color-primary)] hover:bg-gray-100 border-none shadow-md" title="Edit Profile">
                                <FaEdit />
                            </button>
                        ) : (
                            <button onClick={handleCancel} className="btn btn-sm btn-circle bg-red-500 text-white hover:bg-red-600 border-none shadow-md" title="Cancel Edit">
                                <FaTimes />
                            </button>
                        )}
                    </div>
                </div>

                <div className="pt-20 px-8 pb-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* FORM / DETAILS */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                                    {isEditing ? <input type="text" name="displayName" value={formData.displayName} onChange={handleInputChange} className="input input-bordered w-full max-w-xs font-bold text-xl" placeholder="Display Name" /> : profile?.displayName}
                                </h1>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">{profile?.email}</p>
                                <span className={`badge ${profile?.role === "admin" ? "badge-primary" : "badge-secondary"} mt-2`}>{profile?.role ? profile?.role.toUpperCase() : "USER"}</span>
                            </div>

                            <div className="divider"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Address</span>
                                    </label>
                                    {isEditing ? (
                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="input input-bordered w-full" placeholder="Enter your address" />
                                    ) : (
                                        <p className="text-gray-700 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 min-h-[3rem]">{profile?.address || "No address provided"}</p>
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Photo URL</span>
                                        </label>
                                        <input type="text" name="photoURL" value={formData.photoURL} onChange={handleInputChange} className="input input-bordered w-full" placeholder="Image link" />
                                    </div>
                                )}

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Membership Status</span>
                                    </label>
                                    <p className="text-gray-700 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">{profile?.status || "Bronze"}</p>
                                </div>

                                {profile?.role === "chef" && (
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold">Chef ID</span>
                                        </label>
                                        <p className="text-gray-700 dark:text-gray-300 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">{profile?.chefId}</p>
                                    </div>
                                )}
                            </div>

                            {/* EDIT ACTION BUTTONS */}
                            {isEditing && (
                                <div className="flex gap-4 mt-6">
                                    <button onClick={handleUpdateProfile} className="btn btn-primary text-white gap-2">
                                        <FaSave /> Save Changes
                                    </button>
                                    <button onClick={handleCancel} className="btn btn-ghost gap-2">
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ROLE REQUEST BUTTONS (Only view mode) */}
                    {!isEditing && profile?.role !== "admin" && !isFinal && (
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {profile?.role !== "chef" && (
                                    <button
                                        onClick={() => handleRequest("chef")}
                                        disabled={requestedType === "chef" && requestStatus === "pending"}
                                        className={`btn gap-2
                                            ${requestedType === "chef" && requestStatus === "pending" ? "btn-disabled" : "btn-outline btn-primary"}`}
                                    >
                                        {requestedType === "chef" && requestStatus === "pending" ? "Chef Request Pending" : "Request to be Chef"}
                                    </button>
                                )}

                                <button
                                    onClick={() => handleRequest("admin")}
                                    disabled={requestedType === "admin" && requestStatus === "pending"}
                                    className={`btn gap-2
                                            ${requestedType === "admin" && requestStatus === "pending" ? "btn-disabled" : "btn-outline btn-secondary"}`}
                                >
                                    {requestedType === "admin" && requestStatus === "pending" ? "Admin Request Pending" : "Request to be Admin"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
