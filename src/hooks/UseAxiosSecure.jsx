import axios from "axios";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: `https://profast-parcel-server.vercel.app`
    // baseURL:`http://localhost:5000`
});


const UseAxiosSecure = () => {
    const { user, logOutUser } = UseAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        // Do something with request error
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, error => {
        const status = error.status;
        if (status === 403) {
            navigate('/forbidden')
        }
        else if (status === 401) {
            logOutUser()
                .then(() => {
                    navigate('/login')
                })
                .catch(() => { })
        }
        return Promise.reject(error);
    }
    )


    return axiosSecure;
};

export default UseAxiosSecure;