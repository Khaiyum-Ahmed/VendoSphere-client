import { Navigate, useLocation } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import Loading from "../../pages/Loading/Loading";

const PrivateRoutes = ({children}) => {
    const {user, loading} = UseAuth();
    const location = useLocation();

    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to="/login" state={{from:location.pathname}} replace></Navigate>
    }
    return children;
};

export default PrivateRoutes;