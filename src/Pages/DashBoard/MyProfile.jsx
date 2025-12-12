import React from 'react';

import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading';

const MyProfile = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()

    const {data: profile = {}, isLoading} = useQuery({
        queryKey: ["user-profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data
        }
    })

    const handleRequest = async (requestType) => {
        const requestData = {
            _id: profile?._id,
            userName: profile?.displayName,
            userEmail: profile?.email,
            requestType,

        }

        try{
            const res = await axiosSecure.post("/requests", requestData);
            if(res.data.insertedId){
                alert(`Your request to become a ${requestType} has been submitted successfully.`);
            }
        } catch(error){
            console.log("Error submitting request:", error);
        }
    }
    
    if(isLoading) return <Loading/>

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
            {/* User Info */}
            <div className="flex items-center gap-4">
                <img src={profile?.photoURL} alt="User" className="w-20 h-20 rounded-full border" />
                <div>
                    <h2 className="text-xl font-bold">{profile?.displayName}</h2>
                    <p className="text-gray-600">{profile?.email}</p>
                </div>
            </div>

            <div className="mt-4 space-y-2">
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

            {/* Conditional Buttons */}
            <div className="mt-6 flex gap-4">
                {profile?.role !== "chef" && profile?.role !== "admin" && (
                    <button onClick={() => handleRequest("chef")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Be a Chef
                    </button>
                )}
                {profile?.role !== "admin" && (
                    <button onClick={() => handleRequest("admin")} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Be an Admin
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;