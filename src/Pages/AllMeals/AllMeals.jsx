import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "../../Components/Shared/AppLoading";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router";
import { FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const AllMeals = () => {
    const [sortPrice, setSortPrice] = useState("asc");
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1)
    const axiosSecure = useAxiosSecure();

    const limit = 10;

    const { data, isLoading } = useQuery({
        queryKey: ["all-meals",page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals?page=${page}&limit=10`);
            return res.data;
        },
    });
    const meals = data?.meals || [];
    const total = data?.total || 0;
    const totalPage = Math.ceil(total / limit);

    const filteredMeals = meals.filter((meal) => meal.foodName.toLowerCase().includes(searchText.toLowerCase()));
    const sortedMeals = [...filteredMeals].sort((a, b) => {
        return sortPrice === "asc" ? a.price - b.price : b.price - a.price;
    });
    if (isLoading) return <AppLoading />;
    return (
        <div className="max-w-7xl mx-auto my-10">
            <h1 className="text-3xl font-bold text-center my-6">All Meals are here!</h1>
            <div className="flex justify-between mb-10">
                <div className="flex items-center gap-2 w-200">
                    <h2 className="text-xl font-bold">Search Here:</h2>
                    <label className="input  outline-none">
                        <IoSearchOutline className="text-xl" />
                        <input type="text" className="input border-none focus:outline-none" value={searchText} placeholder="Search By Meal Name" onChange={(e) => setSearchText(e.target.value)} />
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">Sort Here:</h1>
                    <select className="select select-bordered w-40 border-none outline-none" value={sortPrice} onChange={(e) => setSortPrice(e.target.value)}>
                        <option value="asc">Price: Low → High</option>
                        <option value="desc">Price: High → Low</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {sortedMeals.map((meal) => (
                    <div key={meal._id} className="card bg-white shadow-md hover:shadow-xl transition">
                        <figure>
                            <img src={meal.foodImage} alt={meal.foodName} className="h-40 sm:h-44 md:h-48 w-full object-cover" />
                        </figure>

                        <div className="card-body p-4 text-black sm:p-5">
                            <h3 className="card-title  sm:text-lg">{meal.foodName}</h3>

                            <p className="text-xs sm:text-sm">
                                Chef: <span className="font-semibold">{meal.chefName}</span>
                            </p>

                            <p className="text-xs sm:text-sm ">
                                Chef ID: <span className="font-semibold">{meal.chefId}</span>
                            </p>

                            <p className="text-xs sm:text-sm ">
                                Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <span className="font-semibold  text-sm sm:text-base">${meal.price}</span>
                                <span className="flex items-center text-xs sm:text-sm">
                                    <FaStarHalfAlt className="text-orange-500" /> <span className="text-xl font-bold">{meal.rating}</span>
                                </span>
                            </div>

                            <Link to={`/mealDetails/${meal._id}`} className="btn bg-gray-200 text-black btn-sm md:btn-md mt-4 w-full min-h-11">
                                See Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className=" mt-6 flex gap-4 ">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn btn-sm">
                    Previous
                </button>
                <button disabled={page === totalPage} onClick={() => setPage(page + 1)} className="btn btn-sm">
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllMeals;
