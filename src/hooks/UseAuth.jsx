import { use } from "react"
import { AuthContext } from "../context/AuthContext"

const UseAuth = () => {
    const AuthInfo = use(AuthContext)
    return AuthInfo
}
 export default UseAuth;
