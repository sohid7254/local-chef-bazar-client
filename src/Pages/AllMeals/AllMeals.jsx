import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AppLoading from "../../Components/Shared/AppLoading";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router";
import { FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";

const AllMeals = () => {
    const [sortPrice, setSortPrice] = useState("asc");
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const axiosSecure = useAxiosSecure();

    const limit = 10;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["all-meals", page],
        queryFn: async () => {
            const res = await axiosSecure.get("/meals", {
                params: { page, limit },
            });

            const response = res.data;

            if (Array.isArray(response)) {
                return {
                    meals: response,
                    total: response.length,
                    isPaginated: false,
                };
            }

            if (Array.isArray(response?.meals)) {
                return {
                    meals: response.meals,
                    total: response.total ?? response.count ?? response.meals.length,
                    isPaginated: true,
                };
            }

            if (Array.isArray(response?.data)) {
                return {
                    meals: response.data,
                    total: response.total ?? response.count ?? response.data.length,
                    isPaginated: true,
                };
            }

            return { meals: [], total: 0, isPaginated: false };
        },
    });

    const meals = data?.meals || [];
    const total = data?.total || meals.length || 0;
    const totalPage = Math.max(1, Math.ceil(total / limit));
    const pageMeals = data?.isPaginated ? meals : meals.slice((page - 1) * limit, page * limit);

    const filteredMeals = pageMeals.filter((meal) =>
        String(meal?.foodName || "")
            .toLowerCase()
            .includes(searchText.toLowerCase()),
    );
    const sortedMeals = [...filteredMeals].sort((a, b) => {
        return sortPrice === "asc" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price);
    });

    if (isLoading) return <AppLoading />;

    if (isError) {
        return (
            <div className="max-w-7xl mx-auto my-20 px-4 text-center">
                <h2 className="text-2xl font-bold text-red-500">Unable to load meals</h2>
                <p className="mt-2 text-gray-600">Please try again in a moment.</p>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto my-10">
            <Helmet>
                <title>All Meals</title>
            </Helmet>
            <h1 className="text-3xl font-bold text-center my-6" data-aos="fade-down">
                All Meals are here!
            </h1>
            <div className="flex flex-col md:flex-row justify-between mb-10 gap-6" data-aos="fade-down" data-aos-delay="100">
                {/* Search Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
                    <h2 className="text-xl font-bold">Search Here:</h2>

                    <label className="input flex items-center gap-2 w-full md:w-64  border rounded px-3 py-2">
                        <IoSearchOutline className="text-xl" />
                        <input type="text" className="w-full border-none focus:outline-none" value={searchText} placeholder="Search By Meal Name" onChange={(e) => setSearchText(e.target.value)} />
                    </label>
                </div>

                {/* Sort Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
                    <h1 className="text-xl font-bold">Sort Here:</h1>

                    <select className="select select-bordered w-full md:w-40 border-none outline-none" value={sortPrice} onChange={(e) => setSortPrice(e.target.value)}>
                        <option value="asc">Price: Low → High</option>
                        <option value="desc">Price: High → Low</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {sortedMeals.map((meal, index) => (
                    <div
                        key={meal._id}
                        className="card bg-white shadow-md hover:shadow-xl transition"
                        data-aos="fade-up"
                        data-aos-delay={index * 50} // Staggered delay
                    >
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
