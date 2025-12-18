import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch user profile
    const { data: profile = {}, isLoading: profileLoading } = useQuery({
        queryKey: ["user-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    // Fetch pending request
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

                // Auto update UI without reload
                queryClient.invalidateQueries(["pending-request", user?.email]);
                queryClient.invalidateQueries(["user-profile", user?.email]);
            }
        } catch (error) {
            console.log("Error submitting request:", error);
        }
    };

    if (profileLoading) return <Loading />;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
                {/* IMAGE SECTION */}
                <div className="flex justify-center md:block md:flex-shrink-0">
                    <img
                        src={profile?.photoURL}
                        alt="User"
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 
                           rounded-lg border object-cover"
                    />
                </div>

                {/* DETAILS SECTION */}
                <div className="flex flex-col justify-between flex-1">
                    <div className="space-y-2 sm:space-y-3 text-center md:text-left">
                        <h2 className="text-xl sm:text-2xl text-black font-bold">
                            <strong>Name:</strong> {profile?.displayName}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            <strong>Email:</strong> {profile?.email}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            <strong>Address:</strong> {profile?.address}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            <strong>Role:</strong> {profile?.role}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                            <strong>Status:</strong> {profile?.status}
                        </p>

                        {profile?.role === "chef" && (
                            <p className="text-sm sm:text-base text-black">
                                <strong>Chef Id:</strong> {profile?.chefId}
                            </p>
                        )}
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                        {profile?.role !== "admin" && !isFinal && (
                            <>
                                {profile?.role !== "chef" && (
                                    <button
                                        onClick={() => handleRequest("chef")}
                                        disabled={requestedType === "chef" && requestStatus === "pending"}
                                        className={`px-4 py-2 text-sm sm:text-base rounded transition duration-300 
                                    ${requestedType === "chef" && requestStatus === "pending" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-primary/80 hover:scale-105"}`}
                                    >
                                        {requestedType === "chef" && requestStatus === "pending" ? "Requested" : "Be a Chef"}
                                    </button>
                                )}

                                <button
                                    onClick={() => handleRequest("admin")}
                                    disabled={requestedType === "admin" && requestStatus === "pending"}
                                    className={`px-4 py-2 text-sm sm:text-base rounded transition duration-300 
                                ${requestedType === "admin" && requestStatus === "pending" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-secondary hover:bg-secondary/80 hover:scale-105"}`}
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
