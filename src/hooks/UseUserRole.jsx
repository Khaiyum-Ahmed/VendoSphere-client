import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";

const UseUserRole = () => {
    const { user, loading: authLoading } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const {
        data: role,
        isLoading: roleLoading,
        refetch,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email && !authLoading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data?.role || "customer";
    },
     staleTime: 5 * 60 * 1000, // cache for 5 minutes
    });
    return {role: role || "customer",
         roleLoading: authLoading || roleLoading, refetch,}
};

export default UseUserRole;