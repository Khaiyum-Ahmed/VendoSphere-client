import UseAuth from "../../../hooks/UseAuth";
import UseUserRole from "../../../hooks/UseUserRole";

const RiderDashboard = () => {
    const { user } = UseAuth();
    const {role} = UseUserRole();
    console.log(user.email, role)
  

    return (
     
        <div>
            <h1> Seller DashBoard are here</h1>
        </div>
    );
};

export default RiderDashboard;