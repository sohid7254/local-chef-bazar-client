import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "../../../Components/Shared/AppLoading";

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],isLoading, } = useQuery({
        queryKey: ["myOrders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/by-user/${user?.email}`);
            return res.data;
        },
    });
    const handlePayment = async (order) => {
        const res = await axiosSecure.post("/order-payment-checkout", {
            price : order.price,
            quantity: order.quantity,
            mealName: order.mealName,
            orderId: order._id,
            userEmail: order.userEmail,
        })
        console.log("Stripe URL:", res.data.url);
        window.location.href = res.data.url
    }
    if (isLoading) return <AppLoading />;
    return (
        <div>
            <h1 className="text-3xl my-5 ml-5 font-bold">My Orders: {orders.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Food Name</th>
                            <th>Order Status</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Delivery Time</th>
                            <th>Chef Name</th>
                            <th>Chef Id</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            const showPayButton = order.orderStatus === "accepted" && order.paymentStatus === "pending";
                            return (
                                <tr key={order._id}>
                                    <th>{index + 1}</th>
                                    <td>{order.mealName}</td>
                                    <td>
                                        <span className="badge bg-green-100 text-black">{order.orderStatus}</span>
                                    </td>
                                    <td>{order.price}</td>
                                    <td>{order.quantity}</td>
                                    <td>{new Date(order.orderTime).toDateString()}</td>
                                    <td>{order.chefName}</td>
                                    <td>{order.chefId}</td>
                                    <td>
                                        <span className="badge bg-orange-500 text-black">{order.paymentStatus}</span>
                                    </td>
                                    <td>
                                        {showPayButton && (
                                            <button className="btn btn-sm bg-amber-300 text-black" onClick={() => handlePayment(order)}>
                                                Pay
                                            </button>
                                        )}
                                        {order.paymentStatus === "paid" && <button className="badge bg-green-400 text-black">Paid</button>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
