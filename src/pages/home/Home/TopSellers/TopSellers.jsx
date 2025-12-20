import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxios from "../../../../hooks/UseAxios";
import Loading from "../../../Loading/Loading";

const TopSellers = () => {
    const axiosInstance = UseAxios();

    const { data: sellers = [], isLoading } = useQuery({
        queryKey: ["top-sellers"],
        queryFn: async () => {
            const res = await axiosInstance.get("/sellers/top");
            return res.data;
        },
    });

    if (isLoading) return <Loading></Loading>;

    return (
        <section className="px-4 md:px-8 lg:px-16 py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Top Sellers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sellers.map((s) => (
                    <Link key={s._id} to={`/seller/${s._id}`} className="border border-base-300 rounded-xl p-8 hover:shadow-xl transition">
                        <h3 className="text-lg font-medium">{s.name}</h3>
                        <p>⭐ {s.rating}</p>
                        <p>Total Products: {s.productCount}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default TopSellers;
