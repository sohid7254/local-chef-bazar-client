import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Shared/Loading';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    // const queryClient = useQueryClient();
    // get all requests fron backend 

    const {data: requests = [], isLoading} = useQuery({
        queryKey: ["all-requests"],
        queryFn: async () => {
            const res = await axiosSecure.get('/requests')
            return res.data
        }
    })

    const handleApprove = (req) => {
        console.log(req)
    }

    const handleReject = (req) => {
        console.log(req)
    }

    if(isLoading) return <Loading/>


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Request Type</th>
                            <th>Status</th>
                            <th>Request Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((req) => (
                            <tr key={req._id}>
                                <td>{req.userName}</td>
                                <td>{req.userEmail}</td>
                                <td className="capitalize">{req.requestType}</td>
                                <td className="capitalize">{req.requestStatus}</td>
                                <td>{new Date(req.requestTime).toLocaleString()}</td>

                                <td className="flex gap-2">
                                    {/* Accept Button */}
                                    <button onClick={() => handleApprove(req)} disabled={req.requestStatus !== "pending"} className={`px-3 py-1 rounded text-white ${req.requestStatus !== "pending" ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}>
                                        Accept
                                    </button>

                                    {/* Reject Button */}
                                    <button onClick={() => handleReject(req)} disabled={req.requestStatus !== "pending"} className={`px-3 py-1 rounded text-white ${req.requestStatus !== "pending" ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}>
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;