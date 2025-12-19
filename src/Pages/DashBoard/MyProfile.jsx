import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading";
import { Helmet } from "react-helmet";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: profile = {}, isLoading: profileLoading } = useQuery({
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
                alert(`Your request to become a ${requestType} has been submitted.`);
                queryClient.invalidateQueries(["pending-request", user?.email]);
                queryClient.invalidateQueries(["user-profile", user?.email]);
            }
        } catch (error) {
            console.log("Error submitting request:", error);
        }
    };

    if (profileLoading) return <Loading />;

    return (
        <div className="max-w-4xl w-full mx-auto mt-10 px-4 sm:px-6 md:px-8">
            <Helmet>
                <title>My Profile</title>
            </Helmet>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start">
                {/* IMAGE CONTAINER */}
                <div className="  ">
                    <img
                        src={profile?.photoURL}
                        alt="User"
                        className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 
                                   rounded-full object-cover border-4 border-primary"
                    />
                </div>

                {/* DETAILS CONTAINER */}
                <div className="bg-white shadow-lg rounded-lg p-6 flex-1 w-full md:w-2/3">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-black">
                            <strong>Name:</strong> {profile?.displayName}
                        </h2>
                        <p className="text-gray-600">
                            <strong>Email:</strong> {profile?.email}
                        </p>
                        <p className="text-gray-600">
                            <strong>Address:</strong> {profile?.address}
                        </p>
                        <p className="text-gray-600">
                            <strong>Role:</strong> {profile?.role}
                        </p>
                        <p className="text-gray-600">
                            <strong>Status:</strong> {profile?.status}
                        </p>

                        {profile?.role === "chef" && (
                            <p className="text-black">
                                <strong>Chef Id:</strong> {profile?.chefId}
                            </p>
                        )}
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        {profile?.role !== "admin" && !isFinal && (
                            <>
                                {profile?.role !== "chef" && (
                                    <button
                                        onClick={() => handleRequest("chef")}
                                        disabled={requestedType === "chef" && requestStatus === "pending"}
                                        className={`px-4 py-2 rounded transition duration-300 
                                            ${requestedType === "chef" && requestStatus === "pending" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-primary/80 hover:scale-105"}`}
                                    >
                                        {requestedType === "chef" && requestStatus === "pending" ? "Requested" : "Be a Chef"}
                                    </button>
                                )}

                                <button
                                    onClick={() => handleRequest("admin")}
                                    disabled={requestedType === "admin" && requestStatus === "pending"}
                                    className={`px-4 py-2 rounded transition duration-300 
                                        ${requestedType === "admin" && requestStatus === "pending" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-secondary text-black hover:bg-secondary/80 hover:scale-105"}`}
                                >
                                    {requestedType === "admin" && requestStatus === "pending" ? "Requested" : "Be an Admin"}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
