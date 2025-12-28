import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UseAuth from '../../hooks/UseAuth';
import Loading from '../Loading/Loading';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';

const CheckoutForm = () => {
    const { user } = UseAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { orderId } = useParams();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();


    const { data: orderInfo = {}, isPending } = useQuery({
        queryKey: ['orders', orderId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders/${orderId}`);
            return res.data;
        }
    })
    if (isPending) {
        return <Loading></Loading>
    }

    console.log("orders info", orderInfo)


    const amount = orderInfo.totalAmount;
    const amountInCents = amount * 100;
    // console.log(parcelInfo, amountInCents);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;


        const card = elements.getElement(CardElement);

        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);

        } else {
            setError('');
            console.log("✅ Payment Successful!", paymentMethod);
        }

        // create payment intent
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            orderId
        })


        console.log("res from intent", res)

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.displayName,
                    email: user.email
                },
            },
        });
        if (result.error) {
            setError(result.error.message);
        } else {
            setError('');
            if (result.paymentIntent.status === "succeeded") {
                console.log("payment succeeded", result);
                const transactionId = result.paymentIntent.id;
                // mark parcel paid also create payment history
                const paymentData = {
                    orderId,
                    email: user.email,
                    amount,
                    transactionId: transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types,

                }
                const paymentRes = await axiosSecure.post('/payments', paymentData);
                if (paymentRes.data.insertedId) {
                    // show sweetAlert with transaction ID

                    await Swal.fire({
                        icon: "success",
                        title: "Payment Successful!",
                        html: `<strong>Transaction ID:</strong><code>${transactionId}</code>`,
                        confirmButtonText: 'Go to my orders',
                    });

                    // await logTracking({
                    //     tracking_id: parcelInfo.tracking_id,
                    //     status: "Payment_Done",
                    //     details: `created by ${user?.displayName || user?.email}`,
                    //     updated_by: user.email,
                    //     location: parcelInfo.sender_center
                    // })


                    navigate('/dashboard/customer/orders')

                }
            }
        }


        // console.log('res from intent', res)

    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto p-6 shadow-md rounded-xl bg-base-200">
            <CardElement className="p-4 border border-gray-300 rounded-md mb-4" />
            <button
                type="submit"
                className="btn btn-primary text-black w-full"
                disabled={!stripe}
            >
                Pay For ${amount}
            </button>
            {/* { <p className="text-green-500 mt-3">Payment Successful 🎉</p>} */}
            {error && <p className="text-red-500 mt-3">{error} </p>}
        </form>
    );
};

export default CheckoutForm;