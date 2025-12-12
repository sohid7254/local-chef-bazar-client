import React, { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [requestState, setRequestState] = useState(null);

    const { data: profile = {}, isLoading } = useQuery({
        queryKey: ["user-profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        },
    });

    // check if user already has a pending request
    useEffect(() => {
        const fetchRequest = async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/requests/${user.email}`);
                if (res.data?.requestStatus === "pending") {
                    setRequestState(res.data.requestType); // auto update state
                }
            }
        };
        fetchRequest();
    }, [user?.email, axiosSecure]);

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
                alert(`Your request to become a ${requestType} has been submitted successfully.`);
                setRequestState(requestType);
            }
        } catch (error) {
            console.log("Error submitting request:", error);
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 flex gap-8">
            {/* Left side: big image */}
            <div className="flex-shrink-0">
                <img src={profile?.photoURL} alt="User" className="w-48 h-48 rounded-lg border object-cover" />
            </div>

            {/* Right side: details + buttons */}
            <div className="flex flex-col justify-between flex-1">
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

                
                <div className="mt-6 flex gap-4">
                    {/* If user is admin → no buttons */}
                    {profile?.role !== "admin" && (
                        <>
                            {/* Chef button visible only if not already chef */}
                            {profile?.role !== "chef" && (
                                <button
                                    onClick={() => handleRequest("chef")}
                                    disabled={requestState === "admin" || requestState === "chef"}
                                    className={`px-4 py-2 rounded transition duration-300 
                    ${requestState === "chef" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-primary text-white hover:bg-primary/80 hover:scale-105"}`}
                                >
                                    {requestState === "chef" ? "Requested" : "Be a Chef"}
                                </button>
                            )}

                            {/* Admin button visible if not admin */}
                            <button
                                onClick={() => handleRequest("admin")}
                                disabled={requestState === "chef" || requestState === "admin"}
                                className={`px-4 py-2 rounded transition duration-300 
                  ${requestState === "admin" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-secondary text-black hover:bg-secondary/80 hover:scale-105"}`}
                            >
                                {requestState === "admin" ? "Requested" : "Be an Admin"}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
