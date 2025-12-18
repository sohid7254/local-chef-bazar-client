import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    console.log(sessionId) 
    useEffect(()=> {
        let ignore = false;
        if(sessionId && !ignore){
            axiosSecure.patch(`/order-payment-success?session_id=${sessionId}`)
        }
        return () => {ignore = true}
    }, [sessionId, axiosSecure])

    const handleGoBack = () => {
        navigate("/dashboard/myOrders");
    }
    return (
        <div className="text-center p-10">
            <h1 className="text-3xl font-bold">Payment Successful</h1>
            <p>We have received your payment</p>
            <button onClick={handleGoBack} className="btn btn-outline btn-primary mt-4">
                Go Back to My Orders
            </button>
        </div>
    );
};

export default PaymentSuccess;