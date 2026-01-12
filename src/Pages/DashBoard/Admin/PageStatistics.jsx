import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { FaWallet, FaUsers, FaClipboardList, FaCheckCircle, FaChartPie, FaChartBar } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import AppLoading from "../../../Components/Shared/AppLoading";
import { Helmet } from "react-helmet";

const PageStatistics = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all stats together
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["platform-stats"],
        queryFn: async () => {
            try {
                const [payments, users, pending, delivered] = await Promise.all([axiosSecure.get("/admin/stats/totalPayments"), axiosSecure.get("/admin/stats/totalUsers"), axiosSecure.get("/admin/stats/ordersPending"), axiosSecure.get("/admin/stats/orderDelivered")]);

                return {
                    totalPayments: payments.data.totalPayments,
                    totalUsers: users.data.totalUsers,
                    pendingOrders: pending.data.pendingOrders,
                    deliveredOrders: delivered.data.deliveredOrders,
                };
            } catch (error) {
                console.log("Failed to fatch apis", error);
                return {};
            }
        },
    });

    if (isLoading) return <AppLoading />;

    // Pie chart data
    const pieData = [
        { name: "Pending", value: stats.pendingOrders },
        { name: "Delivered", value: stats.deliveredOrders },
    ];

    const COLORS = ["#FFBB28", "#00C49F"];

    // Bar chart data
    const barData = [
        { name: "Payments", amount: stats.totalPayments },
        { name: "Users", amount: stats.totalUsers },
    ];

    return (
        <div className="p-6 md:p-10 space-y-10 min-h-screen bg-gray-50 dark:bg-gray-900">
            <Helmet>
                <title>Platform Statistics</title>
            </Helmet>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Overview of platform performance</p>
                </div>
            </div>

            {/* ---------- TOP CARDS ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Payments */}
                <div className="stat bg-white dark:bg-[#002923] shadow-lg rounded-2xl border-l-4 border-blue-500 p-6 transition-transform hover:scale-105">
                    <div className="stat-figure text-blue-500">
                        <FaWallet className="text-4xl opacity-80" />
                    </div>
                    <div className="stat-title text-gray-500 dark:text-gray-400 font-medium">Total Revenue</div>
                    <div className="stat-value text-blue-600 dark:text-blue-400 text-3xl font-bold">${stats.totalPayments}</div>
                    <div className="stat-desc text-gray-400 text-xs">Lifetime Earnings</div>
                </div>

                {/* Total Users */}
                <div className="stat bg-white dark:bg-[#002923] shadow-lg rounded-2xl border-l-4 border-green-500 p-6 transition-transform hover:scale-105">
                    <div className="stat-figure text-green-500">
                        <FaUsers className="text-4xl opacity-80" />
                    </div>
                    <div className="stat-title text-gray-500 dark:text-gray-400 font-medium">Total Users</div>
                    <div className="stat-value text-green-600 dark:text-green-400 text-3xl font-bold">{stats.totalUsers}</div>
                    <div className="stat-desc text-gray-400 text-xs">Registered Accounts</div>
                </div>

                {/* Pending Orders */}
                <div className="stat bg-white dark:bg-[#002923] shadow-lg rounded-2xl border-l-4 border-yellow-500 p-6 transition-transform hover:scale-105">
                    <div className="stat-figure text-yellow-500">
                        <FaClipboardList className="text-4xl opacity-80" />
                    </div>
                    <div className="stat-title text-gray-500 dark:text-gray-400 font-medium">Pending Orders</div>
                    <div className="stat-value text-yellow-600 dark:text-yellow-400 text-3xl font-bold">{stats.pendingOrders}</div>
                    <div className="stat-desc text-gray-400 text-xs">Action Required</div>
                </div>

                {/* Delivered Orders */}
                <div className="stat bg-white dark:bg-[#002923] shadow-lg rounded-2xl border-l-4 border-purple-500 p-6 transition-transform hover:scale-105">
                    <div className="stat-figure text-purple-500">
                        <FaCheckCircle className="text-4xl opacity-80" />
                    </div>
                    <div className="stat-title text-gray-500 dark:text-gray-400 font-medium">Delivered Orders</div>
                    <div className="stat-value text-purple-600 dark:text-purple-400 text-3xl font-bold">{stats.deliveredOrders}</div>
                    <div className="stat-desc text-gray-400 text-xs">Completed Successfully</div>
                </div>
            </div>

            {/* ---------- CHARTS SECTION ---------- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* PIE CHART */}
                <div className="bg-white dark:bg-[#002923] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-none flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-6 self-start">
                        <FaChartPie className="text-[var(--color-primary)] text-xl" />
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Order Status Distribution</h2>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={5} label>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }} />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* BAR CHART */}
                <div className="bg-white dark:bg-[#002923] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-none flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-6 self-start">
                        <FaChartBar className="text-[var(--color-primary)] text-xl" />
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Revenue vs Users Impact</h2>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#8884d8" }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8884d8" }} />
                            <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }} />
                            <Bar dataKey="amount" fill="#8884d8" radius={[10, 10, 0, 0]} barSize={50}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? "#4ade80" : "#8884d8"} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default PageStatistics;
