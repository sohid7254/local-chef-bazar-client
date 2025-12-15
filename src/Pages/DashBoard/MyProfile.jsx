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
    const { data: pendingRequest = {} } = useQuery({
        queryKey: ["pending-request", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${user.email}`);
            return res.data;
        },
    });

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
            }
        } catch (error) {
            console.log("Error submitting request:", error);
        }
    };

    if (profileLoading) return <Loading />;

    const requestedType = pendingRequest?.requestType;
    

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 flex gap-8">
            {/* Left side: big image */}
            <div className="shrink-0">
                <img src={profile?.photoURL} alt="User" className="w-48 h-48 rounded-lg border object-cover" />
            </div>

            {/* Right side */}
            <div className="flex flex-col justify-between flex-1">
                {/* User details */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                        <strong>Name:</strong> {profile?.displayName}
                    </h2>
                    <p className="text-gray-600">
                        <strong>Email:</strong> {profile?.email}
                    </p>
                    <p>
                        <strong>Address:</strong> {profile?.address || "Not provided"}
                    </p>
                    <p>
                        <strong>Role:</strong> {profile?.role}
                    </p>
                    <p>
                        <strong>Status:</strong> {profile?.status}
                    </p>

                    {profile?.role === "chef" && (
                        <p>
                            <strong>Chef Id:</strong> {profile?.chefId || "N/A"}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-4">
                    {/* If admin → no buttons */}
                    {profile?.role !== "admin" && (
                        <>
                            {/* Chef Button */}
                            {profile?.role !== "chef" && (
                                <button
                                    onClick={() => handleRequest("chef")}
                                    disabled={requestedType && requestedType !== "chef"}
                                    className={`px-4 py-2 rounded transition duration-300 
                    ${requestedType === "chef" ? "bg-gray-400 text-white cursor-not-allowed" : requestedType === "admin" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/80 hover:scale-105"}`}
                                >
                                    {requestedType === "chef" ? "Requested" : "Be a Chef"}
                                </button>
                            )}

                            {/* Admin Button */}
                            <button
                                onClick={() => handleRequest("admin")}
                                disabled={requestedType && requestedType !== "admin"}
                                className={`px-4 py-2 rounded transition duration-300 
                  ${requestedType === "admin" ? "bg-gray-400 text-white cursor-not-allowed" : requestedType === "chef" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-secondary text-black hover:bg-secondary/80 hover:scale-105"}`}
                            >
                                {requestedType === "admin" ? "Requested" : "Be an Admin"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
