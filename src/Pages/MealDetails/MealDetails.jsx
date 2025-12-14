import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Shared/Loading';
import { FaStar } from 'react-icons/fa';
import ReviewModal from '../../Components/Shared/ReviewModal';

const MealDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: meal = []} = useQuery({
        queryKey: ["meal", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${id}`);
            return res.data
        }
    })
    
    return (
        <div className="max-w-7xl mx-auto my-10 p-6 bg-base-300 shadow-lg rounded-lg">
            {/* Main Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={meal.foodImage} alt={meal.foodName} className="w-full h-100 object-cover rounded-lg" />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold">{meal.foodName}</h2>

                        <p className="mt-2">
                            Chef: <span className="font-semibold">{meal.chefName}</span>
                        </p>

                        <p>
                            Chef ID: <span className="font-semibold">{meal.chefId}</span>
                        </p>

                        <p>
                            Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
                        </p>

                        <p className="mt-2">
                            Price: <span className="font-semibold">${meal.price}</span>
                        </p>

                        <p className="flex items-center">
                            Rating:
                            <span className="font-semibold ml-3 flex items-center">
                                <FaStar className="text-orange-300" /> {meal.rating}
                            </span>
                        </p>

                        <p className="mt-4">
                            <span className="font-bold">Ingredients:</span> {meal.ingredients?.join(", ")}
                        </p>

                        <p className="mt-4">
                            <span className="font-bold">Chef Experience:</span> {meal.chefExperience}
                        </p>

                        <p className="mt-4">
                            <span className="font-bold">Estimated Delivery Time:</span> {meal.estimatedDeliveryTime}
                        </p>
                    </div>

                    {/* Buttons (Right bottom) */}
                    <div className="mt-6 flex gap-4">
                        <button onClick={() => navigate(`/order/${meal._id}`)} className="btn bg-orange-300">
                            Order Now
                        </button>
                        <button  className="btn bg-orange-300">
                            Add to Favourtite
                        </button>
                        <button onClick={() => document.getElementById("reviewModal").showModal()} className="btn bg-orange-300">
                            Add Review
                        </button>
                        <button onClick={() => navigate(-1)} className="btn bg-orange-300">
                            Back
                        </button>
                    </div>
                </div>
            </div>
            <ReviewModal mealId={meal._id}/>
        </div>
    );
};

export default MealDetails;