import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const LeatestMeal = () => {
    const axiosSecure = useAxiosSecure();

    const {data: meals = []} = useQuery({
        queryKey: ["LeatestMeal"],
        queryFn: async () => {
            const res = await axiosSecure.get("/leatestMeals");
            return res.data
        }
    })
    return (
        <section className="my-16">
            <h2 className="text-3xl font-bold text-center mb-8">Today’s Daily Meals</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {meals.map((meal) => (
                    <div key={meal._id} className="card bg-base-100 shadow-md hover:shadow-xl transition">
                        <figure>
                            <img src={meal.foodImage} alt={meal.foodName} className="h-48 w-full object-cover" />
                        </figure>

                        <div className="card-body">
                            <h3 className="card-title">{meal.foodName}</h3>

                            <p className="text-sm">
                                Chef: <span className="font-semibold">{meal.chefName}</span>
                            </p>

                            <p className="text-sm ">
                                Chef ID: <span className="font-semibold">{meal.chefId}</span>
                            </p>

                            <p className="text-sm ">
                                Delivery Area: <span className="font-semibold">{meal.deliveryArea}</span>
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <span className="font-semibold text-primary">${meal.price}</span>
                                <span className="badge bg-orange-500"> {meal.rating}</span>
                            </div>

                            <Link to={`/mealDetails/${meal._id}`} className="btn btn-sm mt-4 ">
                                See Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LeatestMeal;