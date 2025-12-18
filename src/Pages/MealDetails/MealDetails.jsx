import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Shared/Loading";
import { FaStar } from "react-icons/fa";
import ReviewModal from "../../Components/Shared/ReviewModal";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import MealReview from "../../Components/Shared/MealReview";

const MealDetails = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: meal = {} } = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data;
        },
    });
    
    const { data: reviews = [], refetch: reviewRefetch } = useQuery({
        queryKey: ["reviews", meal._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${meal._id}`);
            return res.data;
        },
    });

    const handleAddFav = async () => {
        const favouriteMeal = {
            userEmail: user.email,
            mealId: meal._id,
            mealName: meal.foodName,
            chefId: meal.chefId,
            chefName: meal.chefName,
            price: meal.price,
        };
        const res = await axiosSecure.post("/favorites", favouriteMeal);
        if (res.data.success) {
            Swal.fire("Added", "Meal added to your favourites", "success");
        } else {
            Swal.fire("Oops!", res.data.message, "info");
        }
    };

    return (
        <div className="max-w-7xl mx-auto my-6 sm:my-8 md:my-10 p-4 sm:p-5 md:p-6 bg-base-300 shadow-lg rounded-lg">
            {/* Main Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
                <div>
                    <img src={meal.foodImage} alt={meal.foodName} className="w-full h-64 sm:h-80 md:h-96 lg:h-100 object-cover rounded-lg" />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="space-y-2 sm:space-y-3">
                        <h2 className="text-2xl sm:text-3xl font-bold">{meal.foodName}</h2>

                        <p className="text-sm sm:text-base">
                            Chef: <span className="font-semibold">{meal.chefName}</span>
                        </p>

                        <p className="text-sm sm:text-base">
                            Chef ID: <span className="font-semibold">{meal.chefId}</span>
                        </p>

                        <p className="text-sm sm:text-base">
                            Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
                        </p>

                        <p className="text-sm sm:text-base">
                            Price: <span className="font-semibold">${meal.price}</span>
                        </p>

                        <p className="flex items-center text-sm sm:text-base">
                            Rating:
                            <span className="font-semibold ml-3 flex items-center">
                                <FaStar className="text-orange-300" /> {meal.rating}
                            </span>
                        </p>

                        <p className="text-sm sm:text-base">
                            <span className="font-bold">Ingredients:</span> {meal.ingredients?.join(", ")}
                        </p>

                        <p className="text-sm sm:text-base">
                            <span className="font-bold">Chef Experience:</span> {meal.chefExperience}
                        </p>

                        <p className="text-sm sm:text-base">
                            <span className="font-bold">Estimated Delivery Time:</span> {meal.estimatedDeliveryTime}
                        </p>
                    </div>

                    {/* Buttons (Right bottom) */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <button onClick={() => navigate(`/order/${meal._id}`)} meal={meal._id} className="btn bg-orange-300 w-full min-h-11">
                            Order Now
                        </button>
                        <button onClick={handleAddFav} className="btn bg-orange-300 w-full min-h-11">
                            Add to Favourite
                        </button>
                        <button onClick={() => document.getElementById("reviewModal").showModal()} className="btn bg-orange-300 w-full min-h-11">
                            Add Review
                        </button>
                        <button onClick={() => navigate(-1)} className="btn bg-orange-300 w-full min-h-11">
                            Back
                        </button>
                    </div>
                </div>
            </div>
            <MealReview reviews={reviews} />
            <ReviewModal mealId={meal?._id} mealName={meal?.foodName} refetch={reviewRefetch} />
        </div>
    );
};

export default MealDetails;
