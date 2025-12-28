import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../hooks/UseAuth';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import Loading from '../../Loading/Loading';

const PaymentHistory = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();


    const { data: payments = [], isPending } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })
    if (isPending) {
        return <Loading></Loading>;
    }
    console.log('payments data:' , payments)
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>

            <div className="overflow-x-auto shadow-lg rounded-2xl">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Payment Method</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No payments found.
                                </td>
                            </tr>
                        ) : (
                            payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>{`${payment.orderId.slice(0, 5)}...${payment.orderId.slice(-4)}`}</td>
                                    <td>{payment.email}</td>
                                    <td>${(payment.amount)}</td>
                                    <td>{payment.paymentMethod}</td>
                                    <td className="font-mono text-sm">{`${payment.transactionId.slice(0, 4)}...${payment.transactionId.slice(-4)}`}</td>
                                    <td>
                                        {new Date(payment.paid_at).toLocaleString("en-US", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;