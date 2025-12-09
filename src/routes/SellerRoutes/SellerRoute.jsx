import { Navigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import UseUserRole from "../../hooks/UseUserRole";
import Loading from "../../pages/Loading/Loading";

const SellerRoute = ({children}) => {
    const {user, loading} = UseAuth();
    const {role, roleLoading} = UseUserRole();

    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if(!user || role !== 'seller'){
        return <Navigate to="/forbidden" state={{from:location.pathname}}></Navigate>
    }
    return children;
};

export default SellerRoute;